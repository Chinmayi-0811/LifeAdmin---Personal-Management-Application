package com.lifeadmin.dto;

import com.lifeadmin.entity.LifeItem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ItemRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Category is required")
    private LifeItem.Category category;

    private LocalDate dueDate;

    private BigDecimal amount;

    private LifeItem.Status status;

    private LifeItem.Priority priority;

    private boolean recurring;

    public ItemRequest() {
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
}
