export interface BlogPost {
  slug: string;
  title: string;
  readTime: string;
  category: string;
  publishedAt: string;
  author: string;
  summary: string;
  content: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'abm-to-shorten-long-b2b-sales-cycles',
    title: 'How To Use ABM To Shorten Long B2B Sales Cycles',
    readTime: '6 Minute Read',
    category: 'Account-Based Marketing',
    publishedAt: 'Oct 2026',
    author: 'Growth Strategy Team',
    summary:
      'Enterprise deal velocity stagnates when multiple buying committee members lack alignment. Learn how account-based marketing condenses multi-quarter negotiations.',
    content: [
      {
        heading: 'The Stagnant Enterprise Pipeline',
        paragraphs: [
          'B2B enterprise sales cycles frequently stretch beyond six to nine months not because prospects do not want the solution, but because buying committees are paralyzed by internal consensus.',
          'Traditional lead generation floods SDR pipelines with individual names rather than complete organizational accounts. ABM flips this logic by coordinating multi-threaded touchpoints across decision-makers simultaneously.',
        ],
      },
      {
        heading: 'Multi-Threaded Alignment',
        paragraphs: [
          'By orchestrating personalized content, targeted paid distribution, and direct sales outreach to key stakeholders in unison, you reduce friction, preempt objections, and dramatically compress deal velocity.',
          'When finance, operations, and executive sponsors receive tailored narratives addressing their specific risks before the pitch deck is delivered, closing friction disappears.',
        ],
      },
    ],
  },
  {
    slug: 'aio-vs-aeo-best-optimization-strategy',
    title: 'AIO vs AEO: Choosing the Best Optimization Strategy for...',
    readTime: '4 Minute Read',
    category: 'AI & Organic Search',
    publishedAt: 'Oct 2026',
    author: 'Search Architecture Team',
    summary:
      'As search algorithms transition toward AI answer engines, brands must evaluate Artificial Intelligence Optimization (AIO) versus Answer Engine Optimization (AEO).',
    content: [
      {
        heading: 'Beyond the Ten Blue Links',
        paragraphs: [
          'The modern search landscape is no longer just ten blue links. LLMs and conversational engines now synthesize direct answers before a user ever clicks a domain.',
          'Artificial Intelligence Optimization (AIO) focuses on training data visibility and embedding model citations, whereas Answer Engine Optimization (AEO) prioritizes direct structured responses for platforms like Perplexity, ChatGPT Search, and Google AI Overviews.',
        ],
      },
      {
        heading: 'Winning the Citation Layer',
        paragraphs: [
          'To build sustainable organic visibility, your content architecture must shift from traditional keyword volume to citation authority and authoritative answer modeling.',
        ],
      },
    ],
  },
  {
    slug: 'transition-lead-based-to-account-based',
    title: 'How to Transition from Lead Based Marketing to Account ...',
    readTime: '6 Minute Read',
    category: 'Revenue Operations',
    publishedAt: 'Sep 2026',
    author: 'Performance Lab',
    summary:
      'Shifting from high-volume MQL tracking to high-value Target Account lists requires organizational restructuring across both marketing workflows and sales compensations.',
    content: [
      {
        heading: 'Breaking Free From Vanity Volume',
        paragraphs: [
          'Most marketing teams are incentivized to produce cheap lead volume, leaving sales reps frustrated with unqualified contacts that never convert into pipeline.',
          'Transitioning to account-based marketing requires redefining success: vanity lead counts are replaced by account engagement depth, pipeline velocity, and Annual Contract Value (ACV).',
        ],
      },
      {
        heading: 'Building the Target Account List',
        paragraphs: [
          'The foundation starts with a unified Ideal Customer Profile (ICP) tiering exercise, cross-departmental SLA agreements, and account-specific activation campaigns.',
        ],
      },
    ],
  },
  {
    slug: 'abm-vs-traditional-demand-generation',
    title: "ABM vs Traditional Demand Generation: What's the Differ...",
    readTime: '5 Minute Read',
    category: 'Growth Architecture',
    publishedAt: 'Sep 2026',
    author: 'Inbound Strategy Group',
    summary:
      "Explore the critical distinctions between broad-reach inbound capture and precision-targeted account orchestration—and how high-growth teams blend both.",
    content: [
      {
        heading: 'Spear vs Net',
        paragraphs: [
          "Demand Generation is fishing with a net; Account-Based Marketing is fishing with a spear. While traditional demand generation builds broad category awareness, ABM directs every dollar strictly toward high-fit revenue accounts.",
          'High-performing organizations do not treat this as an either/or dilemma. Instead, they leverage broad demand generation to fuel market signals, and deploy ABM playbooks to close enterprise tier accounts.',
        ],
      },
      {
        heading: 'Unit Economics Comparison',
        paragraphs: [
          'Understanding the structural cost-per-acquisition (CAC) and customer lifetime value (LTV) differences allows leaders to allocate growth capital effectively.',
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}