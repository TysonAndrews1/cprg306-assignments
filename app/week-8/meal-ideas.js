"use client";

import React, { useState, useEffect } from "react";

async function getMeals(ingredient) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals || []; // Return meals or an empty array if none
    } catch (error) {
        console.error("Error:", error);
        return []; // Return an empty array on error
    }
}

async function getIngredients(mealId) {
    const ingredients = [];
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();

        if (!data.meals || data.meals.length === 0) return []; // Return empty array if no meals found

        for (let i = 1; i <= 20; i++) {
            const ingredient = data.meals[0][`strIngredient${i}`];
            const measure = data.meals[0][`strMeasure${i}`];
            if (ingredient) {
                ingredients.push(`${measure ? measure + ' ' : ''}${ingredient}`.trim());
            }
        }
    } catch (error) {
        console.error("Error:", error);
        return []; // Return an empty array on error
    }
    return ingredients;
}

function becomeStandard(input) {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    input = input.replace(emojiRegex, '').replace(/,.+$/, '').trim().toLowerCase();
    if (input[input.length - 1] === '_') {
        input = input.slice(0, -1);
    }
    if (input) {
        return input.replace(/ /g, "_");
    }
    return "";
}

export default function MealIdeas({ ingredient }) {
    const [meal, setMeal] = useState("");
    const [meals, setMeals] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const fetchIngredient = async () => {
            if (meal) {
                const ingredients = await getIngredients(meal.idMeal);
                setIngredients(ingredients); // Update state with fetched ingredients
            }
        };
        fetchIngredient();
    }, [meal]); // Fetch ingredients when the meal changes

    useEffect(() => {
        const fetchMeals = async () => {
            const standard = becomeStandard(ingredient);
            const mealsData = await getMeals(standard);
            setMeals(mealsData); // Update state with fetched meals
        };
        fetchMeals();
        setIngredients("");
    }, [ingredient]); // Fetch meals when the ingredient changes

    return (
        <div className="p-4">
            {/* Meal List */}
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Meals</h3>
                    {meals.length > 0 ? (
                        <ul className="space-y-2">
                            {meals.map(m => (
                                <li
                                    onClick={() => setMeal(m)}
                                    key={m.idMeal}
                                     className="flex items-center justify-between bg-slate-700 text-white rounded-lg p-4 my-2 hover:bg-slate-800 transition duration-200"
                                >
                                    {m.strMeal}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No meals found</p>
                    )}
                </div>
        
                {/* Ingredient List */}
                <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Ingredients</h3>
                    {ingredients.length > 0 ? (
                        <ul className="space-y-2">
                            {ingredients.map((i, index) => (
                                <li key={index}  className="flex items-center justify-between bg-slate-700 text-white rounded-lg p-4 my-2 hover:bg-slate-800 transition duration-200">
                                    {i}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No ingredients found</p>
                    )}
                </div>
            </div>
        );
}
