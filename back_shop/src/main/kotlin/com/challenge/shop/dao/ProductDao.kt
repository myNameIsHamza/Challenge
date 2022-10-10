package com.challenge.shop.dao

import com.challenge.shop.model.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ProductDao : JpaRepository<Product,Long>{
    override fun findById(id : Long) : Optional<Product>
}