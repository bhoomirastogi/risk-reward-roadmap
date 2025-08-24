import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Separator } from "./ui/separator";
import StockCard from "./StockCard";
import { StockRecommendation } from "../utils/stockRecommendations";
import { useMemo } from "react";

interface ResultsPageProps {
  recommendations: StockRecommendation[];
  investmentAmount: number;
}

const ResultsPage = ({ recommendations, investmentAmount }: ResultsPageProps) => {
  const totalAllocatedAmount = useMemo(() => {
    if (!Array.isArray(recommendations)) {
      return 0;
    }
    return recommendations.reduce(
      (sum, stock) => sum + stock.investmentAmount,
      0
    );
  }, [recommendations]);

  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold mb-4">No Recommendations Found</h2>
        <p>Please adjust your criteria and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-xl font-bold">Your Recommended Portfolio</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead>Allocation</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recommendations.map((rec) => (
              <TableRow key={rec.ticker}>
                <TableCell className="font-medium">{rec.ticker}</TableCell>
                <TableCell>{rec.allocation}%</TableCell>
                <TableCell>₹{rec.investmentAmount.toLocaleString('en-IN')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <StockCard key={rec.ticker} stock={rec} investmentAmount={investmentAmount} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;