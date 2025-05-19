import Footer from "components/footer";
import { Navbar } from "../components/nav";

export default () => {
  return (
    <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
      <section>
        <Navbar />
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          안녕하세요, 조상현입니다.
        </h1>
        <p className="mb-4 whitespace-break-spaces">
          {`저는 Liner에 다니고 있는 JavaScript 개발자입니다.\n성능, 생산성, 안정성을 중요하게 생각합니다.`}
        </p>
      </section>
      <Footer />
    </main>
  );
};
