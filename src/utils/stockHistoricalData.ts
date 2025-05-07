
interface HistoricalPrice {
  year: string;
  price: number;
}

export interface StockHistoricalData {
  ticker: string;
  name: string;
  sector: string;
  performance: number;
  historicalPrices: HistoricalPrice[];
}

export const stockHistoricalData: StockHistoricalData[] = [
  {
    ticker: "RELIANCE",
    name: "Reliance Industries Ltd.",
    sector: "Oil & Gas",
    performance: 185,
    historicalPrices: [
      { year: "2020", price: 1207 },
      { year: "2021", price: 1987 },
      { year: "2022", price: 2372 },
      { year: "2023", price: 2510 },
      { year: "2024", price: 2968 }
    ]
  },
  {
    ticker: "TCS",
    name: "Tata Consultancy Services Ltd.",
    sector: "Information Technology",
    performance: 130,
    historicalPrices: [
      { year: "2020", price: 1850 },
      { year: "2021", price: 2902 },
      { year: "2022", price: 3314 },
      { year: "2023", price: 3175 },
      { year: "2024", price: 4251 }
    ]
  },
  {
    ticker: "HDFCBANK",
    name: "HDFC Bank Ltd.",
    sector: "Banking",
    performance: 110,
    historicalPrices: [
      { year: "2020", price: 1065 },
      { year: "2021", price: 1479 },
      { year: "2022", price: 1825 },
      { year: "2023", price: 1612 },
      { year: "2024", price: 2236 }
    ]
  },
  {
    ticker: "INFY",
    name: "Infosys Ltd.",
    sector: "Information Technology",
    performance: 145,
    historicalPrices: [
      { year: "2020", price: 632 },
      { year: "2021", price: 1125 },
      { year: "2022", price: 1451 },
      { year: "2023", price: 1325 },
      { year: "2024", price: 1548 }
    ]
  },
  {
    ticker: "SBIN",
    name: "State Bank of India",
    sector: "Banking",
    performance: 75,
    historicalPrices: [
      { year: "2020", price: 258 },
      { year: "2021", price: 345 },
      { year: "2022", price: 475 },
      { year: "2023", price: 534 },
      { year: "2024", price: 651 }
    ]
  },
  {
    ticker: "SUNPHARMA",
    name: "Sun Pharmaceutical Industries Ltd.",
    sector: "Healthcare",
    performance: 65,
    historicalPrices: [
      { year: "2020", price: 412 },
      { year: "2021", price: 568 },
      { year: "2022", price: 625 },
      { year: "2023", price: 652 },
      { year: "2024", price: 680 }
    ]
  },
  {
    ticker: "HUL",
    name: "Hindustan Unilever Ltd.",
    sector: "Consumer Goods",
    performance: 120,
    historicalPrices: [
      { year: "2020", price: 1998 },
      { year: "2021", price: 2276 },
      { year: "2022", price: 2452 },
      { year: "2023", price: 2589 },
      { year: "2024", price: 4395 }
    ]
  },
  {
    ticker: "BAJFINANCE",
    name: "Bajaj Finance Ltd.",
    sector: "Finance",
    performance: 340,
    historicalPrices: [
      { year: "2020", price: 2351 },
      { year: "2021", price: 4675 },
      { year: "2022", price: 6512 },
      { year: "2023", price: 7856 },
      { year: "2024", price: 10345 }
    ]
  },
  {
    ticker: "ADANIPORTS",
    name: "Adani Ports and Special Economic Zone Ltd.",
    sector: "Infrastructure",
    performance: 180,
    historicalPrices: [
      { year: "2020", price: 328 },
      { year: "2021", price: 698 },
      { year: "2022", price: 775 },
      { year: "2023", price: 745 },
      { year: "2024", price: 918 }
    ]
  },
  {
    ticker: "BHARTIARTL",
    name: "Bharti Airtel Ltd.",
    sector: "Telecom",
    performance: 125,
    historicalPrices: [
      { year: "2020", price: 458 },
      { year: "2021", price: 543 },
      { year: "2022", price: 675 },
      { year: "2023", price: 765 },
      { year: "2024", price: 1031 }
    ]
  },
  {
    ticker: "ITC",
    name: "ITC Ltd.",
    sector: "Consumer Goods",
    performance: 95,
    historicalPrices: [
      { year: "2020", price: 187 },
      { year: "2021", price: 215 },
      { year: "2022", price: 256 },
      { year: "2023", price: 350 },
      { year: "2024", price: 364 }
    ]
  },
  {
    ticker: "TATAMOTORS",
    name: "Tata Motors Ltd.",
    sector: "Automobile",
    performance: 245,
    historicalPrices: [
      { year: "2020", price: 126 },
      { year: "2021", price: 298 },
      { year: "2022", price: 425 },
      { year: "2023", price: 512 },
      { year: "2024", price: 435 }
    ]
  }
];
