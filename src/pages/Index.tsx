
import React, { useState } from 'react';
import QuestionnaireForm from '../components/QuestionnaireForm';
import ResultsPage from '../components/ResultsPage';
import { UserProfile, getRecommendations, StockRecommendation } from '../utils/stockRecommendations';

const Index = () => {
  const [step, setStep] = useState<'questionnaire' | 'results'>('questionnaire');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  
  const handleQuestionnaireComplete = (profile: UserProfile) => {
    const stockRecommendations = getRecommendations(profile);
    setUserProfile(profile);
    setRecommendations(stockRecommendations);
    setStep('results');
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReset = () => {
    setStep('questionnaire');
    setUserProfile(null);
    setRecommendations([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-finance-blue mb-2">Smart Stock Allocator</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get personalized stock recommendations based on your risk profile and investment goals.
        </p>
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
