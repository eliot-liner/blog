import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/utils";
import { baseUrl } from "app/sitemap";
import Link from "next/link";
import { sortDate } from "app/components/posts";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, image } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    openGraph: {
      title,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }) {
  const posts = getBlogPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // 날짜순으로 정렬된 포스트 목록 생성 (최신순)
  const sortedPosts = posts.sort(sortDate);

  // 현재 포스트의 인덱스 찾기
  const currentIndex = sortedPosts.findIndex((p) => p.slug === params.slug);

  // 이전글과 다음글 가져오기 (이전글은 더 최신 글, 다음글은 더 오래된 글)
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : undefined,
            // : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />

      <Link
        href="/"
        className="flex items-center mb-4 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        홈으로
      </Link>

      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>

      <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* 이전 글 (더 최신 글) */}
          <div className="w-full sm:w-1/2">
            {prevPost ? (
              <Link
                href={`/${prevPost.slug}`}
                className="flex flex-col p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                <span className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  이전 글
                </span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1">
                  {prevPost.metadata.title}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {formatDate(prevPost.metadata.publishedAt)}
                </span>
              </Link>
            ) : (
              <div className="flex flex-col p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600">
                <span className="text-sm mb-1">이전 글</span>
                <span className="font-medium line-clamp-1">
                  첫 번째 글입니다
                </span>
              </div>
            )}
          </div>

          {/* 다음 글 (더 오래된 글) */}
          <div className="w-full sm:w-1/2">
            {nextPost ? (
              <Link
                href={`/${nextPost.slug}`}
                className="flex flex-col p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                <span className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  다음 글
                </span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1">
                  {nextPost.metadata.title}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {formatDate(nextPost.metadata.publishedAt)}
                </span>
              </Link>
            ) : (
              <div className="flex flex-col p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600">
                <span className="text-sm mb-1">다음 글</span>
                <span className="font-medium line-clamp-1">
                  마지막 글입니다
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
