package com.challenge.shop.controller

import com.challenge.shop.dto.ProductDto
import com.challenge.shop.dto.toProductDto
import com.challenge.shop.model.Category
import com.challenge.shop.model.toProduct
import com.challenge.shop.service.CategoryService
import com.challenge.shop.service.ProductService
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@CrossOrigin
class ProductController(@Autowired private val productService: ProductService,@Autowired private val categoryService: CategoryService) {

    //gets all products
    @GetMapping("/products")
    @ApiOperation(value = "Get all products", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 404, message = "The resource not found")
        )
    )
    fun getAllProducts(): ResponseEntity<List<ProductDto>> =
        ResponseEntity.status(HttpStatus.OK)
            .body(productService.getAllProducts().map { it.toProductDto() })


    //gets the requested product
    @GetMapping("product/{uid}")
    @ApiOperation(value = "Get a product by uid", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 404, message = "The resource not found")
        )
    )
    fun getProductByid(@PathVariable uid: Long): ResponseEntity<Any> {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                productService.getProductById(uid)?.toProductDto()
            )
        }catch (e : Exception){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(e.message)
        }

    }


    //creates a new product
    @PostMapping("/product")
    @ApiOperation(value = "Add a product", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 400, message = "bad request"),
            ApiResponse(code = 500, message = "Internal server error"),
        )
    )
    fun saveProducts(@RequestBody productDto: ProductDto): ResponseEntity<Any> {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                .body(productService.saveProducts(productDto.toProduct(productDto.categoryId?.let {
                    categoryService.getCategoryById(
                        it
                    )
                })))
        } catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message);
        }

    }

    //updates an existing product
    @PutMapping("/product/{uid}")
    @ApiOperation(value = "Update a product by uid", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 400, message = "bad request"),
            ApiResponse(code = 500, message = "Internal server error"),
        )
    )
    fun updateProduct(@PathVariable uid: Long, @RequestBody productDto: ProductDto): ResponseEntity<Any> {

        try {
            return ResponseEntity.status(HttpStatus.OK)
                .body(productService.updateProduct(uid, productDto.toProduct(productDto.categoryId?.let {
                    categoryService.getCategoryById(
                        it
                    )
                })))

        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.message)
        }

    }

    // deletes an existing product
    @DeleteMapping("/product/{uid}")
    @ApiOperation(value = "Delete a product by uid", response = Category::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 400, message = "bad request"),
            ApiResponse(code = 500, message = "Internal server error"),
        )
    )
    fun deleteProduct(@PathVariable uid: Long): ResponseEntity<Any> {
        try {
            productService.deleteProduct(uid)
        } catch (e: Exception) {
            // can handle it by adding to logger
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.message)
        }
        return ResponseEntity.noContent().build()

    }

}