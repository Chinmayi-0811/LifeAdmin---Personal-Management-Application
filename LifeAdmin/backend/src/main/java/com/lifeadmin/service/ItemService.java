package com.lifeadmin.service;

import com.lifeadmin.dto.ItemRequest;
import com.lifeadmin.dto.ItemResponse;
import com.lifeadmin.entity.LifeItem;
import com.lifeadmin.entity.User;
import com.lifeadmin.repository.LifeItemRepository;
import com.lifeadmin.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ItemService {

    private final LifeItemRepository lifeItemRepository;
    private final UserRepository userRepository;

    public ItemService(LifeItemRepository lifeItemRepository, UserRepository userRepository) {
        this.lifeItemRepository = lifeItemRepository;
        this.userRepository = userRepository;
    }

    public ItemResponse createItem(String userEmail, ItemRequest request) {
        User user = getUserByEmail(userEmail);

        LifeItem item = new LifeItem();
        applyRequestToEntity(item, request);
        item.setUser(user);

        LifeItem saved = lifeItemRepository.save(item);
        return ItemResponse.fromEntity(saved);
    }

    public List<ItemResponse> getItems(String userEmail, String keyword, LifeItem.Category category,
                                        LifeItem.Status status, LifeItem.Priority priority) {
        User user = getUserByEmail(userEmail);

        String normalizedKeyword = (keyword == null || keyword.isBlank()) ? null : keyword.trim();

        return lifeItemRepository.search(user.getId(), normalizedKeyword, category, status, priority)
                .stream()
                .map(ItemResponse::fromEntity)
                .toList();
    }

    public ItemResponse getItemById(String userEmail, Long id) {
        User user = getUserByEmail(userEmail);
        LifeItem item = getOwnedItem(user, id);
        return ItemResponse.fromEntity(item);
    }

    public ItemResponse updateItem(String userEmail, Long id, ItemRequest request) {
        User user = getUserByEmail(userEmail);
        LifeItem item = getOwnedItem(user, id);

        applyRequestToEntity(item, request);

        LifeItem saved = lifeItemRepository.save(item);
        return ItemResponse.fromEntity(saved);
    }

    public void deleteItem(String userEmail, Long id) {
        User user = getUserByEmail(userEmail);
        LifeItem item = getOwnedItem(user, id);
        lifeItemRepository.delete(item);
    }

    private LifeItem getOwnedItem(User user, Long id) {
        return lifeItemRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
    }

    private void applyRequestToEntity(LifeItem item, ItemRequest request) {
        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setDueDate(request.getDueDate());
        item.setAmount(request.getAmount());
        item.setRecurring(request.isRecurring());

        item.setStatus(request.getStatus() != null ? request.getStatus() : LifeItem.Status.PENDING);
        item.setPriority(request.getPriority() != null ? request.getPriority() : LifeItem.Priority.MEDIUM);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }
}
