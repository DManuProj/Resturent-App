package com.ABCResturent.app.service;

import com.ABCResturent.app.dto.request.MealSaveRequestDTO;
import com.ABCResturent.app.dto.response.MealGetRequestDTO;
import com.ABCResturent.app.enums.MealType;

import java.util.List;

public interface MealService {
    String createMeal(MealSaveRequestDTO mealSaveRequestDTO);

    String updateMeal(int mealId, MealSaveRequestDTO mealSaveRequestDTO);

    List<MealGetRequestDTO> getAllMeals();

    String deleteMeal(int mealId);

    List<MealGetRequestDTO> getMealsByName(MealType mealCategory);
}
