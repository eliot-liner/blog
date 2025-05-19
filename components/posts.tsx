import Link from "next/link";
import { PostType } from "utils/utils";
import { formatDate } from "utils/date";
import { sortDate } from "utils/date";

interface PostProps {
  posts: PostType[];
}

export function BlogPosts({ posts }: PostProps) {
  return (
    <div className="my-8">
      <div className="flex flex-col space-y-4">
        {posts.sort(sortDate).map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            href={`/${post.tag}/${post.slug}`}
          >
            <div className="w-full flex flex-col space-y-2">
              <div className="flex flex-row items-center space-x-2">
                {post.metadata.tag && (
                  <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full">
                    {post.metadata.tag}
                  </span>
                )}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
