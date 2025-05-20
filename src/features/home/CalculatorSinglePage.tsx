import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addMonths, format } from "date-fns";

const RATES = {
  LOW_RISK: 0.06, // 6% annual
  HIGH_RISK: 0.15, // 15% annual
};

export default function CalculatorSinglePage() {
  const [amount, setAmount] = useState(1000);
  const [risk, setRisk] = useState("LOW_RISK");
  const [start, setStart] = useState(format(new Date(), "yyyy-MM-dd"));
  const [end, setEnd] = useState(format(addMonths(new Date(), 12), "yyyy-MM-dd"));
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    const principal = Number(amount);
    const rate = RATES[risk as keyof typeof RATES];
    const months = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    const years = months / 12;
    const estimated = principal * Math.pow(1 + rate, years);
    setResult(Number(estimated.toFixed(2)));
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-12">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Investment Return Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min={100}
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="risk">Risk Type</Label>
            <Select value={risk} onValueChange={setRisk}>
              <SelectTrigger id="risk" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW_RISK">Low Risk (6%/year)</SelectItem>
                <SelectItem value="HIGH_RISK">High Risk (15%/year)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="start">Start Date</Label>
              <Input
                id="start"
                type="date"
                value={start}
                onChange={e => setStart(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="end">End Date</Label>
              <Input
                id="end"
                type="date"
                value={end}
                min={start}
                onChange={e => setEnd(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <Button className="w-full" onClick={calculate}>
            Calculate
          </Button>
          {result !== null && (
            <div className="text-center mt-4">
              <div className="text-lg font-semibold">Estimated Return:</div>
              <div className="text-2xl font-bold text-primary mt-1">${result}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 