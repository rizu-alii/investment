import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "@/features/blog/BlogPage";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
}); 