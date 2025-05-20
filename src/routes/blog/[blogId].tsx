import { createFileRoute, useParams } from "@tanstack/react-router";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { HomeFooter } from "@/features/home/components/HomeFooter";

// Same mock data as the blog list
const blogPosts = [
  {
    id: 1,
    title: "Understanding Investment Risk",
    description: "Learn about different types of investment risks and how to manage them effectively.",
    image: "/images/pexels-fauxels-3184416.jpg",
  },
  {
    id: 2,
    title: "The Power of Compound Interest",
    description: "Discover how compound interest can significantly impact your long-term investment returns.",
    image: "/images/pexels-leeloothefirst-7887814.jpg",
  },
  {
    id: 3,
    title: "Investment Strategies for Beginners",
    description: "A comprehensive guide to getting started with investing, perfect for beginners.",
    image: "/images/Untitled (9).png",
  },
];

function BlogDetail() {
  const { blogId } = useParams();
  const blog = blogPosts.find((b) => b.id === Number(blogId));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-xl">Blog not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <img src={blog.image} alt={blog.title} className="w-full rounded-lg mb-8 object-cover aspect-video" />
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{blog.description}</p>
          <div className="prose prose-lg max-w-none">
            <p>This is a sample blog detail page. You can add more content here as needed.</p>
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}

export const Route = createFileRoute("/blog/[blogId]")({
  component: BlogDetail,
}); 