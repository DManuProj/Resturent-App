package com.ABCResturent.app.repo;

import com.ABCResturent.app.entity.Meal;
import com.ABCResturent.app.enums.MealType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealRepo extends JpaRepository<Meal,Integer> {


    List<Meal> findAllByActive(boolean active);


    List<Meal> findAllByMealCategoryEqualsAndActive(MealType mealCategory, boolean activeStatus);
}
