import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        조상현 블로그
      </h1>
      <p className="mb-4">
        {`저는 Liner에 다니고 있는 JavaScript 개발자입니다. 성능, 생산성, 안정성을 중요하게 생각합니다.`}
      </p>
      
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
