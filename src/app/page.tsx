import { Button } from "@/components/ui/button";

import Layout from "./layout"; // Ensure you're importing the layout correctly

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Button variant="default">Test</Button>
      </div>
    </Layout>
  );
}
