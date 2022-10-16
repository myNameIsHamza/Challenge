package com.challenge.shop.dto

import com.challenge.shop.model.Product

class ProductDto(
    val uid: Long = 0,
    val name: String = "",
    val description: String = "",
    val price: Double = 0.0,
    val categoryId:Long? = 0
)

fun Product.toProductDto() = ProductDto(
    uid = id,
    name = name,
    description = description,
    price = price,
    categoryId = category?.id
)