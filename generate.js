const fs = require("fs");

try {
  const content = fs.readFileSync("./[slug].tsx", "utf-8");
  fs.writeFileSync("./pages/deploy/[slug].tsx", content);
  fs.writeFileSync("./pages/frontend/[slug].tsx", content);
  fs.writeFileSync("./pages/life/[slug].tsx", content);
  fs.writeFileSync("./pages/react-native/[slug].tsx", content);
  fs.writeFileSync("./pages/shorts/[slug].tsx", content);
  console.log("파일이 성공적으로 복사되었습니다.");
} catch (err) {
  console.error("파일 처리 중 오류가 발생했습니다:", err);
}
