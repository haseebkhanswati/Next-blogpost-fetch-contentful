"use client";
import { useState, useEffect } from "react";
import { getBlogPosts } from "../lib/contentful";
import BlogCard from "./ui/BlogCard";
import LoadingSpinner from "./ui/LoadingSpinner";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const blogPosts = await getBlogPosts();
      setPosts(blogPosts);
      setLoading(false);
    };
    
    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl text-white font-bold text-center mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <BlogCard key={post.sys.id} post={post} />
        ))}
      </div>
    </div>
  );
}