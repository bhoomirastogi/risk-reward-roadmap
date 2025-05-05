
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { UserProfile } from '../utils/stockRecommendations';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuestionnaireFormProps {
  onComplete: (profile: UserProfile) => void;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const [profile, setProfile] = useState<UserProfile>({
    riskTolerance: 'medium',
    investmentTerm: 'medium',
    investmentAmount: 5000,
    monthlyAddition: 0,
    sectors: []
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-2">
          <h2 className="text-2xl font-bold text-finance-blue mb-1">Investment Profile Questionnaire</h2>
          <p className="text-gray-600">Tell us about your investment goals so we can recommend the right stocks for you.</p>
          <ProgressBar currentStep={step} totalSteps={totalSteps} />
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">What is your risk tolerance?</h3>
              <p className="text-gray-600 mb-6">This helps us determine which types of investments are suitable for you.</p>
              
              <div className="space-y-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${profile.riskTolerance === 'low' ? 'border-finance-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setProfile({...profile, riskTolerance: 'low'})}
                >
                  <h4 className="font-medium mb-1">Low Risk</h4>
                  <p className="text-sm text-gray-600">I prefer stable investments and am uncomfortable with significant fluctuations in value.</p>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${profile.riskTolerance === 'medium' ? 'border-finance-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setProfile({...profile, riskTolerance: 'medium'})}
                >
                  <h4 className="font-medium mb-1">Medium Risk</h4>
                  <p className="text-sm text-gray-600">I can accept moderate fluctuations for potential higher returns over time.</p>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${profile.riskTolerance === 'high' ? 'border-finance-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setProfile({...profile, riskTolerance: 'high'})}
                >
                  <h4 className="font-medium mb-1">High Risk</h4>
                  <p className="text-sm text-gray-600">I'm comfortable with significant fluctuations and willing to accept higher risk for potentially higher returns.</p>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">What is your investment time horizon?</h3>
              <p className="text-gray-600 mb-6">How long do you plan to keep your money invested?</p>
              
              <div className="space-y-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${profile.investmentTerm === 'short' ? 'border-finance-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setProfile({...profile, investmentTerm: 'short'})}
                >
                  <h4 className="font-medium mb-1">Short Term (1-2 years)</h4>
                  <p className="text-sm text-gray-600">I'll need to access this money relatively soon.</p>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${profile.investmentTerm === 'medium' ? 'border-finance-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setProfile({...profile, investmentTerm: 'medium'})}
                >
                  <h4 className="font-medium mb-1">Medium Term (3-5 years)</h4>
                  <p className="text-sm text-gray-600">I'm planning for goals a few years away.</p>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${profile.investmentTerm === 'long' ? 'border-finance-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setProfile({...profile, investmentTerm: 'long'})}
                >
                  <h4 className="font-medium mb-1">Long Term (6+ years)</h4>
                  <p className="text-sm text-gray-600">I'm investing for long-term growth and can withstand market fluctuations.</p>
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">How much are you looking to invest?</h3>
              <p className="text-gray-600 mb-6">Enter the amount you're planning to invest initially.</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment Amount ($)</label>
                <input 
                  type="number" 
                  min="100"
                  value={profile.investmentAmount}
                  onChange={(e) => setProfile({...profile, investmentAmount: parseInt(e.target.value) || 0})}
                  className="input-finance"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Additional Contribution (Optional)</label>
                <input 
                  type="number"
                  min="0"
                  value={profile.monthlyAddition}
                  onChange={(e) => setProfile({...profile, monthlyAddition: parseInt(e.target.value) || 0})}
                  className="input-finance"
                />
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Which sectors interest you?</h3>
              <p className="text-gray-600 mb-6">Select all sectors you'd like to include in your portfolio (optional).</p>
              
              {["Technology", "Healthcare", "Financial Services", "Consumer Cyclical", "Consumer Defensive", "ETF", "Auto Manufacturers"].map((sector) => (
                <div className="mb-2" key={sector}>
                  <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded">
                    <input 
                      type="checkbox"
                      checked={profile.sectors?.includes(sector) || false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProfile({...profile, sectors: [...(profile.sectors || []), sector]});
                        } else {
                          setProfile({...profile, sectors: profile.sectors?.filter(s => s !== sector)});
                        }
                      }}
                      className="mr-2 h-4 w-4 rounded text-finance-blue focus:ring-finance-blue"
                    />
                    {sector}
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Back
              </Button>
            )}
            {step === 1 && <div></div>}
            <Button
              onClick={handleNext}
              className="bg-finance-blue hover:bg-blue-800"
            >
              {step === totalSteps ? 'See Recommendations' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionnaireForm;
