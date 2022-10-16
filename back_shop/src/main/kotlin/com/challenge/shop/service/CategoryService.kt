package com.challenge.shop.service

import com.challenge.shop.dao.CategoryDao
import com.challenge.shop.model.Category
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody

@Service
class CategoryService(@Autowired private val categoryDao: CategoryDao) {
    fun getAllCategories(): List<Category> =
        categoryDao.findAll()

    fun getCategoryById(@PathVariable id: Long): Category =
        categoryDao.findById(id).get()


    fun saveCategories(@RequestBody category: Category): Category {
        return categoryDao.save(category)
    }

    fun updateCategory(@PathVariable id: Long, @RequestBody category: Category): Category {
        categoryDao.findById(id).takeIf { e -> e != null }?.let {
            return categoryDao.save(Category(id, category.name, category.description, category.category))
        } ?: throw Exception("Category does not exist")


    }

    fun deleteCategory(@PathVariable id: Long) {
        categoryDao.deleteById(id)
    }
}
