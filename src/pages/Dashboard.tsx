
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PieChart, TrendingUp, IndianRupee, BarChart2, LineChart } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <header className="mb-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-finance-blue">Spread Wealth</h1>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="bg-white hover:bg-gray-50">
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild className="bg-finance-blue hover:bg-blue-800">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white hover:bg-gray-50 border-finance-blue text-finance-blue">
              <Link to="/stock-prices" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>Explore</span>
              </Link>
            </Button>
          </div>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4 text-center">
          Your personalized path to smarter investing in Indian markets
        </p>
      </header>
      
      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Start Your Investment Journey Today</h2>
            <p className="text-lg text-gray-700">
              Spread Wealth helps beginners make informed investment decisions by creating 
              personalized Indian stock recommendations based on your risk tolerance, investment goals, and budget.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Investment Dashboard" 
              className="w-full h-auto object-cover transition-all duration-500 hover:brightness-110"
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8">How Spread Wealth Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-finance-blue" />
              </div>
              <h3 className="text-xl font-semibold">Tell Us Your Goals</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Answer a few questions about your investment amount in ₹, risk tolerance, and time horizon.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <PieChart className="h-6 w-6 text-finance-blue" />
              </div>
              <h3 className="text-xl font-semibold">Smart Analysis</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our algorithm analyzes 5-year historical data of Indian stocks to find the best matches for your profile.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-finance-blue" />
              </div>
              <h3 className="text-xl font-semibold">Custom Portfolio</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Receive a personalized allocation strategy optimized for your unique investment needs in the Indian market.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-finance-blue" />
              </div>
              <h3 className="text-xl font-semibold">Start Investing</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Begin your investment journey with confidence, backed by data-driven recommendations for Indian equities.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Why Choose Spread Wealth?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md transform transition-transform duration-300 hover:scale-110">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Beginner Friendly" className="w-16 h-16 rounded-full object-cover transition-all duration-300 hover:brightness-110" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Beginner Friendly</h3>
              <p className="text-gray-600">No prior investment knowledge required. We guide you through the Indian stock market step by step.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md transform transition-transform duration-300 hover:scale-110">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Data Driven" className="w-16 h-16 rounded-full object-cover transition-all duration-300 hover:brightness-110" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Data Driven</h3>
              <p className="text-gray-600">Our recommendations are based on historical performance of Indian equities and market analysis.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md transform transition-transform duration-300 hover:scale-110">
                <img src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Personalized" className="w-16 h-16 rounded-full object-cover transition-all duration-300 hover:brightness-110" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized</h3>
              <p className="text-gray-600">Custom recommendations tailored to your unique financial situation and goals for the Indian market.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Spread Wealth. All data is for demonstration purposes only.</p>
        <p className="mt-1">Not financial advice. Always do your own research before investing in Indian markets.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
