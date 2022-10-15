package com.challenge.shop.controller

import com.challenge.shop.model.Category
import com.challenge.shop.service.CategoryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
class CategoryController (@Autowired private val  categoryService:CategoryService){


    //gets all categories
    @GetMapping("/categories")
    fun getAllCategories() : ResponseEntity<List<Category>> =
        ResponseEntity.status(HttpStatus.OK)
            .body(categoryService.getAllCategories())


    //gets the requested category
    @GetMapping("category/{id}")
    fun getCategoryByid(@PathVariable id : Long) : Category =
        categoryService.getCategoryById(id) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND,
            "This cqtegory does not exist")


    //creates a new category
    @PostMapping("/category")
    fun saveCategories(@RequestBody category : Category) : ResponseEntity<Category>   {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                .body(categoryService.saveCategories(category))
        }catch (e : Exception){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST,
                e.message)
        }

    }

    //updates an existing category
    @PutMapping("/category/{id}")
    fun updateCategory(@PathVariable id : Long, @RequestBody category : Category): ResponseEntity<Category> {
        try{
            return ResponseEntity.status(HttpStatus.OK)
                .body(categoryService.updateCategory(id,category))

        }catch (e : Exception){
                throw Exception(e.message)
        }

    }

    // deletes an existing category
    @DeleteMapping("/category/{id}")
    fun deleteCategory(@PathVariable id : Long) : ResponseEntity<Any>{
        try {
            categoryService.deleteCategory(id)
        }
        catch (e: Exception) {
            // can handle it by adding to logger
        }
        return ResponseEntity.noContent().build()

    }
}