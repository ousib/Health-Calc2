import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "../data";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://healthcalculatorsonline.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 4);

  const recentPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 5);

  return (
    <BlogPostClient
      post={post}
      relatedPosts={relatedPosts}
      recentPosts={recentPosts}
    />
  );
}