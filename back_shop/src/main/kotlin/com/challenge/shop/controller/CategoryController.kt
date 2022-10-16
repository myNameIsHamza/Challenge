package com.challenge.shop.controller

import com.challenge.shop.dto.CategoryDto
import com.challenge.shop.dto.toCategoryDto
import com.challenge.shop.model.Category
import com.challenge.shop.model.toCategory
import com.challenge.shop.service.CategoryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
class CategoryController(@Autowired private val categoryService: CategoryService) {


    //gets all categories
    @GetMapping("/categories")
    fun getAllCategories(): ResponseEntity<List<CategoryDto>> =
        ResponseEntity.status(HttpStatus.OK)
            .body(categoryService.getAllCategories().map { it.toCategoryDto() })


    //gets the requested category
    @GetMapping("category/{uid}")
    fun getCategoryByid(@PathVariable uid: Long): ResponseEntity<Any> {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                categoryService.getCategoryById(uid)?.toCategoryDto()
            )
        }catch (e : Exception){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(e.message)
        }

    }


    //creates a new category
    @PostMapping("/category")
    fun saveCategories(@RequestBody categoryDto: CategoryDto): ResponseEntity<Any> {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                .body(categoryService.saveCategories(categoryDto.toCategory(categoryDto.categoryId?.let {
                    categoryService.getCategoryById(
                        it
                    )
                })))
        } catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message);
        }

    }

    //updates an existing category
    @PutMapping("/category/{uid}")
    fun updateCategory(@PathVariable uid: Long, @RequestBody categoryDto: CategoryDto): ResponseEntity<Any> {

        try {
            return ResponseEntity.status(HttpStatus.OK)
                .body(categoryService.updateCategory(uid, categoryDto.toCategory(categoryDto.categoryId?.let {
                    categoryService.getCategoryById(
                        it
                    )
                })))

        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.message)
        }

    }

    // deletes an existing category
    @DeleteMapping("/category/{uid}")
    fun deleteCategory(@PathVariable uid: Long): ResponseEntity<Any> {
        try {
            categoryService.deleteCategory(uid)
        } catch (e: Exception) {
            // can handle it by adding to logger
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.message)
        }
        return ResponseEntity.noContent().build()

    }
}