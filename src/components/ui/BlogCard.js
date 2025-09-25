import Link from "next/link";
import moment from "moment";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.fields.slug}`}>
      <div className="bg-[#181a1b] shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        {post.fields.image && (
          <img
            src={`https:${post.fields.image.fields.file.url}`}
            alt={post.fields.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold text-white mb-2">{post.fields.title}</h2>
          <p className="text-gray-400 text-sm mb-4">{moment(post.fields.postDate).format('MMMM DD, YYYY')}</p>
          <p className="text-gray-300">{post.fields.discription}</p>
        </div>
      </div>
    </Link>
  );
}