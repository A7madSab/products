import { TopBar } from "@/components/header/top-bar";
import { MainNav } from "@/components/header/main-nav";
import { Breadcrumb } from "@/components/header/breadcrumb";
import { PageHeader } from "@/components/header/page-header";
import { SplitLayout } from "@/components/split-layout";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <TopBar />
        <MainNav />
        <Breadcrumb />
        <PageHeader />
      </header>
      <main className="flex-1 container mx-auto">
        <SplitLayout />
      </main>
      <Footer />
    </div>
  );
}
