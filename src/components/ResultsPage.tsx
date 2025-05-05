
import React from 'react';
import { UserProfile, StockRecommendation } from '../utils/stockRecommendations';
import StockCard from './StockCard';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartPie, CircleCheck, Info } from "lucide-react";

interface ResultsPageProps {
  userProfile: UserProfile;
  recommendations: StockRecommendation[];
  onReset: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ userProfile, recommendations, onReset }) => {
  // Calculate total percentage to make sure it adds up to 100%
  const totalAllocation = recommendations.reduce((sum, stock) => sum + stock.allocation, 0);
  
  // Profile summary text
  const getRiskText = () => {
    switch(userProfile.riskTolerance) {
      case 'low': return 'Conservative';
      case 'medium': return 'Balanced';
      case 'high': return 'Aggressive';
      default: return '';
    }
  };
  
  const getTermText = () => {
    switch(userProfile.investmentTerm) {
      case 'short': return 'Short-term (1-2 years)';
      case 'medium': return 'Medium-term (3-5 years)';
      case 'long': return 'Long-term (6+ years)';
      default: return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-green-100">
          <CircleCheck className="h-8 w-8 text-finance-green" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Stock Recommendations</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your {getRiskText()} risk profile and {getTermText()} investment horizon, here are our recommended stocks for your ${userProfile.investmentAmount.toLocaleString()} investment.
        </p>
      </div>
      
      <Card className="mb-8 border-none shadow-lg animate-fade-in">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <ChartPie className="h-5 w-5 text-finance-blue" />
            <h3 className="text-xl font-semibold">Investment Summary</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Risk Profile</p>
              <p className="text-lg font-medium">{getRiskText()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Time Horizon</p>
              <p className="text-lg font-medium">{getTermText()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Initial Investment</p>
              <p className="text-lg font-medium">${userProfile.investmentAmount.toLocaleString()}</p>
            </div>
            {userProfile.monthlyAddition ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Monthly Addition</p>
                <p className="text-lg font-medium">${userProfile.monthlyAddition.toLocaleString()}</p>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Number of Stocks</p>
                <p className="text-lg font-medium">{recommendations.length}</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start">
            <Info className="h-5 w-5 text-finance-blue mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Important Note</h4>
              <p className="text-sm text-gray-700">
                These recommendations are for educational purposes only and do not constitute financial advice. Always conduct your own research or consult with a financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-semibold mb-4 animate-fade-in">Recommended Allocation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {recommendations.map(stock => (
          <StockCard 
            key={stock.id}
            stock={stock}
            investmentAmount={userProfile.investmentAmount}
          />
        ))}
      </div>
      
      <div className="text-center mb-16 animate-fade-in">
        <Button
          onClick={onReset}
          variant="outline"
          className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
