package com.ABCResturent.app.service.impl;


import com.ABCResturent.app.dto.request.MealSaveRequestDTO;
import com.ABCResturent.app.dto.response.MealGetRequestDTO;
import com.ABCResturent.app.entity.Meal;
import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.enums.MealType;
import com.ABCResturent.app.enums.UserType;
import com.ABCResturent.app.exceptions.InternalServerErrorException;
import com.ABCResturent.app.exceptions.NotFoundException;
import com.ABCResturent.app.exceptions.UnauthorizedException;
import com.ABCResturent.app.repo.MealRepo;
import com.ABCResturent.app.repo.UserRepo;
import com.ABCResturent.app.service.MealService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealServiceImpl implements MealService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    MealRepo mealRepo;

    @Autowired
    ModelMapper modelMapper;
    @Override
    public String createMeal(MealSaveRequestDTO mealSaveRequestDTO) {

        try {
            userRepo.findById(mealSaveRequestDTO.getUserId())
                    .orElseThrow(() -> new NotFoundException("User not found"));

            User user = userRepo.getReferenceById(mealSaveRequestDTO.getUserId());

            if (user.getUserType() != UserType.ADMIN ) {
                throw new UnauthorizedException("Only users with ADMIN can create to Offers");
            }

            // Map the DTO to the Query entity
            Meal meal = modelMapper.map(mealSaveRequestDTO, Meal.class);
            // Ensure mealId is not set for new records
            meal.setMealId(0);


            mealRepo.save(meal);


            return "Meal created successfully";

        } catch (Exception e) {
            throw new InternalServerErrorException("Internal Server Error");
        }

    }

    @Override
    public String updateMeal(int mealId, MealSaveRequestDTO mealSaveRequestDTO) {

        if(!mealRepo.existsById(mealId)){
         throw new NotFoundException("Meal Not found");
        }
        try {
            Meal existingMeal = mealRepo.getReferenceById(mealId);

            modelMapper.map(mealSaveRequestDTO, existingMeal);

            mealRepo.save(existingMeal);

            return "Meal updated successfully";

        }catch (Exception e){
            throw new InternalServerErrorException("Internal server error!");
        }

    }

    @Override
    public List<MealGetRequestDTO> getAllMeals() {
        boolean activeStatus = true;
        List<Meal> meals = mealRepo.findAllByActive( activeStatus);

        if (meals.size() == 0) {
          throw new NotFoundException("Meals not found!!");
        }

        try {
            List<MealGetRequestDTO> mealsDTO = modelMapper.map(meals, new TypeToken<List<MealGetRequestDTO>>() {
            }.getType());

            return mealsDTO;

        }catch (Exception e){
            throw new InternalServerErrorException("Internal server error!");
        }
    }

    @Override
    public String deleteMeal(int mealId) {

        try {
            mealRepo.findById(mealId)
                    .orElseThrow(() -> new NotFoundException("Meal not found"));

           mealRepo.deleteById(mealId);

            return "Meal deleted successfully";

        } catch (Exception e) {
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    @Override
    public List<MealGetRequestDTO> getMealsByName(MealType mealCategory) {
        boolean activeStatus = true;
        List<Meal> meals = mealRepo.findAllByMealCategoryEqualsAndActive(mealCategory, activeStatus);

        if (meals.size() == 0) {
            throw new NotFoundException("Meals not found!!");
        }

        try {
            List<MealGetRequestDTO> allMeals= modelMapper.map(meals, new TypeToken<List<MealGetRequestDTO>>() {
            }.getType());

            return allMeals;

        }catch (Exception e){
            throw new InternalServerErrorException("Internal server error!");
        }
    }
}
