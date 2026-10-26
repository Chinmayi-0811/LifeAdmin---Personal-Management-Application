package com.lifeadmin.dto;

public class DashboardResponse {

    private long totalItems;
    private long pendingItems;
    private long completedItems;
    private long upcomingItems;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalItems, long pendingItems, long completedItems, long upcomingItems) {
        this.totalItems = totalItems;
        this.pendingItems = pendingItems;
        this.completedItems = completedItems;
        this.upcomingItems = upcomingItems;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }

    public long getPendingItems() {
        return pendingItems;
    }

    public void setPendingItems(long pendingItems) {
        this.pendingItems = pendingItems;
    }

    public long getCompletedItems() {
        return completedItems;
    }

    public void setCompletedItems(long completedItems) {
        this.completedItems = completedItems;
    }

    public long getUpcomingItems() {
        return upcomingItems;
    }

    public void setUpcomingItems(long upcomingItems) {
        this.upcomingItems = upcomingItems;
    }
}
