package com.challenge.shop.model

import com.challenge.shop.dto.CategoryDto
import javax.persistence.*

@Entity
@Table(name = "category")
class Category(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String = "",
    val description: String = "",
    @ManyToOne
    val category: Category?
)

fun CategoryDto.toCategory(category: Category?) = Category(
    id = uid,
    name = name,
    description = description,
    category = category
)