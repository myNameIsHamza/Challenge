package com.challenge.shop.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CategoryController {

    @GetMapping("categories")
    fun welcome(): ResponseEntity<String> =
        ResponseEntity.status(HttpStatus.OK).body("Welcome to categories")
}