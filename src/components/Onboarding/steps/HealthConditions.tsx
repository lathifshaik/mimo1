import React, { useState } from 'react';
import { Heart, AlertCircle } from 'lucide-react';

interface HealthConditionsProps {
  onNext: (data: any) => void;
  initialData?: any;
}

export default function HealthConditions({ onNext, initialData = {} }: HealthConditionsProps) {
  const [formData, setFormData] = useState({
    conditions: initialData.conditions || [],
    medications: initialData.medications || '',
    injuries: initialData.injuries || '',
    additionalNotes: initialData.additionalNotes || '',
  });

  const commonConditions = [
    'Hypertension',
    'Diabetes',
    'Asthma',
    'Heart Condition',
    'Joint Pain',
    'Back Pain',
    'Pregnancy',
    'Other',
  ];

  const toggleCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Heart className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-medium text-gray-900">Health Conditions</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {commonConditions.map((condition) => (
            <div
              key={condition}
              onClick={() => toggleCondition(condition)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                formData.conditions.includes(condition)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-sm font-medium text-gray-900">{condition}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Medications</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          rows={2}
          placeholder="List any medications you're currently taking..."
          value={formData.medications}
          onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Previous Injuries</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          rows={2}
          placeholder="Describe any previous injuries or surgeries..."
          value={formData.injuries}
          onChange={(e) => setFormData({ ...formData, injuries: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Health Notes</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          rows={3}
          placeholder="Any other health-related information you'd like to share..."
          value={formData.additionalNotes}
          onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
            <p className="mt-2 text-sm text-yellow-700">
              Please consult with a healthcare professional before starting any new exercise program,
              especially if you have any medical conditions or concerns.
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Complete Profile Setup
      </button>
    </form>
  );
}