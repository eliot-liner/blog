import Link from "next/link";
import { formatDate } from "utils/date";
import { PostType } from "utils/utils";

export const RecommendPost = ({
  post,
  isPrevious,
}: {
  post: PostType | null;
  isPrevious: boolean;
}) => {
  return (
    <div className="w-full sm:w-1/2">
      {post ? (
        <Link
          href={`/${post.tag}/${post.slug}`}
          className="flex flex-col p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        >
          <span className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
            {isPrevious ? "이전 글" : "다음 글"}
          </span>
          <span className="font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1">
            {post.metadata.title}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {formatDate(post.metadata.publishedAt)}
          </span>
        </Link>
      ) : (
        <div className="flex flex-col p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 cursor-not-allowed">
          <span className="text-sm mb-1">
            {isPrevious ? "이전 글" : "다음 글"}
          </span>
          <span className="font-medium line-clamp-1">
            {isPrevious ? "첫 번째 글입니다" : "마지막 글입니다"}
          </span>
        </div>
      )}
    </div>
  );
};
