import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface Blog {
  blog_title: string;
  summary: string;
  image: any; // Sanity asset reference
  _createdAt: string;
}

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const query = `*[_type == "blog"] { "slug": slug.current }`;
  const blogs: { slug: string }[] = await client.fetch(query);

  console.log("Generated Slugs:", blogs); // Debugging
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: { params: Params }) {
  console.log("Params:", params); // Debugging
  
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    blog_title,
    summary,
    image,
    _createdAt
  }`;

  const blog: Blog | null = await client.fetch(query, { slug: params.slug });
  console.log("Fetched Blog:", blog); // Debugging

  if (!blog) {
    return <p className="text-center text-white">Blog not found.</p>;
  }

  const imageSrc = blog.image ? urlFor(blog.image).url() : "/placeholder-image.jpg";
  console.log("Image URL:", imageSrc); // Debugging

  return (
    <div className="container mx-auto p-4 bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-white">{blog.blog_title}</h1>
      <div className="flex justify-center">
        <Image
          className="border-black border rounded-lg"
          src={imageSrc}
          alt={blog.blog_title}
          width={400}
          height={400}
          layout="intrinsic"
        />
      </div>
      <div className="mt-10">
        <p className="text-white text-lg">{blog.summary}</p>
        <p className="text-white mt-4 text-sm">
          Published on: {new Date(blog._createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
