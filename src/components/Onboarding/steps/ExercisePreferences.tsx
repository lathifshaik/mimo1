import React, { useState } from 'react';
import { Dumbbell, Timer, Clock, Activity } from 'lucide-react'; // Using Activity as a substitute icon.

interface ExercisePreferencesProps {
  onNext: (data: any) => void;
  initialData?: any;
}

export default function ExercisePreferences({ onNext, initialData = {} }: ExercisePreferencesProps) {
  const [preferences, setPreferences] = useState({
    workoutTypes: initialData.workoutTypes || [],
    intensity: initialData.intensity || '',
    frequency: initialData.frequency || '',
    duration: initialData.duration || '',
  });

  const workoutTypes = [
    { id: 'strength', label: 'Strength Training', icon: Dumbbell },
    { id: 'cardio', label: 'Cardio', icon: Timer },
    { id: 'flexibility', label: 'Yoga & Flexibility', icon: Activity }, // Replaced Yoga with Activity icon
    { id: 'hiit', label: 'HIIT', icon: Clock },
  ];

  const toggleWorkoutType = (typeId: string) => {
    setPreferences(prev => ({
      ...prev,
      workoutTypes: prev.workoutTypes.includes(typeId)
        ? prev.workoutTypes.filter(id => id !== typeId)
        : [...prev.workoutTypes, typeId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferred Workout Types</h3>
        <div className="grid grid-cols-2 gap-4">
          {workoutTypes.map(({ id, label, icon: Icon }) => (
            <div
              key={id}
              onClick={() => toggleWorkoutType(id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                preferences.workoutTypes.includes(id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon className={`w-6 h-6 ${
                  preferences.workoutTypes.includes(id) ? 'text-green-500' : 'text-gray-400'
                }`} />
                <span className="text-sm font-medium text-gray-900">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Preferred Intensity</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={preferences.intensity}
          onChange={(e) => setPreferences({ ...preferences, intensity: e.target.value })}
        >
          <option value="">Select intensity level...</option>
          <option value="beginner">Beginner - Light intensity</option>
          <option value="intermediate">Intermediate - Moderate intensity</option>
          <option value="advanced">Advanced - High intensity</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Weekly Workout Frequency</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={preferences.frequency}
          onChange={(e) => setPreferences({ ...preferences, frequency: e.target.value })}
        >
          <option value="">Select frequency...</option>
          <option value="1-2">1-2 times per week</option>
          <option value="3-4">3-4 times per week</option>
          <option value="5+">5+ times per week</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Preferred Workout Duration</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={preferences.duration}
          onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
        >
          <option value="">Select duration...</option>
          <option value="15-30">15-30 minutes</option>
          <option value="30-45">30-45 minutes</option>
          <option value="45-60">45-60 minutes</option>
          <option value="60+">60+ minutes</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!preferences.workoutTypes.length || !preferences.intensity || !preferences.frequency || !preferences.duration}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </form>
  );
}