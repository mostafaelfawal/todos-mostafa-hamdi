import Header from "@/components/Header";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="bg-[#fafafa] dark:bg-gray-600 transition-colors">
      <Header />
      <Main />
    </div>
  );
}
