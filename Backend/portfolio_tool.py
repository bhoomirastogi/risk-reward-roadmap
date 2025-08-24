import pandas as pd
import numpy as np
import json
import os
import argparse
from scipy.optimize import minimize

# --- Mock Historical Data to augment API response ---
# This data is used by the Python script to add details like name, sector, and description
# to the recommendations before sending them to the frontend.
stock_metadata = {
    "RELIANCE": {"name": "Reliance Industries Ltd.", "sector": "Oil & Gas", "performance": 185, "description": "Indian conglomerate with businesses in energy, petrochemicals, textiles, retail, and telecommunications."},
    "TCS": {"name": "Tata Consultancy Services Ltd.", "sector": "Information Technology", "performance": 130, "description": "India's largest IT services company providing consulting, technology, and outsourcing services."},
    "HDFCBANK": {"name": "HDFC Bank Ltd.", "sector": "Banking", "performance": 110, "description": "One of India's leading private sector banks with a strong presence in retail and corporate banking."},
    "INFY": {"name": "Infosys Ltd.", "sector": "Information Technology", "performance": 145, "description": "Global leader in next-generation digital services and consulting, helping clients in digital transformation."},
    "SBIN": {"name": "State Bank of India", "sector": "Banking", "performance": 75, "description": "India's largest public sector bank with a significant market share in domestic banking."},
    "SUNPHARMA": {"name": "Sun Pharmaceutical Industries Ltd.", "sector": "Healthcare", "performance": 65, "description": "India's largest pharmaceutical company specializing in generic drugs and active pharmaceutical ingredients."},
    "HINDUNILVR": {"name": "Hindustan Unilever Ltd.", "sector": "Consumer Goods", "performance": 120, "description": "India's largest fast-moving consumer goods company with products ranging from food to personal care."},
    "BAJFINANCE": {"name": "Bajaj Finance Ltd.", "sector": "Finance", "performance": 340, "description": "One of India's leading non-banking financial companies offering various financial services and loans."},
    "ADANIPORTS": {"name": "Adani Ports and Special Economic Zone Ltd.", "sector": "Infrastructure", "performance": 180, "description": "India's largest private port operator with a portfolio of ports and logistics businesses."},
    "BHARTIARTL": {"name": "Bharti Airtel Ltd.", "sector": "Telecom", "performance": 125, "description": "A leading telecommunications company in India providing wireless, enterprise, and digital TV services."},
    "ITC": {"name": "ITC Ltd.", "sector": "Consumer Goods", "performance": 95, "description": "Indian conglomerate with a diversified portfolio including FMCG, hotels, paperboards, and agribusiness."},
    "TATAMOTORS": {"name": "Tata Motors Ltd.", "sector": "Automobile", "performance": 245, "description": "A global automobile manufacturer with a wide range of passenger and commercial vehicles."},
    "EICHERMOT": {"name": "Eicher Motors Ltd.", "sector": "Automobile", "performance": 210, "description": "The parent company of Royal Enfield, a premium motorcycle brand, and a commercial vehicle manufacturer."},
    "MARUTI": {"name": "Maruti Suzuki India Ltd.", "sector": "Automobile", "performance": 170, "description": "India's largest passenger car company."},
    "APOLLOHOSP": {"name": "Apollo Hospitals Enterprise Ltd.", "sector": "Healthcare", "performance": 250, "description": "A leading private healthcare provider in Asia with a network of hospitals and clinics."},
    "DIVISLAB": {"name": "Divi's Laboratories Ltd.", "sector": "Healthcare", "performance": 190, "description": "Indian pharmaceutical company manufacturing active pharmaceutical ingredients and intermediates."},
    "DRREDDY": {"name": "Dr. Reddy's Laboratories Ltd.", "sector": "Healthcare", "performance": 160, "description": "A multinational pharmaceutical company offering a portfolio of products and services including APIs and generics."},
    "WIPRO": {"name": "Wipro Ltd.", "sector": "Information Technology", "performance": 80, "description": "A global information technology, consulting and business process services company."},
    "BAJAJ-AUTO": {"name": "Bajaj Auto Ltd.", "sector": "Automobile", "performance": 150, "description": "A leading manufacturer of motorcycles and three-wheelers in India."},
    "GODREJCP": {"name": "Godrej Consumer Products Ltd.", "sector": "Consumer Goods", "performance": 115, "description": "An Indian consumer goods company manufacturing and marketing personal care, hair care, and household insecticide products."},
    "BRITANNIA": {"name": "Britannia Industries Ltd.", "sector": "Consumer Goods", "performance": 90, "description": "One of India's leading food companies with a strong presence in biscuits, bread, and dairy products."}
}

