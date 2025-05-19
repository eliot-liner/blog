import Footer from "components/footer";
import { Navbar } from "../components/nav";
import Head from "next/head";
import { SEO } from "components/SEO";

export default () => {
  return (
    <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
      <SEO title="조상현 포트폴리오" />
      <section>
        <Navbar />
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          안녕하세요, 조상현입니다.
        </h1>
        <p className="mb-4 whitespace-break-spaces">
          {`저는 Liner에 다니고 있는 JavaScript 개발자입니다.\n성능, 생산성, 안정성을 중요하게 생각합니다.`}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Work Experience</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium">Liner</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                JavaScript Developer
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                2023.07.24 - Present
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                JavaScript
              </span>
              <span className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                React Native
              </span>
              <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                Next.js
              </span>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Next.js로 웹 애플리케이션 개발 및 유지보수</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>React Native로 모바일 앱 개발</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>생성형 AI 서비스 개발</span>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
};
