"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getBlogPosts } from "../lib/contentful";
import BlogCard from "./ui/BlogCard";
import LoadingSpinner from "./ui/LoadingSpinner";
import LoginButton from "./LoginButton";

export default function BlogList() {
  const { data: session, status } = useSession();
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

  if (status === "loading") return <LoadingSpinner />;
  
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl text-white font-bold mb-8">Welcome to My Blog</h1>
        <p className="text-gray-300 mb-8">Please sign in to view blog posts</p>
        <LoginButton />
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl text-white font-bold">Blog Posts</h1>
        <LoginButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <BlogCard key={post.sys.id} post={post} />
        ))}
      </div>
    </div>
  );
}