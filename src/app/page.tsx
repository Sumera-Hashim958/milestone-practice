import Image from "next/image";
import { client } from "@/sanity/lib/client";
import BlogCard from "./components/BlogCard";

interface Post {
  image: string;
  blog_title: string;
  summary: string;
  slug: string;
}

export default async function Home() {
  const query = `*[_type=='blog'] | order(_createdAt desc){
  summary,blog_title,image,
    "slug":slug.current
}`;
  const posts: Post[] = await client.fetch(query);
  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col pl-11 bg-black">
      <h1 className="text-2xl font-bold uppercase my-12 text-center text-white">Most Recent Blog</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
        {posts.map((post: Post) => (
          <BlogCard post={post} key={post.slug}/>
        ))}
      </section>
    </main>
  );
}
