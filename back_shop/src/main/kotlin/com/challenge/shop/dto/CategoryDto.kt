package com.challenge.shop.dto

import com.challenge.shop.model.Category
class CategoryDto(
    var uid: Long = 0,
    var name: String = "",
    var description: String = "",
    var categoryId:Long? = 0
)

fun Category.toCategoryDto() = CategoryDto(
    uid = id,
    name = name,
    description = description,
    categoryId = category?.id
)