import { BlogPosts } from "components/posts";
import { Navbar } from "components/nav";
import { PostType } from "../utils/utils";
import { useRouter } from "next/router";

const CATEGORIES = [
  "All",
  "Frontend",
  "React Native",
  "Life",
  "Shorts",
  "Deploy",
];

const Blog = (props: { posts: PostType[] }) => {
  const { query } = useRouter();
  const category = query.category || "all";

  return (
    <section>
      <Navbar />

      <div className="mb-8">
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          조상현 블로그
        </h1>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`?category=${cat.toLowerCase().replace(" ", "-")}`}
              className={`px-4 py-2 ${
                category === cat.toLowerCase().replace(" ", "-")
                  ? "bg-neutral-300 dark:bg-neutral-600"
                  : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              } text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium transition-colors`}
            >
              {cat}
            </a>
          ))}
        </div>
      </div>

      <BlogPosts
        posts={
          category === "all"
            ? props.posts
            : props.posts.filter((post) => post.tag === category)
        }
      />
    </section>
  );
};

export default Blog;
