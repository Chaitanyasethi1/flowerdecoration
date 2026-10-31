"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { blogsData } from "@/data/blogs";
import { siteConfig } from "@/config/site";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const JournalSection: React.FC = () => {
  const instaImages = [
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-white via-pink-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-pink-600" />
              <span>Floral Inspiration & Guides</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              The Bloomora Journal
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Expert decoration tips, same-day checklists, and color palettes from our Delhi master florists
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-pink-600 hover:text-pink-700 self-start md:self-auto"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {blogsData.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-pink-100/90 hover:border-pink-300 shadow-xs hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-pink-50/50">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-xs text-pink-700 text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-2xs border border-pink-100">
                    {post.category}
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-pink-600 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 sm:pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Instagram Strip */}
        <div className="pt-6 sm:pt-8 border-t border-pink-100/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <InstagramIcon className="w-5 h-5 text-pink-600" />
              <h3 className="font-serif font-bold text-sm sm:text-lg text-stone-900">
                Follow <span className="text-pink-600">{siteConfig.instagramHandle}</span> on Instagram
              </h3>
            </div>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-stone-600 hover:text-pink-600 flex items-center gap-1"
            >
              <span>Join 25K+ Delhi NCR Followers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
            {instaImages.map((img, i) => (
              <a
                key={i}
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-28 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden bg-pink-50/50 shadow-2xs hover:shadow-md transition-all"
              >
                <Image
                  src={img}
                  alt={`Bloomora Instagram celebration shot ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
