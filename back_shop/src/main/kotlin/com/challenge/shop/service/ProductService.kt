package com.challenge.shop.service

import com.challenge.shop.dao.ProductDao
import com.challenge.shop.model.Product
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody

@Service
class ProductService(@Autowired private val productDao: ProductDao) {
    fun getAllProducts(): List<Product> =
        productDao.findAll()

    fun getProductById(@PathVariable id: Long): Product =
        productDao.findById(id).get()


    fun saveProducts(@RequestBody product: Product): Product {
        return productDao.save(product)
    }

    fun updateProduct(@PathVariable id: Long, @RequestBody product: Product): Product {
        productDao.findById(id).takeIf { e -> e != null }?.let {
            return productDao.save(Product(id, product.name, product.description, product.price, product.category))
        } ?: throw Exception("Product does not exist")


    }

    fun deleteProduct(@PathVariable id: Long) {
        productDao.deleteById(id)
    }
}