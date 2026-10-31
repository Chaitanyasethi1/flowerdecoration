import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Sparkles } from "lucide-react";
import { blogsData } from "@/data/blogs";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogsData.find((b) => b.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Bloomora Decor`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogsData.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = blogsData.filter((b) => b.id !== post.id).slice(0, 2);

  return (
    <div className="py-12 bg-cream-50/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
            <span className="flex items-center gap-1.5 font-medium text-stone-700">
              <User className="w-4 h-4 text-rose-500" />
              <span>{post.author}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-stone-400" />
              <span>{post.date}</span>
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Feature Image */}
        <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-lg">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" />
        </div>

        {/* Content Body */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xs space-y-6 text-stone-700 leading-relaxed text-sm sm:text-base">
          <p className="font-serif text-lg sm:text-xl font-medium text-stone-900 italic border-l-4 border-rose-500 pl-4 py-1">
            {post.excerpt}
          </p>

          <div className="whitespace-pre-line space-y-4">
            {post.content}
          </div>

          <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-400">
              Published by Bloomora Decor Editorial Team · Ghazipur Wholesale Procurement Hub
            </span>
            <Link
              href="/decorations/all"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
            >
              <span>Explore Decorations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-8 border-t border-rose-100 space-y-4">
          <h3 className="font-serif font-bold text-xl text-stone-900">
            More from the Journal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all flex gap-3 items-center group"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-rose-600 line-clamp-2">
                    {p.title}
                  </h4>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    {p.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
