import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, User } from 'lucide-react';
import { fetchBlogPosts, fetchBlogPostBySlug } from '@/lib/strapi';
import Navbar from '@/app/components/Navbar';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render pages statically at build time using Strapi data
export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// Dynamic SEO metadata pulled directly from Strapi
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${post.title} | Agency Insights`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch current article and full list concurrently for deal velocity & bottom next link
  const [post, allPosts] = await Promise.all([
    fetchBlogPostBySlug(slug),
    fetchBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  // Calculate next post in cycle
  const currentIndex = allPosts.findIndex((p: { slug: string }) => p.slug === slug);
  const nextPost =
    allPosts.length > 1
      ? allPosts[(currentIndex + 1) % allPosts.length]
      : null;

  return (
    <article className="relative min-h-screen bg-[#131313] text-zinc-100 font-sans selection:bg-[#f5c563] selection:text-[#131313] overflow-x-hidden">
      <Navbar />
      {/* Ambient Top Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[#f5c563]/10 blur-[180px] rounded-full" />

      {/* Top Navigation Bar */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-28 pb-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-[#f5c563] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Insights</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 sm:px-8 pb-12 border-b border-white/10 space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
          <span className="text-[#f5c563] uppercase tracking-wider px-3 py-1 rounded-full border border-[#f5c563]/30 bg-[#1c1c1c]">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            {post.readTime}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            {post.publishedAt}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-zinc-500" />
            {post.author}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12]">
          {post.title}
        </h1>

        <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed border-l-2 border-[#f5c563] pl-6 py-1">
          {post.summary}
        </p>
      </header>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 space-y-12">
        {post.content && post.content.map((section: any, idx: number) => (
          <section key={idx} className="space-y-6">
            {section.heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {section.heading}
              </h2>
            )}
            {Array.isArray(section.paragraphs) ? (
              section.paragraphs.map((p: string, pIdx: number) => (
                <p
                  key={pIdx}
                  className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed whitespace-pre-line"
                >
                  {p}
                </p>
              ))
            ) : (
              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                {section.paragraphs}
              </p>
            )}
          </section>
        ))}
      </div>

      {/* Next Article Card Strip */}
      {nextPost && (
        <footer className="max-w-4xl mx-auto px-6 sm:px-8 py-20 border-t border-white/10">
          <div className="space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#f5c563]">
              Next Read
            </span>

            <Link href={`/blogs/${nextPost.slug}`} className="block group">
              <div className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#171717] hover:border-[#f5c563]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                    {nextPost.category} • {nextPost.readTime}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#f5c563] transition-colors leading-snug">
                    {nextPost.title}
                  </h3>
                </div>

                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 group-hover:border-[#f5c563] group-hover:bg-[#f5c563] group-hover:text-[#131313] transition-all">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </div>
        </footer>
      )}
    </article>
  );
}