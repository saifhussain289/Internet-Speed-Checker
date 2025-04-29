import SpeedTest from "@/components/SpeedTest";
import NetworkInfo from "@/components/NetworkInfo";
import TestHistory from "@/components/TestHistory";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Internet Speed Checker</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Test your internet connection speed with our fast and accurate tool.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 w-full max-w-2xl mx-auto">
            <SpeedTest />
            <NetworkInfo />
            <TestHistory />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
