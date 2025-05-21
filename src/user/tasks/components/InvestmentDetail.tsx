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

export function InvestmentDetail({ investment, onBack }: { investment: any, onBack: () => void }) {
  const [openDialog, setOpenDialog] = useState<null | "deposit" | "withdraw">(null);
  const [amount, setAmount] = useState("");

  if (!investment) return null;

  const handleOpen = (type: "deposit" | "withdraw") => {
    setAmount("");
    setOpenDialog(type);
  };

  const handleConfirm = () => {
    // Handle deposit/withdraw logic here
    setOpenDialog(null);
    setAmount("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-blue-600 hover:underline">&larr; Back to Investments</button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleOpen("withdraw")}>Withdraw</Button>
          <Button variant="default" onClick={() => handleOpen("deposit")}>Deposit</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">{investment.name}</h2>
          <p className="mb-4 text-muted-foreground">Institutional Introduction: {investment.introduction || "This is a brief presentation of the selected investment with additional context."}</p>
          <div className="mb-4">
            <span className="font-semibold">Type:</span> {investment.type}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Projected Profitability:</span> {investment.projectedProfitability || investment.totalProfit}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Status:</span> <span className={investment.status === 'Active' ? 'text-green-600' : 'text-red-600'}>{investment.status}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Important Dates:</span> {investment.dates || '01/01/2023 - 01/01/2024'}
          </div>
          <div className="mb-4">
            <span className="font-semibold">History of Deposits/Withdrawals:</span>
            <table className="min-w-full mt-2 border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-3 py-2 text-left font-semibold">Date</th>
                  <th className="px-3 py-2 text-left font-semibold">Type</th>
                  <th className="px-3 py-2 text-left font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(investment.history || [
                  { date: '01/01/2023', type: 'Deposit', amount: '+10,000' },
                  { date: '06/01/2023', type: 'Withdrawal', amount: '-2,000' },
                  { date: '12/01/2023', type: 'Deposit', amount: '+5,000' },
                ]).map((item: any, idx: number) => (
                  <tr key={idx} className="border-t">
                    <td className="px-3 py-2">{item.date}</td>
                    <td className="px-3 py-2">{item.type}</td>
                    <td className="px-3 py-2">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Other Technical Details:</span> {investment.technicalDetails || 'N/A'}
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!openDialog} onOpenChange={val => !val && setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{openDialog === "deposit" ? "Deposit Amount" : "Withdraw Amount"}</DialogTitle>
            <DialogDescription>
              {openDialog === "deposit"
                ? "Enter the amount you want to deposit."
                : "Enter the amount you want to withdraw."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleConfirm} disabled={!amount}>
              Confirm
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