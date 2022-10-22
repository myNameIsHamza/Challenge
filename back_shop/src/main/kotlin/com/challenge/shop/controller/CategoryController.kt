package com.challenge.shop.controller

import com.challenge.shop.dto.CategoryDto
import com.challenge.shop.dto.toCategoryDto
import com.challenge.shop.model.Category
import com.challenge.shop.model.toCategory
import com.challenge.shop.service.CategoryService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
@Api(value = "Category", description = "Rest API for categories operations", tags = arrayOf("Category API"))
class CategoryController(@Autowired private val categoryService: CategoryService) {


    //gets all categories
    @GetMapping("/categories")
    @ApiOperation(value = "Get all categories", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 404, message = "The resource not found")
        )
    )
    fun getAllCategories(): ResponseEntity<List<CategoryDto>> =
        ResponseEntity.status(HttpStatus.OK)
            .body(categoryService.getAllCategories().map { it.toCategoryDto() })


    //gets the requested category
    @GetMapping("category/{uid}")
    @ApiOperation(value = "Get category by uid", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 404, message = "The resource not found")
        )
    )
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
    @ApiOperation(value = "Add a category", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 400, message = "bad request"),
            ApiResponse(code = 500, message = "Internal server error"),
        )
    )
    fun saveCategories(@RequestBody categoryDto: CategoryDto): ResponseEntity<Any> {
        try {
            val category : Category? = categoryService.getCategoryById(categoryDto.categoryId)
            val category2 : Category = categoryDto.toCategory(category)
            return ResponseEntity.status(HttpStatus.OK)
                .body(categoryService.saveCategories(category2))
        } catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message);
        }

    }

    //updates an existing category
    @PutMapping("/category/{uid}")
    @ApiOperation(value = "Update a category by uid", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 400, message = "bad request"),
            ApiResponse(code = 500, message = "Internal server error"),
            )
        )
    fun updateCategory(@PathVariable uid: Long, @RequestBody categoryDto: CategoryDto): ResponseEntity<Any> {

        try {
            return ResponseEntity.status(HttpStatus.OK)
                .body(categoryService.updateCategory(uid, categoryDto.toCategory(categoryService.getCategoryById(categoryDto.categoryId))))

        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.message)
        }

    }

    // deletes an existing category
    @DeleteMapping("/category/{uid}")
    @ApiOperation(value = "Delete a category by uid", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 400, message = "bad request"),
            ApiResponse(code = 500, message = "Internal server error"),
        )
    )
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