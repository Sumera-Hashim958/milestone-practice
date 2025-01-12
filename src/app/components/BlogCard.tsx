import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image"; // Ensure this is properly set up

interface Post {
  image: string;
  blog_title: string;
  summary: string;
  slug: string;
}

function urlForImage(source: string) {
  return urlFor(source).url();
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <section className="flex flex-col justify-between h-[450px] rounded-sm bg-white/90 bg-black border-2 border-dashed border-black ">
      {/* Image section */}
      <div className="relative max-h-72 flex-1">
        <Image
          src={urlForImage(post.image)}
          alt={post.blog_title || "Blog Image"}
          fill
          className="object-cover rounded-t"
        />
      </div>

      {/* Title and Summary */}
      <div className="flex flex-col justify-between gap-y-4 p-4">
        <h2 className="text-lg font-semibold line-clamp-2 text-black dark:text-white leading-3">
          {post.blog_title}
        </h2>
        <p className="text-black dark:text-white line-clamp-3">
          {post.summary}
        </p>

        {/* Read More dynamic link */}
        <Link
          href={`/blog/${post.slug}`}
          className="block px-4 py-1 text-center bg-yellow-300 rounded text-black"
        >
          Read More
        </Link>
      </div>
    </section>
  );
}