# --- Data Loading and MPT Functions ---
def load_historical_data(file_path):
    """Loads historical stock data from a single CSV file."""
    try:
        df = pd.read_csv(file_path, index_col='Date', parse_dates=True)
        return df['Adj Close']
    except Exception as e:
        return None

def get_combined_data(tickers):
    """Loads data for multiple tickers and combines them into a single DataFrame."""
    all_data = {}
    for ticker in tickers:
        file_path = f"{ticker}_history.csv"
        data = load_historical_data(file_path)
        if data is not None:
            all_data[ticker] = data
    
    df_stocks = pd.DataFrame(all_data).dropna()
    return df_stocks

def calculate_portfolio_metrics(weights, returns):
    """Calculates portfolio return, volatility, and Sharpe Ratio."""
    portfolio_return = np.sum(returns.mean() * weights) * 252
    portfolio_std_dev = np.sqrt(np.dot(weights.T, np.dot(returns.cov(), weights))) * np.sqrt(252)
    sharpe_ratio = portfolio_return / portfolio_std_dev
    return portfolio_return, portfolio_std_dev, sharpe_ratio

def neg_sharpe_ratio(weights, returns):
    """Objective function to minimize for maximizing Sharpe Ratio."""
    return -calculate_portfolio_metrics(weights, returns)[2]

def get_optimal_portfolio(returns, risk_level):
    """
    Finds the optimal portfolio based on the user's risk tolerance.
    """
    num_assets = len(returns.columns)
    constraints = ({'type': 'eq', 'fun': lambda x: np.sum(x) - 1})
    bounds = tuple((0, 1) for _ in range(num_assets))
    initial_weights = num_assets * [1. / num_assets]

    if risk_level == 'low':
        # Minimize volatility
        min_vol_result = minimize(
            lambda w: calculate_portfolio_metrics(w, returns)[1],
            initial_weights,
            method='SLSQP',
            bounds=bounds,
            constraints=constraints
        )
        return min_vol_result.x
    else: # medium and high risk are optimized for Sharpe Ratio
        max_sharpe_result = minimize(
            neg_sharpe_ratio,
            initial_weights,
            args=(returns,),
            method='SLSQP',
            bounds=bounds,
            constraints=constraints
        )
        return max_sharpe_result.x


def get_recommendations(user_profile):
    """Main function to generate and format recommendations."""
    # This list should be dynamically generated based on user input
    selected_tickers = user_profile.get('tickers', ["RELIANCE", "TCS", "HDFCBANK", "INFY", "SBIN", "SUNPHARMA", "BAJFINANCE", "EICHERMOT", "HINDUNILVR"])

    df_filtered = get_combined_data(selected_tickers)
    if df_filtered.empty:
        return []

    log_returns = np.log(1 + df_filtered.pct_change()).dropna()
    optimal_weights = get_optimal_portfolio(log_returns, user_profile['riskTolerance'])

    recommendations = []
    total_amount = user_profile['investmentAmount']
    for i, ticker in enumerate(df_filtered.columns):
        if optimal_weights[i] > 0.01: # Filter out very small allocations
            allocation_percentage = optimal_weights[i] * 100
            stock_info = stock_metadata.get(ticker, {"name": ticker, "sector": "N/A", "performance": 0, "description": "N/A"})
            recommendations.append({
                "ticker": ticker,
                "name": stock_info['name'],
                "allocation": round(allocation_percentage),
                "investmentAmount": round(total_amount * (allocation_percentage / 100)),
                "sector": stock_info['sector'],
                "performance": stock_info['performance'],
                "description": stock_info['description'],
            })
            
    # Sort recommendations by allocation percentage in descending order
    recommendations.sort(key=lambda x: x['allocation'], reverse=True)
    return recommendations


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate stock portfolio recommendations using MPT.")
    parser.add_argument("--amount", type=float, required=True, help="Total investment amount.")
    parser.add_argument("--risk", type=str, required=True, choices=['low', 'medium', 'high'], help="User's risk tolerance.")
    parser.add_argument("--tickers", type=str, help="Comma-separated list of stock tickers.")
    
    args = parser.parse_args()
    
    user_profile = {
        'investmentAmount': args.amount,
        'riskTolerance': args.risk
    }
    
    if args.tickers:
        user_profile['tickers'] = [t.strip() for t in args.tickers.split(',')]
        
    recommendations = get_recommendations(user_profile)
    print(json.dumps(recommendations, indent=2))