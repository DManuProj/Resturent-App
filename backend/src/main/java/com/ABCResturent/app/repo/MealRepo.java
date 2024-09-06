package com.ABCResturent.app.repo;

import com.ABCResturent.app.entity.Meal;
import com.ABCResturent.app.enums.MealType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
@EnableJpaRepositories
public interface MealRepo extends JpaRepository<Meal,Integer> {


    List<Meal> findAllByActive(boolean active);


    List<Meal> findAllByMealCategoryEqualsAndActive(MealType mealCategory, boolean activeStatus);
}
