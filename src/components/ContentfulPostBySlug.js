"use client";
import { useState, useEffect } from "react";
import { getBlogPostBySlug } from "../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import LoadingSpinner from "./ui/LoadingSpinner";
import Link from "next/link";
import moment from "moment";

export default function ContentfulPostBySlug({ slug }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const blogPost = await getBlogPostBySlug(slug);
      setPost(blogPost);
      setLoading(false);
    };
    
    fetchPost();
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (!post) return <div className="text-center text-red-500">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#181a1b] shadow-lg rounded-lg">
      <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-800">
        ← Back to Blog
      </Link>
      {post.fields.image && (
        <img
          src={`https:${post.fields.image.fields.file.url}`}
          alt={post.fields.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-bold text-white mb-4">{post.fields.title}</h1>
      <p className="text-gray-400 text-sm mb-2">{moment(post.fields.postDate).format('MMMM DD, YYYY')}</p>
      <p className="text-lg text-gray-300 mb-6 italic">{post.fields.discription}</p>
      <div className="prose prose-lg text-white max-w-none">
        {documentToReactComponents(post.fields.content, {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
              const { file, title } = node.data.target.fields;
              return (
                <img
                  src={`https:${file.url}`}
                  alt={title || 'Content image'}
                  className="w-full h-auto rounded-lg my-4"
                />
              );
            },
          },
        })}
      </div>
    </div>
  );
}