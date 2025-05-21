import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvestmentDetail } from "./InvestmentDetail";

const investedDemoData = [
  {
    id: 1,
    name: "Prudential FMCG Fund - Growth",
    type: "Equity",
    status: "Active",
    totalProfit: "+12,000",
    currentProfit: "+3,000",
    introduction: "A leading FMCG fund with a strong track record.",
    projectedProfitability: "+3.29%",
    dates: "01/01/2023 - 01/01/2024",
    history: [
      { date: '01/01/2023', type: 'Deposit', amount: '+10,000' },
      { date: '06/01/2023', type: 'Withdrawal', amount: '-2,000' },
      { date: '12/01/2023', type: 'Deposit', amount: '+5,000' },
    ],
    technicalDetails: "Managed by ABC Asset Management."
  },
  {
    id: 2,
    name: "Index Sensex Direct Plan-Growth",
    type: "Equity",
    status: "Active",
    totalProfit: "+25,000",
    currentProfit: "+7,000",
    introduction: "Direct exposure to Sensex index growth.",
    projectedProfitability: "+23.37%",
    dates: "01/02/2023 - 01/02/2024",
    history: [
      { date: '01/02/2023', type: 'Deposit', amount: '+20,000' },
      { date: '07/02/2023', type: 'Deposit', amount: '+5,000' },
    ],
    technicalDetails: "Low expense ratio, passive management."
  },
  {
    id: 3,
    name: "Index Sensex Direct",
    type: "Equity",
    status: "Inactive",
    totalProfit: "+8,000",
    currentProfit: "+1,200",
    introduction: "Sensex direct investment, high volatility.",
    projectedProfitability: "+18.70%",
    dates: "01/03/2023 - 01/03/2024",
    history: [
      { date: '01/03/2023', type: 'Deposit', amount: '+8,000' },
    ],
    technicalDetails: "No lock-in period."
  },
  {
    id: 4,
    name: "Market Fund Direct-Growth",
    type: "Debt",
    status: "Active",
    totalProfit: "+10,500",
    currentProfit: "+2,100",
    introduction: "Stable returns with low risk.",
    projectedProfitability: "+7.10%",
    dates: "01/04/2023 - 01/04/2024",
    history: [
      { date: '01/04/2023', type: 'Deposit', amount: '+10,500' },
    ],
    technicalDetails: "Ideal for conservative investors."
  },
  {
    id: 5,
    name: "Liquid Fund Direct-Growth",
    type: "Debt",
    status: "Inactive",
    totalProfit: "+6,000",
    currentProfit: "+900",
    introduction: "High liquidity, moderate returns.",
    projectedProfitability: "+5.50%",
    dates: "01/05/2023 - 01/05/2024",
    history: [
      { date: '01/05/2023', type: 'Deposit', amount: '+6,000' },
    ],
    technicalDetails: "Withdraw anytime."
  },
];

export function InvestedCards() {
  const [selected, setSelected] = useState<null | typeof investedDemoData[0]>(null);

  if (selected) {
    return <InvestmentDetail investment={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-4">
      {investedDemoData.map((inv) => (
        <Card key={inv.id} className="flex flex-col md:flex-row items-center justify-between p-4">
          <CardContent className="flex-1 flex flex-col md:flex-row md:items-center md:space-x-8 p-0">
            <div className="flex-1">
              <div className="font-semibold text-lg mb-1">{inv.name}</div>
              <div className="flex space-x-6 text-sm text-muted-foreground mb-1">
                <span>Type <span className="font-medium text-black dark:text-white">{inv.type}</span></span>
                <span>Status <span className={`font-medium ${inv.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{inv.status}</span></span>
                <span>Total Profit <span className="font-medium text-green-600">{inv.totalProfit}</span></span>
                <span>Current Profit <span className="font-medium text-blue-600">{inv.currentProfit}</span></span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
              <Button variant="default" onClick={() => setSelected(inv)}>Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 