import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Brain, Users, Trophy, Mail, Phone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Your Path to Wellness</span>
              <span className="block text-green-600">Simplified</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join Mimo and discover a smarter way to achieve your health and fitness goals. Track your progress, connect with others, and get personalized recommendations all in one place.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link to="/login" className="btn-secondary">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose Mimo?
            </h2>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Comprehensive Tracking
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Monitor your workouts, nutrition, and progress all in one place with detailed analytics and insights.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Smart Recommendations
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Get personalized workout and nutrition plans based on your goals, preferences, and progress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Supportive Community
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Connect with like-minded individuals, share achievements, and motivate each other.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-lg text-gray-500">
              Have questions? We're here to help!
            </p>
          </div>
          <div className="mt-12 flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center text-gray-600">
              <Mail className="h-6 w-6 mr-2" />
              <a href="mailto:support@mimo.co.in" className="hover:text-green-600">
                support@mimo.co.in
              </a>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-6 w-6 mr-2" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}