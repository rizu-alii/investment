import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { HomeFooter } from "@/features/home/components/HomeFooter";

function BlogDetailPage() {
  const router = useRouter();
  const navigate = useNavigate();
  const blog = router.state.location.state?.blog;

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl mb-4">No blog data found.</div>
        <button className="btn" onClick={() => navigate({ to: "/blog" })}>Back to Blog</button>
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

export const Route = createFileRoute("/blog-detail")({
  component: BlogDetailPage,
}); 