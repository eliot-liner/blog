import { GetStaticProps } from "next";
import { getBlogPosts, PostType } from "utils/utils";
import Head from "next/head";
import dynamic from "next/dynamic";

const Blog = dynamic(() => import("../components/blog"), { ssr: false });

export default ({ posts }: { posts: PostType[] }) => {
  return (
    <>
      <Head>
        <title>조상현 기술블로그</title>
      </Head>
      <Blog posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: getBlogPosts(),
    },
  };
};
