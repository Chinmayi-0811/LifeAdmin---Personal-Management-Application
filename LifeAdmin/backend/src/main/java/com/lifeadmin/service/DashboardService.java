package com.lifeadmin.service;

import com.lifeadmin.dto.DashboardResponse;
import com.lifeadmin.entity.LifeItem;
import com.lifeadmin.entity.User;
import com.lifeadmin.repository.LifeItemRepository;
import com.lifeadmin.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
public class DashboardService {

    private static final int UPCOMING_WINDOW_DAYS = 7;

    private final LifeItemRepository lifeItemRepository;
    private final UserRepository userRepository;

    public DashboardService(LifeItemRepository lifeItemRepository, UserRepository userRepository) {
        this.lifeItemRepository = lifeItemRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboard(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        Long userId = user.getId();

        long totalItems = lifeItemRepository.countByUserId(userId);
        long pendingItems = lifeItemRepository.countByUserIdAndStatus(userId, LifeItem.Status.PENDING);
        long completedItems = lifeItemRepository.countByUserIdAndStatus(userId, LifeItem.Status.COMPLETED);

        LocalDate today = LocalDate.now();
        LocalDate windowEnd = today.plusDays(UPCOMING_WINDOW_DAYS);
        long upcomingItems = lifeItemRepository.countByUserIdAndStatusAndDueDateBetween(
                userId, LifeItem.Status.PENDING, today, windowEnd);

        return new DashboardResponse(totalItems, pendingItems, completedItems, upcomingItems);
    }
}
