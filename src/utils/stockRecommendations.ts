
// Define types for our user profile
export type RiskProfile = 'low' | 'medium' | 'high';
export type InvestmentTerm = 'short' | 'medium' | 'long';

export interface UserProfile {
  riskTolerance: RiskProfile;
  investmentTerm: InvestmentTerm;
  investmentAmount: number;
  monthlyAddition?: number;
  sectors?: string[];
}

export interface StockRecommendation {
  id: string;
  ticker: string;
  name: string;
  allocation: number;
  risk: RiskProfile;
  sector: string;
  fiveYearPerformance: number;
  description: string;
}

// Mock data for Indian stock recommendations
const stockDatabase: StockRecommendation[] = [
  {
    id: '1',
    ticker: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    allocation: 0,
    risk: 'medium',
    sector: 'Oil & Gas',
    fiveYearPerformance: 185,
    description: 'Indian conglomerate with businesses in energy, petrochemicals, textiles, retail, and telecommunications.'
  },
  {
    id: '2',
    ticker: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    allocation: 0,
    risk: 'medium',
    sector: 'Information Technology',
    fiveYearPerformance: 130,
    description: 'India\'s largest IT services company providing consulting, technology, and outsourcing services.'
  },
  {
    id: '3',
    ticker: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    allocation: 0,
    risk: 'medium',
    sector: 'Banking',
    fiveYearPerformance: 110,
    description: 'One of India\'s leading private sector banks with a strong presence in retail and corporate banking.'
  },
  {
    id: '4',
    ticker: 'INFY',
    name: 'Infosys Ltd.',
    allocation: 0,
    risk: 'medium',
    sector: 'Information Technology',
    fiveYearPerformance: 145,
    description: 'Global leader in next-generation digital services and consulting, helping clients in digital transformation.'
  },
  {
    id: '5',
    ticker: 'SBIN',
    name: 'State Bank of India',
    allocation: 0,
    risk: 'low',
    sector: 'Banking',
    fiveYearPerformance: 75,
    description: 'India\'s largest public sector bank with a significant market share in domestic banking.'
  },
  {
    id: '6',
    ticker: 'SUNPHARMA',
    name: 'Sun Pharmaceutical Industries Ltd.',
    allocation: 0,
    risk: 'low',
    sector: 'Healthcare',
    fiveYearPerformance: 65,
    description: 'India\'s largest pharmaceutical company specializing in generic drugs and active pharmaceutical ingredients.'
  },
  {
    id: '7',
    ticker: 'HUL',
    name: 'Hindustan Unilever Ltd.',
    allocation: 0,
    risk: 'low',
    sector: 'Consumer Goods',
    fiveYearPerformance: 120,
    description: 'India\'s largest fast-moving consumer goods company with products ranging from food to personal care.'
  },
  {
    id: '8',
    ticker: 'BAJFINANCE',
    name: 'Bajaj Finance Ltd.',
    allocation: 0,
    risk: 'high',
    sector: 'Finance',
    fiveYearPerformance: 340,
    description: 'One of India\'s leading non-banking financial companies offering various financial services and loans.'
  },
  {
    id: '9',
    ticker: 'ADANIPORTS',
    name: 'Adani Ports and Special Economic Zone Ltd.',
    allocation: 0,
    risk: 'high',
    sector: 'Infrastructure',
    fiveYearPerformance: 180,
    description: 'India\'s largest private port operator with a portfolio of ports and logistics businesses.'
  },
  {
    id: '10',
    ticker: 'NIFTYBEES',
    name: 'Nippon India ETF Nifty BeES',
    allocation: 0,
    risk: 'medium',
    sector: 'ETF',
    fiveYearPerformance: 90,
    description: 'Exchange-traded fund that tracks the performance of the Nifty 50 Index, providing exposure to India\'s top 50 companies.'
  },
  {
    id: '11',
    ticker: 'BANKBEES',
    name: 'Nippon India ETF Bank BeES',
    allocation: 0,
    risk: 'medium',
    sector: 'ETF',
    fiveYearPerformance: 75,
    description: 'Exchange-traded fund that provides exposure to India\'s banking sector by tracking the Nifty Bank Index.'
  },
  {
    id: '12',
    ticker: 'ZOMATO',
    name: 'Zomato Ltd.',
    allocation: 0,
    risk: 'high',
    sector: 'Technology',
    fiveYearPerformance: 30,
    description: 'Indian multinational restaurant aggregator and food delivery company offering restaurant discovery and delivery services.'
  }
];

// Function to get stock recommendations based on user profile
export const getRecommendations = (profile: UserProfile): StockRecommendation[] => {
  // Filter stocks based on risk profile
  let filteredStocks = stockDatabase;
  
  // Filter by risk tolerance
  if (profile.riskTolerance === 'low') {
    filteredStocks = stockDatabase.filter(stock => stock.risk === 'low' || stock.ticker === 'NIFTYBEES' || stock.ticker === 'BANKBEES');
  } else if (profile.riskTolerance === 'medium') {
    filteredStocks = stockDatabase.filter(stock => stock.risk === 'low' || stock.risk === 'medium');
  }
  
  // For high risk tolerance, use all stocks but prioritize high-risk ones in allocation

  // Adjust allocation based on risk profile and investment term
  const recommendations = filteredStocks.map(stock => {
    let allocationWeight = 1;
    
    // Adjust allocation based on risk and investment term match
    if (profile.riskTolerance === 'low' && stock.risk === 'low') {
      allocationWeight = 1.5;
    }
    if (profile.riskTolerance === 'medium' && stock.risk === 'medium') {
      allocationWeight = 1.5;
    }
    if (profile.riskTolerance === 'high' && stock.risk === 'high') {
      allocationWeight = 2;
    }
    
    // Investment term adjustments
    if (profile.investmentTerm === 'short' && stock.ticker.includes('BEES')) {
      allocationWeight *= 0.7;
    }
    if (profile.investmentTerm === 'long' && stock.fiveYearPerformance > 150) {
      allocationWeight *= 1.3;
    }
    
    return {
      ...stock,
      allocation: allocationWeight, // This is relative weight, will be converted to percentage later
    };
  });
  
  // Sort by allocation weight
  recommendations.sort((a, b) => b.allocation - a.allocation);
  
  // Take top 5 stocks
  const topRecommendations = recommendations.slice(0, 5);
  
  // Calculate total weight
  const totalWeight = topRecommendations.reduce((sum, stock) => sum + stock.allocation, 0);
  
  // Convert weights to percentages and calculate dollar amounts
  return topRecommendations.map(stock => ({
    ...stock,
    allocation: Math.round((stock.allocation / totalWeight) * 100),
  }));
};
