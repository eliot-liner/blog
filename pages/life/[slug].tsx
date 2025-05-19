import { CustomMDX } from "components/mdx";
import { getBlogPosts, PostType } from "utils/utils";
import { sortDate } from "utils/date";
import { GetStaticProps, GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { RecommendPost } from "components/Detail/RecommendPost";
import { Comment } from "components/Detail/Comment";
import { Header } from "components/Detail/Header";
import Head from "next/head";

export default ({
  posts,
  slug,
  post,
}: {
  posts: PostType[];
  slug: string;
  post: PostType;
}) => {
  // 날짜순으로 정렬된 포스트 목록 생성 (최신순)
  const sortedPosts = posts.filter((p) => p.tag === post.tag).sort(sortDate);

  // 현재 포스트의 인덱스 찾기
  const currentIndex = sortedPosts.findIndex((p) => p.slug === slug);

  // 이전글과 다음글 가져오기 (이전글은 더 최신 글, 다음글은 더 오래된 글)
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  return (
    <section>
      <Head>
        <title>{post.metadata.title}</title>
      </Head>

      <Header post={post} />
      <CustomMDX source={post.content} />

      <div className="mt-12 mb-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <RecommendPost post={prevPost} isPrevious={true} />
          <RecommendPost post={nextPost} isPrevious={false} />
        </div>
      </div>

      <Comment />
    </section>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getBlogPosts();
  const post = posts.find((post) => post.slug === params?.slug);

  return {
    props: {
      posts,
      slug: params?.slug,
      post: { ...post, content: await serialize(post?.content || "") },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getBlogPosts("life");

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};
