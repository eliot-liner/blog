import { getPostData, getAllPostIds } from "@/lib/posts";
import Link from "next/link";
import type { GetStaticProps, GetStaticPaths } from "next";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import CodeCopyButton from "@/components/CodeCopyButton";
import { createRoot } from "react-dom/client";

interface PostProps {
  postData: {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
  };
}

export default function Post({ postData }: PostProps) {
  useEffect(() => {
    Prism.highlightAll();

    // 코드 블록에 복사 버튼 추가
    const codeBlocks = document.querySelectorAll("pre code");
    const roots: { [key: string]: ReturnType<typeof createRoot> } = {};

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (pre && !pre.querySelector(".copy-button")) {
        const button = document.createElement("div");
        button.className = "copy-button";
        pre.style.position = "relative";
        pre.appendChild(button);

        const code = codeBlock.textContent || "";
        const rootId = `copy-button-${Math.random().toString(36).substr(2, 9)}`;
        const root = document.createElement("div");
        root.id = rootId;
        button.appendChild(root);

        const reactRoot = createRoot(root);
        reactRoot.render(<CodeCopyButton code={code} />);
        roots[rootId] = reactRoot;
      }
    });

    // 클린업 함수
    return () => {
      Object.values(roots).forEach((root) => root.unmount());
    };
  }, [postData.contentHtml]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-8 inline-block"
      >
        ← 홈으로
      </Link>
      <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          {postData.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{postData.date}</p>
        <div
          className="[&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:mb-8 [&_h1]:mt-12 [&_h1]:text-gray-900 dark:[&_h1]:text-gray-100 [&_h1_.anchor]:text-gray-900 dark:[&_h1_.anchor]:text-gray-100
                     [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mb-6 [&_h2]:mt-10 [&_h2]:text-gray-800 dark:[&_h2]:text-gray-200 [&_h2_.anchor]:text-gray-800 dark:[&_h2_.anchor]:text-gray-200
                     [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-gray-800 dark:[&_h3]:text-gray-200 [&_h3_.anchor]:text-gray-800 dark:[&_h3_.anchor]:text-gray-200
                     [&_h4]:text-xl [&_h4]:font-bold [&_h4]:mb-4 [&_h4]:mt-6 [&_h4]:text-gray-800 dark:[&_h4]:text-gray-200 [&_h4_.anchor]:text-gray-800 dark:[&_h4_.anchor]:text-gray-200
                     [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_p]:text-base
                     [&_a]:text-blue-600 dark:[&_a]:text-blue-400
                     [&_strong]:text-gray-900 dark:[&_strong]:text-gray-100
                     [&_code]:text-gray-900 dark:[&_code]:text-gray-100 [&_code]:bg-gray-100 dark:[&_code]:bg-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                     [&_pre]:!bg-gray-900 dark:[&_pre]:!bg-gray-800 [&_pre]:!p-4 [&_pre]:!rounded-lg
                     [&_.rehype-code-title]:!bg-gray-900 dark:[&_.rehype-code-title]:!bg-gray-800 [&_.rehype-code-title]:!text-gray-300 [&_.rehype-code-title]:!px-4 [&_.rehype-code-title]:!py-2 [&_.rehype-code-title]:!text-sm [&_.rehype-code-title]:!font-mono [&_.rehype-code-title]:!rounded-t-lg [&_.rehype-code-title]:!border-b [&_.rehype-code-title]:!border-gray-700 [&_.rehype-code-title]:!mb-0 [&_.rehype-code-title]:!mt-0
                     [&_.rehype-code-title+pre]:!rounded-t-none [&_.rehype-code-title+pre]:!rounded-b-lg"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
