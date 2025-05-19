const fs = require("fs");

const ADDITIONAL_CONTENT = (
  tag
) => `export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getBlogPosts("${tag}");

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};
`;

try {
  const content = fs.readFileSync("./[slug].tsx", "utf-8");
  fs.writeFileSync(
    "./pages/deploy/[slug].tsx",
    content + "\n" + ADDITIONAL_CONTENT("deploy")
  );
  fs.writeFileSync(
    "./pages/frontend/[slug].tsx",
    content + "\n" + ADDITIONAL_CONTENT("frontend")
  );
  fs.writeFileSync(
    "./pages/life/[slug].tsx",
    content + "\n" + ADDITIONAL_CONTENT("life")
  );
  fs.writeFileSync(
    "./pages/react-native/[slug].tsx",
    content + "\n" + ADDITIONAL_CONTENT("react-native")
  );
  fs.writeFileSync(
    "./pages/shorts/[slug].tsx",
    content + "\n" + ADDITIONAL_CONTENT("shorts")
  );
  console.log("파일이 성공적으로 복사되었습니다.");
} catch (err) {
  console.error("파일 처리 중 오류가 발생했습니다:", err);
}
