package com.challenge.shop.dao;

import com.challenge.shop.model.Category
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface CategoryDao : JpaRepository<Category, Long> {
    override fun findById(id : Long) : Optional<Category>
}
