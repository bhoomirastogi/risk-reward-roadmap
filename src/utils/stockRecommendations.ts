
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

// Mock data for stock recommendations
const stockDatabase: StockRecommendation[] = [
  {
    id: '1',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    allocation: 0,
    risk: 'medium',
    sector: 'Technology',
    fiveYearPerformance: 325,
    description: 'Global technology company that designs and manufactures consumer electronics, software, and services.'
  },
  {
    id: '2',
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    allocation: 0,
    risk: 'medium',
    sector: 'Technology',
    fiveYearPerformance: 380,
    description: 'Technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.'
  },
  {
    id: '3',
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    allocation: 0,
    risk: 'medium',
    sector: 'Consumer Cyclical',
    fiveYearPerformance: 170,
    description: 'Multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.'
  },
  {
    id: '4',
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    allocation: 0,
    risk: 'medium',
    sector: 'Technology',
    fiveYearPerformance: 155,
    description: 'Multinational conglomerate created through a restructuring of Google, owning several companies including Google, Waymo, and others.'
  },
  {
    id: '5',
    ticker: 'BRK.B',
    name: 'Berkshire Hathaway',
    allocation: 0,
    risk: 'low',
    sector: 'Financial Services',
    fiveYearPerformance: 90,
    description: 'Multinational conglomerate holding company led by Warren Buffett with a diverse range of business activities.'
  },
  {
    id: '6',
    ticker: 'JNJ',
    name: 'Johnson & Johnson',
    allocation: 0,
    risk: 'low',
    sector: 'Healthcare',
    fiveYearPerformance: 44,
    description: 'American multinational corporation that develops medical devices, pharmaceuticals, and consumer packaged goods.'
  },
  {
    id: '7',
    ticker: 'PG',
    name: 'Procter & Gamble',
    allocation: 0,
    risk: 'low',
    sector: 'Consumer Defensive',
    fiveYearPerformance: 75,
    description: 'American multinational consumer goods corporation specializing in a wide range of personal health, consumer health, and hygiene products.'
  },
  {
    id: '8',
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    allocation: 0,
    risk: 'high',
    sector: 'Technology',
    fiveYearPerformance: 1400,
    description: 'American multinational technology company that designs graphics processing units (GPUs) for gaming and professional markets.'
  },
  {
    id: '9',
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    allocation: 0,
    risk: 'high',
    sector: 'Auto Manufacturers',
    fiveYearPerformance: 1000,
    description: 'American electric vehicle and clean energy company that designs and manufactures electric cars, battery energy storage, and solar panels.'
  },
  {
    id: '10',
    ticker: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    allocation: 0,
    risk: 'medium',
    sector: 'ETF',
    fiveYearPerformance: 88,
    description: 'Exchange-traded fund that tracks the performance of the S&P 500 Index, providing broad exposure to large U.S. companies.'
  },
  {
    id: '11',
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    allocation: 0,
    risk: 'medium',
    sector: 'ETF',
    fiveYearPerformance: 84,
    description: 'Exchange-traded fund that provides exposure to the entire U.S. equity market, including small-, mid-, and large-cap stocks.'
  },
  {
    id: '12',
    ticker: 'COIN',
    name: 'Coinbase Global Inc.',
    allocation: 0,
    risk: 'high',
    sector: 'Financial Services',
    fiveYearPerformance: 30,
    description: 'American company that operates a cryptocurrency exchange platform, offering a marketplace for cryptocurrencies.'
  }
];

// Function to get stock recommendations based on user profile
export const getRecommendations = (profile: UserProfile): StockRecommendation[] => {
  // Filter stocks based on risk profile
  let filteredStocks = stockDatabase;
  
  // Filter by risk tolerance
  if (profile.riskTolerance === 'low') {
    filteredStocks = stockDatabase.filter(stock => stock.risk === 'low' || stock.ticker === 'VOO' || stock.ticker === 'VTI');
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
    if (profile.investmentTerm === 'short' && stock.ticker.includes('ETF')) {
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
