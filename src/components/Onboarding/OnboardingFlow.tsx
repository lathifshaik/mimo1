import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PersonalInfo from './steps/PersonalInfo';
import HealthGoals from './steps/HealthGoals';
import DietaryPreferences from './steps/DietaryPreferences';
import ExercisePreferences from './steps/ExercisePreferences';
import HealthConditions from './steps/HealthConditions';
import { useUserStore } from '../../store/userStore';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {},
    goals: [],
    dietary: [],
    exercise: [],
    health: [],
  });
  const navigate = useNavigate();
  const updateProfile = useUserStore(state => state.updateProfile);

  const steps = [
    { id: 1, component: PersonalInfo },
    { id: 2, component: HealthGoals },
    { id: 3, component: DietaryPreferences },
    { id: 4, component: ExercisePreferences },
    { id: 5, component: HealthConditions },
  ];

  const handleNext = (data: any) => {
    const updatedData = { ...formData, [getCurrentStepKey()]: data };
    setFormData(updatedData);
    
    if (step === steps.length) {
      updateProfile(updatedData);
      navigate('/dashboard');
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const getCurrentStepKey = () => {
    switch (step) {
      case 1: return 'personal';
      case 2: return 'goals';
      case 3: return 'dietary';
      case 4: return 'exercise';
      case 5: return 'health';
      default: return '';
    }
  };

  const CurrentStep = steps[step - 1].component;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6">
      <div className="max-w-md mx-auto w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Let's get to know you
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Step {step} of {steps.length}
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <CurrentStep
            onNext={handleNext}
            initialData={formData[getCurrentStepKey()]}
          />

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
            )}
            <div className="flex-1" />
            <div className="flex space-x-2">
              {Array.from({ length: steps.length }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full ${
                    idx + 1 === step ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}