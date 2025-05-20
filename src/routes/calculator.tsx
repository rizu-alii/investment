import { createFileRoute } from "@tanstack/react-router";
import CalculatorSinglePage from "@/features/home/CalculatorSinglePage";

export const Route = createFileRoute("/calculator")({
  component: CalculatorSinglePage,
}); 