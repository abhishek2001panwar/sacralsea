
import { BLOG_POSTS } from "./lib/blog-data";

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  "https://sacral-sea-backend-1.onrender.com"
).replace(/\/+$/, "");

const API_TOKEN = "f3932b3eefdbb11141cb9307fc33f907a726e02da10edb20715ea0c549799a2590929c97d5946fe6500fae3c4098016ee3dca271ba7b3575125dba65fe4c479ce5ef0036db3e93a70c49f12649b1f650ae566d22fc110093c439f41eaaafdcc371addb425a76ab05439d6e454635441716450df258c9db9d1218d70165615909";

async function request(
  path: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const text = await response.text();

  let result: any;

  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `Strapi returned non-JSON (${response.status}): ${text}`
    );
  }


if (!response.ok) {
  console.error(
    "Strapi error details:",
    JSON.stringify(result, null, 2)
  );

  throw new Error(
    `Strapi ${response.status}: ${
      result.error?.message || text
    }`
  );
}


  return result;
}

async function seedBlogs() {
  if (!API_TOKEN) {
    throw new Error(
      "Missing STRAPI_API_TOKEN environment variable"
    );
  }

  for (const post of BLOG_POSTS) {
    const params = new URLSearchParams({
      "filters[slug][$eq]": post.slug,
    });

    // Avoid creating duplicate entries when the script is rerun.
    const existing = await request(
      `/api/posts?${params.toString()}`
    );

    if (existing.data?.length) {
      console.log(`Skipping existing post: ${post.slug}`);
      continue;
    }

  
const payload = {
  slug: post.slug,
  title: post.title,
  readTime: post.readTime,
  category: post.category,
  author: post.author,
  summary: post.summary,
  content: post.content.map((section) => ({
    heading: section.heading,
    paragraphs: section.paragraphs.join("\n\n"),
  })),
};

    // REST API creates and publishes by default in Strapi 5.
    const created = await request("/api/posts", {
      method: "POST",
      body: JSON.stringify({ data: payload }),
    });

    console.log(
      `Created: ${created.data?.title || post.title}`,
      created.data?.documentId || ""
    );
  }

  console.log("Blog seeding completed.");
}

seedBlogs().catch((error) => {
  console.error("Blog seeding failed:", error.message);
  process.exitCode = 1;
});
