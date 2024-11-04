import React, { useState } from 'react';
import { Apple, Coffee, Pizza, Plus, X } from 'lucide-react';
import { useNutritionStore } from '../store/nutritionStore';
import MealForm from '../components/MealForm';

export default function Nutrition() {
  const [showMealForm, setShowMealForm] = useState(false);
  const { meals, getDailyNutrition } = useNutritionStore();
  const today = new Date().toISOString().split('T')[0];
  const todayNutrition = getDailyNutrition(today);
  const todayMeals = meals.filter(meal => meal.date === today);

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return Coffee;
      case 'lunch':
        return Apple;
      case 'dinner':
        return Pizza;
      default:
        return Apple;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Nutrition Tracking</h1>
          <button 
            className="btn-primary flex items-center justify-center w-full sm:w-auto"
            onClick={() => setShowMealForm(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Log Meal
          </button>
        </div>

        {showMealForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative min-h-screen sm:min-h-0 sm:top-20 mx-auto p-4 sm:p-5 w-full sm:max-w-md">
              <div className="bg-white rounded-lg shadow-xl">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-medium text-gray-900">Log Meal</h3>
                  <button 
                    onClick={() => setShowMealForm(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <MealForm onClose={() => setShowMealForm(false)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Calories</h3>
            <div className="flex items-end">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">{todayNutrition.calories}</span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1 mb-1">/ 2,200</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${Math.min((todayNutrition.calories / 2200) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Protein</h3>
            <div className="flex items-end">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">{todayNutrition.protein}g</span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1 mb-1">/ 120g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${Math.min((todayNutrition.protein / 120) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Carbs</h3>
            <div className="flex items-end">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">{todayNutrition.carbs}g</span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1 mb-1">/ 275g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${Math.min((todayNutrition.carbs / 275) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Fat</h3>
            <div className="flex items-end">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">{todayNutrition.fat}g</span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1 mb-1">/ 73g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${Math.min((todayNutrition.fat / 73) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Today's Meals */}
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Today's Meals</h2>
            <div className="space-y-3">
              {todayMeals.map(meal => {
                const Icon = getMealIcon(meal.type);
                return (
                  <div key={meal.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{meal.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {meal.calories} cal • {meal.protein}g protein • {meal.carbs}g carbs • {meal.fat}g fat
                        </p>
                      </div>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-gray-500 text-sm sm:text-base"
                      onClick={() => {
                        // Add edit functionality
                      }}
                    >
                      Edit
                    </button>
                  </div>
                );
              })}
              {todayMeals.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No meals logged today</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}