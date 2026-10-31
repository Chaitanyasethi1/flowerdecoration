import React from "react";
import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 bg-cream-50/40 min-h-[75vh] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-md space-y-5">
        <div className="w-24 h-24 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-5xl shadow-sm">
          🥀
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
            404 Error
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-stone-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            The page you are looking for might have been moved or bloomed elsewhere! Browse our 15 occasions or return home.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/decorations/all"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Browse All Decorations</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
