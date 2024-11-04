import React, { useState } from 'react';
import { Leaf, Fish, Wheat, Milk } from 'lucide-react';

interface DietaryPreferencesProps {
  onNext: (data: any) => void;
  initialData?: string[];
}

export default function DietaryPreferences({ onNext, initialData = [] }: DietaryPreferencesProps) {
  const [preferences, setPreferences] = useState<string[]>(initialData);
  const [cuisineType, setCuisineType] = useState('');

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
    { id: 'non-vegetarian', label: 'Non-Vegetarian', icon: Fish },
    { id: 'gluten-free', label: 'Gluten Free', icon: Wheat },
    { id: 'dairy-free', label: 'Dairy Free', icon: Milk },
  ];

  const cuisineOptions = [
    'Indian',
    'South Indian',
    'Continental',
    'Mediterranean',
    'Asian',
  ];

  const togglePreference = (prefId: string) => {
    setPreferences(prev =>
      prev.includes(prefId)
        ? prev.filter(id => id !== prefId)
        : [...prev, prefId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ preferences, cuisineType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Dietary Preferences</h3>
        <div className="grid grid-cols-2 gap-4">
          {dietaryOptions.map(({ id, label, icon: Icon }) => (
            <div
              key={id}
              onClick={() => togglePreference(id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                preferences.includes(id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon className={`w-6 h-6 ${
                  preferences.includes(id) ? 'text-green-500' : 'text-gray-400'
                }`} />
                <span className="text-sm font-medium text-gray-900">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferred Cuisine</h3>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
        >
          <option value="">Select cuisine type...</option>
          {cuisineOptions.map(cuisine => (
            <option key={cuisine} value={cuisine.toLowerCase()}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={preferences.length === 0 || !cuisineType}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </form>
  );
}