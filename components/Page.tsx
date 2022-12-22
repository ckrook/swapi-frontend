import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import PageTransition from "./PageTransition";

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[95%] md:w-[900px]">
      <Header />
      <main className="py-10">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}

export default Page;
