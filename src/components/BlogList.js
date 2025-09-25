"use client";
import { useState, useEffect } from "react";
import { createClient } from "contentful";
import Link from "next/link";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = createClient({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
    });

    client.getEntries({
      content_type: 'blogPost'
    })
    .then((response) => {
      setPosts(response.items);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <Link key={post.sys.id} href={`/blog/${post.fields.slug}`}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              {post.fields.image && (
                <img
                  src={`https:${post.fields.image.fields.file.url}`}
                  alt={post.fields.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold text-black mb-2">{post.fields.title}</h2>
                <p className="text-gray-600 mb-2">{post.fields.postDate}</p>
                <p className="text-black">{post.fields.discription}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}