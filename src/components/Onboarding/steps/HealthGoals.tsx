import React, { useState } from 'react';
import { Target, TrendingDown, Dumbbell, Heart } from 'lucide-react';

interface HealthGoalsProps {
  onNext: (data: any) => void;
  initialData?: string[];
}

export default function HealthGoals({ onNext, initialData = [] }: HealthGoalsProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialData);

  const goals = [
    {
      id: 'weight-loss',
      title: 'Weight Loss',
      description: 'Reduce body weight and improve body composition',
      icon: TrendingDown,
    },
    {
      id: 'muscle-gain',
      title: 'Muscle Gain',
      description: 'Build strength and increase muscle mass',
      icon: Dumbbell,
    },
    {
      id: 'general-fitness',
      title: 'General Fitness',
      description: 'Improve overall health and wellness',
      icon: Heart,
    },
    {
      id: 'specific-goals',
      title: 'Specific Goals',
      description: 'Train for a specific event or achievement',
      icon: Target,
    },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(selectedGoals);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {goals.map(({ id, title, description, icon: Icon }) => (
          <div
            key={id}
            onClick={() => toggleGoal(id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              selectedGoals.includes(id)
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                selectedGoals.includes(id) ? 'bg-green-500 text-white' : 'bg-gray-100'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={selectedGoals.length === 0}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </form>
  );
}