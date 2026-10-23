import React from 'react';
import { fetchBlogPosts } from '@/lib/strapi';
import Navbar from '../components/Navbar';
import BlogListClient, { BlogPostCard } from '../components/BlogListClient';

export default async function BlogListingPage() {
  const posts: BlogPostCard[] = await fetchBlogPosts();

  return (
    <div className="relative min-h-screen bg-[#131313] text-zinc-100 font-sans selection:bg-[#f5c563] selection:text-[#131313] overflow-x-hidden">
      <Navbar />
      {/* Top Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#f5c563]/10 blur-[160px] rounded-full" />

      {/* Header */}
      <section className="relative pt-28 pb-16 px-6 sm:px-10 lg:px-14 max-w-6xl mx-auto border-b border-white/10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#1a1a1a] shadow-xl">
            <span className="text-zinc-400 text-xs uppercase tracking-[0.25em] font-mono">
              Insights &amp; Playbooks
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            News &amp; <span className="text-[#f5c563]">Insights</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl leading-relaxed">
            Strategic commentary on inbound execution, modern search architecture, and pipeline velocity.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-20 px-6 sm:px-10 lg:px-14 max-w-6xl mx-auto">
        <BlogListClient posts={posts} />
      </section>
    </div>
  );
}