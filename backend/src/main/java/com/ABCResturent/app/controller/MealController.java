package com.ABCResturent.app.controller;

import com.ABCResturent.app.dto.request.MealSaveRequestDTO;
import com.ABCResturent.app.dto.request.OfferCreateRequestDTO;
import com.ABCResturent.app.dto.request.OfferUpdatedRequestDTO;
import com.ABCResturent.app.dto.response.MealGetRequestDTO;
import com.ABCResturent.app.dto.response.OfferGetAllRequestDTO;
import com.ABCResturent.app.entity.Meal;
import com.ABCResturent.app.enums.MealType;
import com.ABCResturent.app.service.MealService;
import com.ABCResturent.app.service.OfferService;
import com.ABCResturent.app.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/meal")
@CrossOrigin
public class MealController {

    @Autowired
    MealService mealService;

    @PostMapping("/create-meal")
    public ResponseEntity<StandardResponse> createMeal(@RequestBody MealSaveRequestDTO mealSaveRequestDTO){
        String meal =  mealService.createMeal(mealSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, meal, null), HttpStatus.CREATED
        );
    }

    @PutMapping(value = "/update-meal/{id}")
    public ResponseEntity<StandardResponse> updateMeal(@PathVariable("id") int mealId,@RequestBody MealSaveRequestDTO mealSaveRequestDTO) {

        String updatedMeal = mealService.updateMeal(mealId, mealSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, updatedMeal, null), HttpStatus.OK
        );
    }

    @GetMapping("/get-meals")
    public ResponseEntity<StandardResponse> getAllMeals(){
        List<MealGetRequestDTO> allMeals =  mealService.getAllMeals();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", allMeals), HttpStatus.OK
        );
    }

    @GetMapping(value = "/get-meals-by-category",params = "category")
    public ResponseEntity<StandardResponse> getMealByCategory(@RequestParam(value = "category") MealType mealCategory){
        List<MealGetRequestDTO> meals = mealService.getMealsByName(mealCategory);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", meals), HttpStatus.OK
        );
    }
//
//
    @DeleteMapping(value = "/delete-meal", params = "id")
    public ResponseEntity<StandardResponse> deleteMeal(@RequestParam(value = "id") int mealId ){
        String confirmationMessage =  mealService.deleteMeal(mealId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, confirmationMessage, null), HttpStatus.OK
        );
    }
}
