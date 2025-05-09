import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { GetStaticProps } from "next";

interface HomeProps {
  posts: {
    id: string;
    title: string;
    date: string;
  }[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">블로그</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-4">
            <Link href={`/posts/${post.id}`} className="hover:underline">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-600">{post.date}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
