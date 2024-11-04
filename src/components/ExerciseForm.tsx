import React, { useState } from 'react';
import { useFitnessStore } from '../store/fitnessStore';

interface ExerciseFormProps {
  onClose: () => void;
}

export default function ExerciseForm({ onClose }: ExerciseFormProps) {
  const addExercise = useFitnessStore((state) => state.addExercise);
  const [exerciseData, setExerciseData] = useState({
    type: 'cardio',
    name: '',
    duration: 0,
    caloriesBurned: 0,
    sets: 0,
    reps: 0,
    weight: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExercise({
      ...exerciseData,
      date: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Exercise Type</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={exerciseData.type}
          onChange={(e) => setExerciseData({ ...exerciseData, type: e.target.value })}
        >
          <option value="cardio">Cardio</option>
          <option value="strength">Strength Training</option>
          <option value="flexibility">Flexibility</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Exercise Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={exerciseData.name}
          onChange={(e) => setExerciseData({ ...exerciseData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={exerciseData.duration}
            onChange={(e) => setExerciseData({ ...exerciseData, duration: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Calories Burned</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={exerciseData.caloriesBurned}
            onChange={(e) =>
              setExerciseData({ ...exerciseData, caloriesBurned: Number(e.target.value) })
            }
          />
        </div>

        {exerciseData.type === 'strength' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sets</label>
              <input
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={exerciseData.sets}
                onChange={(e) => setExerciseData({ ...exerciseData, sets: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reps</label>
              <input
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={exerciseData.reps}
                onChange={(e) => setExerciseData({ ...exerciseData, reps: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={exerciseData.weight}
                onChange={(e) => setExerciseData({ ...exerciseData, weight: Number(e.target.value) })}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
        >
          Save Exercise
        </button>
      </div>
    </form>
  );
}