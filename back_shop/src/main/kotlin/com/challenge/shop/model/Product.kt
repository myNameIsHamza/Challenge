package com.challenge.shop.model

import javax.persistence.*

@Entity
@Table(name = "product")
class Product(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String = "",
    val description: String = "",
    val price: Double = 0.0,
    @ManyToOne
    val category: Category
)