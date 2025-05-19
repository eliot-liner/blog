import { GetStaticProps } from "next";
import { Blog } from "../components/blog";
import { getBlogPosts, PostType } from "utils/utils";
import { useRouter } from "next/router";

export default ({ posts }: { posts: PostType[] }) => {
  return <Blog posts={posts} />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: getBlogPosts(),
    },
  };
};
