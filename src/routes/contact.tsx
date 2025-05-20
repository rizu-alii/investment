import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/features/contact/ContactPage";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
}); 