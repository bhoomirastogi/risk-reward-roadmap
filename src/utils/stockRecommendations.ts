// src/utils/stockRecommendations.ts

export interface StockRecommendation {
  ticker: string;
  name: string;
  sector: string;
  performance: number;
  allocation: number;
  description: string;
  investmentAmount: number;
  // Fixes: Added missing properties to match StockCard component
  fiveYearPerformance: number;
  risk: 'low' | 'medium' | 'high';
}

export type RiskProfile = 'low' | 'medium' | 'high';
export type InvestmentTerm = 'short' | 'medium' | 'long';

export interface UserProfile {
  riskTolerance: RiskProfile;
  investmentTerm: InvestmentTerm;
  investmentAmount: number;
  monthlyAddition?: number;
  sectors?: string[];
  tickers?: string[];
}

export const getRecommendations = async (profile: UserProfile): Promise<StockRecommendation[]> => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        investmentAmount: profile.investmentAmount,
        riskTolerance: profile.riskTolerance,
        sectors: profile.sectors,
        tickers: profile.tickers,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    const recommendations: StockRecommendation[] = await response.json();
    return recommendations;
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    return [];
  }
};