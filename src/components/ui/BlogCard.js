import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.fields.slug}`}>
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
          <p className="text-black">{post.fields.discription}</p>
        </div>
      </div>
    </Link>
  );
}