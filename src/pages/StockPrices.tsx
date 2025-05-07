
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { stockHistoricalData } from '../utils/stockHistoricalData';
import { ChartContainer } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StockPrices: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>("All");
  
  // Filter stocks by selected sector
  const filteredStocks = selectedSector === "All" 
    ? stockHistoricalData 
    : stockHistoricalData.filter(stock => stock.sector === selectedSector);
    
  // Get unique sectors for the dropdown
  const sectors = ["All", ...Array.from(new Set(stockHistoricalData.map(stock => stock.sector)))];
  
  // Get years for the table
  const years = ["2020", "2021", "2022", "2023", "2024"];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Indian Stock Prices (5 Year History)</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/questionnaire">
              Get Recommendations
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/signin">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Filter by Sector</span>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {filteredStocks.slice(0, 4).map(stock => (
          <Card key={stock.ticker} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <div>
                  <span className="text-xl font-bold">{stock.ticker}</span>
                  <span className="ml-2 text-sm text-gray-500">{stock.name}</span>
                </div>
                <div className="flex items-center">
                  {stock.performance > 0 ? (
                    <ArrowUp className="text-finance-green mr-1 h-5 w-5" />
                  ) : (
                    <ArrowDown className="text-finance-red mr-1 h-5 w-5" />
                  )}
                  <span className={`font-medium ${stock.performance > 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                    {stock.performance}%
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stock.historicalPrices}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke={stock.performance > 0 ? "#16a34a" : "#dc2626"} 
                      name="Price (₹)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Year-wise Stock Performance Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock</TableHead>
                <TableHead>Sector</TableHead>
                {years.map(year => (
                  <TableHead key={year} className="text-right">{year}</TableHead>
                ))}
                <TableHead className="text-right">5Y Return</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map(stock => (
                <TableRow key={stock.ticker}>
                  <TableCell className="font-medium">
                    {stock.ticker}
                    <div className="text-xs text-gray-500">{stock.name}</div>
                  </TableCell>
                  <TableCell>{stock.sector}</TableCell>
                  {stock.historicalPrices.map(item => (
                    <TableCell key={item.year} className="text-right">
                      ₹{item.price.toLocaleString()}
                    </TableCell>
                  ))}
                  <TableCell className={`text-right font-medium ${stock.performance > 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                    {stock.performance > 0 ? '+' : ''}{stock.performance}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockPrices;
