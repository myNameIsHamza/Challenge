package com.challenge.shop.model

import javax.persistence.*

@Entity
@Table(name = "category")
class Category(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String = "",
    val description: String = "",
    @ManyToOne
    val category: Category
)