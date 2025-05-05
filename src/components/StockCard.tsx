
import React from 'react';
import { StockRecommendation } from '../utils/stockRecommendations';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StockCardProps {
  stock: StockRecommendation;
  investmentAmount: number;
}

const StockCard: React.FC<StockCardProps> = ({ stock, investmentAmount }) => {
  // Calculate the dollar amount based on allocation percentage
  const allocationAmount = (stock.allocation / 100) * investmentAmount;
  
  // Determine if the stock has been performing well
  const isPerforming = stock.fiveYearPerformance > 100;

  return (
    <div className="finance-card animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{stock.ticker}</h3>
          <p className="text-sm text-gray-600">{stock.name}</p>
        </div>
        <div className="flex items-center">
          {isPerforming ? (
            <ArrowUp className="text-finance-green mr-1 h-5 w-5" />
          ) : (
            <ArrowDown className="text-finance-red mr-1 h-5 w-5" />
          )}
          <span className={`font-medium ${isPerforming ? 'text-finance-green' : 'text-finance-red'}`}>
            {stock.fiveYearPerformance}%
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-4">{stock.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Allocation</span>
          <span className="text-sm font-semibold">{stock.allocation}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div 
            className="h-full rounded-full bg-finance-blue"
            style={{ width: `${stock.allocation}%` }}
          />
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">Amount</span>
          <span className="text-sm font-semibold">${allocationAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center text-xs">
        <span className={`px-2 py-1 rounded-full ${stock.risk === 'low' ? 'bg-green-100 text-green-800' : stock.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
          {stock.risk.toUpperCase()} RISK
        </span>
        <span className="text-gray-500">{stock.sector}</span>
      </div>
    </div>
  );
};

export default StockCard;
