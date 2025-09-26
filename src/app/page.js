"use client";
import dynamic from "next/dynamic";

const BlogList = dynamic(() => import("../components/BlogList"), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>
});

export default function Home() {
  return <BlogList />;
}