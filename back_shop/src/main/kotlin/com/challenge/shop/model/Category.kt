package com.challenge.shop.model

import com.challenge.shop.dto.CategoryDto
import io.swagger.annotations.ApiModelProperty
import javax.persistence.*

@Entity
@Table(name = "category")
class Category(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @ApiModelProperty(notes = "Provided category name", readOnly = true)
    val name: String = "",
    @ApiModelProperty(notes = "Provided category description", readOnly = true)
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