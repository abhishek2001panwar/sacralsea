
const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
).replace(/\/+$/, "");

export async function fetchBlogPosts() {
  const url = `${STRAPI_URL}/api/posts?populate=*`;

  console.log("Strapi URL being called:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  const body = await res.text();

  console.log("Strapi HTTP status:", res.status);
  console.log("Strapi response body:", body);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch posts from Strapi: HTTP ${res.status} ${res.statusText}`
    );
  }

  const json = JSON.parse(body);

  return json.data.map((item: any) => ({
    id: item.id,
    documentId: item.documentId,
    slug: item.slug,
    title: item.title,
    readTime: item.readTime,
    category: item.category,
    publishedAt: item.publishedAt,
    author: item.author,
    summary: item.summary,
    content: (item.content || []).map((section: any) => ({
      heading: section.heading,
      paragraphs:
        typeof section.paragraphs === "string"
          ? section.paragraphs.split("\n\n")
          : section.paragraphs,
    })),
  }));
}


export async function fetchBlogPostBySlug(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${slug}`);
  }

  const json = await res.json();
  const item = json.data?.[0];
  if (!item) return null;

  return {
    id: item.id,
    documentId: item.documentId,
    slug: item.slug,
    title: item.title,
    readTime: item.readTime,
    category: item.category,
    publishedAt: item.publishedAt,
    author: item.author,
    summary: item.summary,
    content: (item.content || []).map((section: any) => ({
      heading: section.heading,
      paragraphs: typeof section.paragraphs === 'string'
        ? section.paragraphs.split('\n\n')
        : section.paragraphs,
    })),
  };
}