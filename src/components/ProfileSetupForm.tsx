import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';

interface ProfileSetupFormProps {
  onComplete: () => void;
}

export default function ProfileSetupForm({ onComplete }: ProfileSetupFormProps) {
  const updateProfile = useUserStore((state) => state.updateProfile);
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    weight: 0,
    height: 0,
    activityLevel: 'moderate' as const,
    goals: [] as string[],
    dietaryRestrictions: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCalories = calculateTargetCalories(formData);
    updateProfile({ ...formData, targetCalories });
    onComplete();
  };

  const calculateTargetCalories = (data: typeof formData) => {
    // Basic BMR calculation using Harris-Benedict equation
    const bmr =
      10 * data.weight + 6.25 * data.height - 5 * data.age + (data.gender === 'male' ? 5 : -161);

    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725,
    };

    return Math.round(bmr * activityMultipliers[data.activityLevel]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Activity Level</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.activityLevel}
            onChange={(e) =>
              setFormData({ ...formData, activityLevel: e.target.value as any })
            }
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="very_active">Very Active</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fitness Goals</label>
        <div className="mt-2 space-y-2">
          {['Weight Loss', 'Muscle Gain', 'Endurance', 'General Fitness'].map((goal) => (
            <label key={goal} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                checked={formData.goals.includes(goal)}
                onChange={(e) => {
                  const goals = e.target.checked
                    ? [...formData.goals, goal]
                    : formData.goals.filter((g) => g !== goal);
                  setFormData({ ...formData, goals });
                }}
              />
              <span className="ml-2">{goal}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
        <div className="mt-2 space-y-2">
          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'].map((restriction) => (
            <label key={restriction} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                checked={formData.dietaryRestrictions.includes(restriction)}
                onChange={(e) => {
                  const restrictions = e.target.checked
                    ? [...formData.dietaryRestrictions, restriction]
                    : formData.dietaryRestrictions.filter((r) => r !== restriction);
                  setFormData({ ...formData, dietaryRestrictions: restrictions });
                }}
              />
              <span className="ml-2">{restriction}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
        >
          Complete Profile Setup
        </button>
      </div>
    </form>
  );
}