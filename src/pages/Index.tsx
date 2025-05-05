
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionnaireForm from '../components/QuestionnaireForm';
import ResultsPage from '../components/ResultsPage';
import { UserProfile, getRecommendations, StockRecommendation } from '../utils/stockRecommendations';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [step, setStep] = useState<'questionnaire' | 'results'>('questionnaire');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const navigate = useNavigate();
  
  const handleQuestionnaireComplete = (profile: UserProfile) => {
    const stockRecommendations = getRecommendations(profile);
    setUserProfile(profile);
    setRecommendations(stockRecommendations);
    setStep('results');
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReset = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <header className="mb-12">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-finance-blue">Smart Stock Allocator</h1>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="max-w-4xl mx-auto px-4 mt-4">
          <p className="text-xl text-gray-600">
            Get personalized stock recommendations based on your risk profile and investment goals.
          </p>
        </div>
      </header>
      
      <main>
        {step === 'questionnaire' ? (
          <QuestionnaireForm onComplete={handleQuestionnaireComplete} />
        ) : userProfile ? (
          <ResultsPage 
            userProfile={userProfile} 
            recommendations={recommendations}
            onReset={handleReset}
          />
        ) : null}
      </main>
      
      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Smart Stock Allocator. All data is for demonstration purposes only.</p>
        <p className="mt-1">Not financial advice. Always do your own research before investing.</p>
      </footer>
    </div>
  );
};

export default Index;
