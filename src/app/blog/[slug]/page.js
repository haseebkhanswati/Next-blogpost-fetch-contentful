"use client";
import { use } from "react";
import dynamic from "next/dynamic";

const ContentfulPostBySlug = dynamic(() => import("../../../components/ContentfulPostBySlug"), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>
});

export default function BlogPost({ params }) {
  const { slug } = use(params);
  return <ContentfulPostBySlug slug={slug} />;
}