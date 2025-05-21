import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const demoInvestments = [
  {
    id: 1,
    category: "Equity | Consumption",
    name: "Prudential FMCG Fund - Growth",
    fundSize: "1,189.60cr",
    return: "+3.29%",
    risk: "High",
    status: "Active",
    returnColor: "text-green-600",
    type: "Equity",
  },
  {
    id: 2,
    category: "Equity | Consumption",
    name: "Index Sensex Direct Plan-Growth",
    fundSize: "2,555.96cr",
    return: "+23.37%",
    risk: "High",
    status: "Active",
    returnColor: "text-green-600",
    type: "Equity",
  },
  {
    id: 3,
    category: "Equity | Consumption",
    name: "Index Sensex Direct",
    fundSize: "94.29cr",
    return: "+18.70%",
    risk: "Very High",
    status: "Inactive",
    returnColor: "text-green-600",
    type: "Equity",
  },
  {
    id: 4,
    category: "Debt | Consumption",
    name: "Market Fund Direct-Growth",
    fundSize: "1,400.00cr",
    return: "+7.10%",
    risk: "Low",
    status: "Active",
    returnColor: "text-green-600",
    type: "Debt",
  },
  {
    id: 5,
    category: "Debt | Consumption",
    name: "Liquid Fund Direct-Growth",
    fundSize: "2,000.00cr",
    return: "+5.50%",
    risk: "Moderate",
    status: "Inactive",
    returnColor: "text-green-600",
    type: "Debt",
  },
];

type Investment = typeof demoInvestments[number];

export function InvestmentsVisualization() {
  const [open, setOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");

  const handleInvestClick = (investment: Investment) => {
    setSelectedInvestment(investment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInvestment(null);
    setAmount("");
    setMonths("");
  };

  const handleConfirm = () => {
    // You can handle the investment logic here
    handleClose();
  };

  return (
    <div className="space-y-4">
      {demoInvestments.map((inv) => (
        <Card key={inv.id} className="flex flex-col md:flex-row items-center justify-between p-4">
          <CardContent className="flex-1 flex flex-col md:flex-row md:items-center md:space-x-8 p-0">
            <div className="flex-1">
              <div className="text-xs font-medium text-green-600 mb-1">{inv.category}</div>
              <div className="font-semibold text-lg mb-1">{inv.name}</div>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <span>Fund Size <span className="font-medium text-black dark:text-white">{inv.fundSize}</span></span>
                <span>Return(P.A.) <span className={`font-medium ${inv.returnColor}`}>{inv.return}</span></span>
                <span>Risk <span className="font-medium text-black dark:text-white">{inv.risk}</span></span>
                <span>Status <span className={`font-medium ${inv.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{inv.status}</span></span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
              <Button variant="default" onClick={() => handleInvestClick(inv)}>Invest Now</Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invest in {selectedInvestment?.name}</DialogTitle>
            <DialogDescription>
              Please enter the amount you want to invest and for how many months.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Amount</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Months</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter number of months"
                value={months}
                onChange={e => setMonths(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleConfirm} disabled={!amount || !months}>
              Confirm Investment
            </Button>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 