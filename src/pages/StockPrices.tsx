
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { stockHistoricalData } from '../utils/stockHistoricalData';
import { ChartContainer } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, BarChart3, LineChart as LineChartIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Toggle } from "@/components/ui/toggle";

const StockPrices: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [viewMode, setViewMode] = useState<'charts' | 'table'>('charts');
  const [expandedStock, setExpandedStock] = useState<string | null>(null);
  
  // Filter stocks by selected sector
  const filteredStocks = selectedSector === "All" 
    ? stockHistoricalData 
    : stockHistoricalData.filter(stock => stock.sector === selectedSector);
    
  // Get unique sectors for the dropdown
  const sectors = ["All", ...Array.from(new Set(stockHistoricalData.map(stock => stock.sector)))];
  
  // Get years for the table
  const years = ["2020", "2021", "2022", "2023", "2024"];

  const toggleView = () => {
    setViewMode(viewMode === 'charts' ? 'table' : 'charts');
  };

  const toggleExpandStock = (ticker: string) => {
    setExpandedStock(expandedStock === ticker ? null : ticker);
  };
  
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
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Filter by Sector</span>
            <div className="flex items-center gap-4">
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
              <Button 
                variant="outline" 
                onClick={toggleView} 
                className="flex items-center gap-2"
              >
                {viewMode === 'charts' ? (
                  <>
                    <BarChart3 className="h-4 w-4" />
                    <span>View Table</span>
                  </>
                ) : (
                  <>
                    <LineChartIcon className="h-4 w-4" />
                    <span>View Charts</span>
                  </>
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {viewMode === 'charts' ? (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredStocks.slice(0, 4).map(stock => (
            <Card key={stock.ticker} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between">
                  <div>
                    <span className="text-xl font-bold">{stock.ticker}</span>
                    <span className="ml-2 text-sm text-gray-500">{stock.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {stock.performance > 0 ? (
                      <ArrowUp className="text-finance-green mr-1 h-5 w-5" />
                    ) : (
                      <ArrowDown className="text-finance-red mr-1 h-5 w-5" />
                    )}
                    <span className={`font-medium ${stock.performance > 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                      {stock.performance}%
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleExpandStock(stock.ticker)}
                      className="ml-2 flex items-center gap-1"
                    >
                      <Search className="h-4 w-4" />
                      Explore
                    </Button>
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
                
                {expandedStock === stock.ticker && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">Historical Data for {stock.name}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead className="text-right">Price (₹)</TableHead>
                          <TableHead className="text-right">% Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stock.historicalPrices.map((item, index) => {
                          const prevPrice = index > 0 ? stock.historicalPrices[index - 1].price : item.price;
                          const percentChange = ((item.price - prevPrice) / prevPrice) * 100;
                          return (
                            <TableRow key={item.year}>
                              <TableCell>{item.year}</TableCell>
                              <TableCell className="text-right">₹{item.price.toLocaleString()}</TableCell>
                              <TableCell className={`text-right ${percentChange > 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                {index > 0 ? `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%` : '-'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden mb-8">
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
      )}

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            {viewMode === 'table' ? 'Stock Price Charts' : 'Full Stock Data Table'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredStocks.slice(0, 4).map(stock => (
                <Card key={stock.ticker} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between">
                      <div>
                        <span className="text-xl font-bold">{stock.ticker}</span>
                        <span className="ml-2 text-sm text-gray-500">{stock.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {stock.performance > 0 ? (
                          <ArrowUp className="text-finance-green mr-1 h-5 w-5" />
                        ) : (
                          <ArrowDown className="text-finance-red mr-1 h-5 w-5" />
                        )}
                        <span className={`font-medium ${stock.performance > 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                          {stock.performance}%
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toggleExpandStock(stock.ticker)}
                          className="ml-2 flex items-center gap-1"
                        >
                          <Search className="h-4 w-4" />
                          Explore
                        </Button>
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
                    
                    {expandedStock === stock.ticker && (
                      <div className="mt-6 border-t pt-4">
                        <h3 className="text-lg font-semibold mb-4">Historical Data for {stock.name}</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Year</TableHead>
                              <TableHead className="text-right">Price (₹)</TableHead>
                              <TableHead className="text-right">% Change</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {stock.historicalPrices.map((item, index) => {
                              const prevPrice = index > 0 ? stock.historicalPrices[index - 1].price : item.price;
                              const percentChange = ((item.price - prevPrice) / prevPrice) * 100;
                              return (
                                <TableRow key={item.year}>
                                  <TableCell>{item.year}</TableCell>
                                  <TableCell className="text-right">₹{item.price.toLocaleString()}</TableCell>
                                  <TableCell className={`text-right ${percentChange > 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                    {index > 0 ? `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%` : '-'}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StockPrices;
