import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import StockCard from "./StockCard";
import { StockRecommendation } from "../utils/stockRecommendations";
import { useMemo } from "react";

interface ResultsPageProps {
  recommendations: StockRecommendation[];
  investmentAmount: number;
}

export const ResultsPage = ({ recommendations, investmentAmount }: ResultsPageProps) => {
  const totalAllocatedAmount = useMemo(() => {
    if (!Array.isArray(recommendations)) {
      return 0;
    }
    return recommendations.reduce(
      (sum, stock) => sum + (investmentAmount * stock.allocation / 100),
      0
    );
  }, [recommendations, investmentAmount]);

  const totalAllocationPercent = useMemo(() => {
    if (!Array.isArray(recommendations)) {
      return 0;
    }
    return recommendations.reduce((sum, stock) => sum + stock.allocation, 0);
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
              <TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           {recommendations.map((rec, idx) => (
    <TableRow key={rec.ticker || idx}>
      <TableCell className="font-medium">
        {rec.ticker ? rec.ticker.toUpperCase() : "N/A"}
      </TableCell>
      <TableCell>{rec.allocation ?? 0}%</TableCell>
      <TableCell>
        ₹{((investmentAmount * (rec.allocation ?? 0)) / 100).toLocaleString("en-IN")}
      </TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            rec.risk === "low"
              ? "bg-green-100 text-green-800"
              : rec.risk === "medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {(rec.risk ? rec.risk.toUpperCase() : "UNKNOWN")} RISK
        </span>
      </TableCell>
    </TableRow>
  ))}

  {/* ✅ Summary Row */}
  <TableRow className="font-bold bg-gray-50">
    <TableCell>Total</TableCell>
    <TableCell>{totalAllocationPercent}%</TableCell>
    <TableCell>
      ₹{totalAllocatedAmount.toLocaleString("en-IN")}
    </TableCell>
    <TableCell>-</TableCell>
  </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* ⚠ Warning if allocation ≠ 100% */}
      {totalAllocationPercent !== 100 && (
        <p
          className={`text-sm font-medium ${
            totalAllocationPercent > 100 ? "text-red-600" : "text-yellow-600"
          }`}
        >
          ⚠ Warning: Your total allocation is {totalAllocationPercent}%.
          {totalAllocationPercent > 100
            ? " This exceeds 100%, please adjust allocations."
            : " This is less than 100%, you may want to fully allocate your investment."}
        </p>
      )}

      {/* Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((stock, idx) => (
          <StockCard
            key={stock.ticker || idx}
            stock={stock}
            investmentAmount={investmentAmount}
          />
        ))}
      </div>
    </div>
  );
};
export default ResultsPage;
