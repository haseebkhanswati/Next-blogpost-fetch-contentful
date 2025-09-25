"use client";
import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Link from "next/link";

export default function ContentfulPostBySlug({ slug }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = createClient({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
    });

    client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      include: 10
    })
    .then((response) => {
      if (response.items.length > 0) {
        setPost(response.items[0]);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!post) return <div className="text-center text-red-500">Post not found</div>;

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-4 "> 
        <Link className="text-white text-3xl py-2 px-4 rounded bg-black hover:bg-black" href="/">Back</Link>
      </div>
      {post.fields.image && (
        <img
          src={`https:${post.fields.image.fields.file.url}`}
          alt={post.fields.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-bold text-black mb-4">{post.fields.title}</h1>
      <p className="text-gray-600 mb-2">{post.fields.postDate}</p>
      <p className="text-lg text-black mb-6 italic">{post.fields.discription}</p>
      <div className="prose prose-lg text-black max-w-none">{documentToReactComponents(post.fields.content, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => (
            <img
              src={`https:${node.data.target.fields.file.url}`}
              alt={node.data.target.fields.title || ''}
              className="w-full rounded-lg my-4"
            />
          )
        }
      })}</div>
    </div>
  );
}