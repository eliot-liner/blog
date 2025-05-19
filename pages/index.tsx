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

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Open Source</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://github.com/vercel/next.js/pull/50136"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-600 dark:text-gray-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                      Next.js
                    </h3>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      2023.05
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    makeDir 함수 개선
                  </p>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};
