import React from 'react';
import { Activity, Award, Target, TrendingUp } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { useNutritionStore } from '../store/nutritionStore';
import { useFitnessStore } from '../store/fitnessStore';

export default function Dashboard() {
  const { streak, coins, activities } = useDashboardStore();
  const { exercises } = useFitnessStore();
  const { meals, getDailyNutrition } = useNutritionStore();

  const today = new Date().toISOString().split('T')[0];
  const todayNutrition = getDailyNutrition(today);
  const todayWorkouts = exercises.filter(ex => ex.date === today);

  const calculateProgress = () => {
    const dailyGoals = {
      workout: todayWorkouts.length > 0,
      nutrition: todayNutrition.calories > 0,
      water: false
    };

    const completedGoals = Object.values(dailyGoals).filter(Boolean).length;
    return Math.round((completedGoals / Object.keys(dailyGoals).length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back!</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Last updated:</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Daily Streak</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{streak} days</p>
              </div>
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Coins Earned</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{coins}</p>
              </div>
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Workouts</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{exercises.length}</p>
              </div>
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Progress</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{calculateProgress()}%</p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {activities.slice(0, 3).map(activity => (
                <div key={activity.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b last:border-0">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm sm:text-base text-gray-900">{activity.type}</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +{activity.coinsEarned} coins
                  </span>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No recent activities</p>
              )}
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Goals Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">Daily Steps</span>
                  <span className="text-sm text-gray-600">8,500 / 10,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">Weekly Workouts</span>
                  <span className="text-sm text-gray-600">
                    {exercises.filter(ex => {
                      const exDate = new Date(ex.date);
                      const weekStart = new Date();
                      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                      return exDate >= weekStart;
                    }).length} / 5
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min(
                        (exercises.filter(ex => {
                          const exDate = new Date(ex.date);
                          const weekStart = new Date();
                          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                          return exDate >= weekStart;
                        }).length / 5) * 100, 
                        100
                      )}%` 
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">Calories Goal</span>
                  <span className="text-sm text-gray-600">
                    {todayNutrition.calories} / {2200}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min((todayNutrition.calories / 2200) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}