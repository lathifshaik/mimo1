import React from 'react';
import { Dumbbell, Clock, Flame, BarChart } from 'lucide-react';

export default function Fitness() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Fitness Programs</h1>

      {/* Workout Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Strength Training */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Dumbbell className="h-8 w-8 text-green-600" />
            <h2 className="text-xl font-semibold ml-2">Strength Training</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Build muscle and increase strength with our comprehensive weight training programs.
          </p>
          <button className="btn-primary w-full">View Workouts</button>
        </div>

        {/* Cardio */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Flame className="h-8 w-8 text-green-600" />
            <h2 className="text-xl font-semibold ml-2">Cardio</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Improve your endurance and burn calories with our varied cardio workouts.
          </p>
          <button className="btn-primary w-full">View Workouts</button>
        </div>

        {/* HIIT */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Clock className="h-8 w-8 text-green-600" />
            <h2 className="text-xl font-semibold ml-2">HIIT</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Maximum results in minimum time with high-intensity interval training.
          </p>
          <button className="btn-primary w-full">View Workouts</button>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
        <div className="h-64 flex items-end justify-between space-x-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-green-200 rounded-t"
                style={{ height: `${Math.random() * 100 + 20}px` }}
              ></div>
              <span className="text-sm text-gray-600 mt-2">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Workouts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recommended Workouts</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Dumbbell className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <h3 className="font-medium">Full Body Strength</h3>
                <p className="text-sm text-gray-500">45 mins • Intermediate</p>
              </div>
            </div>
            <button className="btn-secondary">Start</button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <h3 className="font-medium">HIIT Cardio Blast</h3>
                <p className="text-sm text-gray-500">30 mins • Advanced</p>
              </div>
            </div>
            <button className="btn-secondary">Start</button>
          </div>
        </div>
      </div>
    </div>
  );
}