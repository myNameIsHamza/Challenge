package com.challenge.shop.dto

import com.challenge.shop.model.Category
class CategoryDto(
    val uid: Long = 0,
    val name: String = "",
    val description: String = "",
    val categoryId:Long? = 0
)

fun Category.toCategoryDto() = CategoryDto(
    uid = id,
    name = name,
    description = description,
    categoryId = category?.id
)