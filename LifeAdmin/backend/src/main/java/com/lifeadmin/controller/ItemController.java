package com.lifeadmin.controller;

import com.lifeadmin.dto.ItemRequest;
import com.lifeadmin.dto.ItemResponse;
import com.lifeadmin.entity.LifeItem;
import com.lifeadmin.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<List<ItemResponse>> getItems(
            Authentication authentication,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) LifeItem.Category category,
            @RequestParam(required = false) LifeItem.Status status,
            @RequestParam(required = false) LifeItem.Priority priority) {

        List<ItemResponse> items = itemService.getItems(
                authentication.getName(), keyword, category, status, priority);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> getItem(Authentication authentication, @PathVariable Long id) {
        ItemResponse item = itemService.getItemById(authentication.getName(), id);
        return ResponseEntity.ok(item);
    }

    @PostMapping
    public ResponseEntity<ItemResponse> createItem(Authentication authentication,
                                                     @Valid @RequestBody ItemRequest request) {
        ItemResponse created = itemService.createItem(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> updateItem(Authentication authentication,
                                                     @PathVariable Long id,
                                                     @Valid @RequestBody ItemRequest request) {
        ItemResponse updated = itemService.updateItem(authentication.getName(), id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(Authentication authentication, @PathVariable Long id) {
        itemService.deleteItem(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
