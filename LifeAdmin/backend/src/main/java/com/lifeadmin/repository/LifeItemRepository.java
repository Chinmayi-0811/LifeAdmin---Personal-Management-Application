package com.lifeadmin.repository;

import com.lifeadmin.entity.LifeItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LifeItemRepository extends JpaRepository<LifeItem, Long> {

    List<LifeItem> findByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<LifeItem> findByIdAndUserId(Long id, Long userId);

    long countByUserId(Long userId);

    long countByUserIdAndStatus(Long userId, LifeItem.Status status);

    long countByUserIdAndStatusAndDueDateBetween(Long userId, LifeItem.Status status, LocalDate start, LocalDate end);

    /**
     * Combined search + filter query. Any parameter left null is ignored,
     * so this single query backs the "search" and "filter" item features.
     */
    @Query("SELECT i FROM LifeItem i WHERE i.user.id = :userId " +
            "AND (:keyword IS NULL OR LOWER(i.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "     OR LOWER(i.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:category IS NULL OR i.category = :category) " +
            "AND (:status IS NULL OR i.status = :status) " +
            "AND (:priority IS NULL OR i.priority = :priority) " +
            "ORDER BY i.createdAt DESC")
    List<LifeItem> search(
            @Param("userId") Long userId,
            @Param("keyword") String keyword,
            @Param("category") LifeItem.Category category,
            @Param("status") LifeItem.Status status,
            @Param("priority") LifeItem.Priority priority
    );
}
