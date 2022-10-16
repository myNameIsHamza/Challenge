package com.challenge.shop.controller

import com.challenge.shop.dto.ProductDto
import com.challenge.shop.dto.toProductDto
import com.challenge.shop.model.toProduct
import com.challenge.shop.service.CategoryService
import com.challenge.shop.service.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
class ProductController(@Autowired private val productService: ProductService,@Autowired private val categoryService: CategoryService) {

    //gets all products
    @GetMapping("/products")
    fun getAllProducts(): ResponseEntity<List<ProductDto>> =
        ResponseEntity.status(HttpStatus.OK)
            .body(productService.getAllProducts().map { it.toProductDto() })


    //gets the requested product
    @GetMapping("product/{uid}")
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