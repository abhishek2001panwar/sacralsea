'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
};

export type BlogPostCard = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  summary: string;
};

export default function BlogListClient({ posts }: { posts: BlogPostCard[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {posts.map((post) => (
        <Link key={post.slug} href={`/blogs/${post.slug}`}>
          <motion.article
            variants={cardVariant}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative h-full rounded-2xl border border-white/10 bg-[#171717] hover:border-[#f5c563]/50 p-8 sm:p-10 flex flex-col justify-between transition-colors shadow-2xl min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-6">
                <span className="text-[#f5c563] uppercase tracking-wider">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#f5c563] transition-colors leading-snug mb-4">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                {post.summary}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                Read Article
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#f5c563] group-hover:bg-[#f5c563] transition-all">
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#131313] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          </motion.article>
        </Link>
      ))}
    </motion.div>
  );
}