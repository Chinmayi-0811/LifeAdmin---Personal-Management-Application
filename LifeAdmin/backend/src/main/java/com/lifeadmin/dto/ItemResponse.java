package com.lifeadmin.dto;

import com.lifeadmin.entity.LifeItem;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ItemResponse {

    private Long id;
    private String title;
    private String description;
    private LifeItem.Category category;
    private LocalDate dueDate;
    private BigDecimal amount;
    private LifeItem.Status status;
    private LifeItem.Priority priority;
    private boolean recurring;
    private LocalDateTime createdAt;

    public ItemResponse() {
    }

    public static ItemResponse fromEntity(LifeItem item) {
        ItemResponse response = new ItemResponse();
        response.setId(item.getId());
        response.setTitle(item.getTitle());
        response.setDescription(item.getDescription());
        response.setCategory(item.getCategory());
        response.setDueDate(item.getDueDate());
        response.setAmount(item.getAmount());
        response.setStatus(item.getStatus());
        response.setPriority(item.getPriority());
        response.setRecurring(item.isRecurring());
        response.setCreatedAt(item.getCreatedAt());
        return response;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LifeItem.Category getCategory() {
        return category;
    }

    public void setCategory(LifeItem.Category category) {
        this.category = category;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LifeItem.Status getStatus() {
        return status;
    }

    public void setStatus(LifeItem.Status status) {
        this.status = status;
    }

    public LifeItem.Priority getPriority() {
        return priority;
    }

    public void setPriority(LifeItem.Priority priority) {
        this.priority = priority;
    }

    public boolean isRecurring() {
        return recurring;
    }

    public void setRecurring(boolean recurring) {
        this.recurring = recurring;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
