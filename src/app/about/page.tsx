import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col items-center p-4 md:p-12">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Internet Speed Testing</h1>

          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">How Our Speed Test Works</h2>
              <p className="mb-4">
                Our internet speed test measures your connection's download and upload speeds by transferring data between your device and our servers. Here's how it works:
              </p>

              <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>
                  <strong>Download Speed Test:</strong> We send a series of files from our server to your browser and measure how quickly they arrive.
                </li>
                <li>
                  <strong>Upload Speed Test:</strong> Your browser sends data to our server, and we measure how long the transfer takes.
                </li>
                <li>
                  <strong>Results:</strong> We calculate your speeds in Megabits per second (Mbps) and display them in real-time.
                </li>
              </ol>

              <p>
                The test automatically adapts to your connection speed to provide accurate results whether you have a slow or fast connection.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Understanding Your Results</h2>

              <h3 className="text-xl font-medium mb-2">Download Speed</h3>
              <p className="mb-4">
                Download speed is how quickly your internet connection can retrieve data from the internet (like loading websites, streaming videos, or downloading files).
              </p>

              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>1-5 Mbps:</strong> Basic web browsing and email</li>
                <li><strong>5-25 Mbps:</strong> HD video streaming and online gaming</li>
                <li><strong>25-100 Mbps:</strong> 4K streaming and fast downloads</li>
                <li><strong>100+ Mbps:</strong> Multiple users with heavy internet usage</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Upload Speed</h3>
              <p className="mb-4">
                Upload speed is how quickly you can send data from your device to the internet (like sending emails with attachments, uploading photos, or video conferencing).
              </p>

              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>1-3 Mbps:</strong> Basic video calls and photo uploads</li>
                <li><strong>3-10 Mbps:</strong> HD video calls and faster uploads</li>
                <li><strong>10+ Mbps:</strong> Live streaming, large file uploads</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Factors Affecting Your Speed</h2>

              <p className="mb-4">
                Several factors can affect your internet speed test results:
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Device Performance:</strong> Older devices or those with limited processing power might not be able to achieve the maximum speeds your connection offers.
                </li>
                <li>
                  <strong>Wi-Fi Quality:</strong> Distance from your router, obstacles like walls, and interference from other devices can reduce Wi-Fi performance.
                </li>
                <li>
                  <strong>Network Congestion:</strong> If many people in your area are using the internet simultaneously, it can slow down connection speeds.
                </li>
                <li>
                  <strong>ISP Throttling:</strong> Some internet service providers may slow down certain types of traffic or reduce speeds after you've used a certain amount of data.
                </li>
                <li>
                  <strong>Browser Extensions:</strong> Some browser extensions or VPNs can interfere with speed tests.
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Tips for Improving Your Speed</h2>

              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Restart your equipment:</strong> Sometimes simply restarting your modem and router can resolve speed issues.
                </li>
                <li>
                  <strong>Use a wired connection:</strong> Ethernet connections are typically faster and more reliable than Wi-Fi.
                </li>
                <li>
                  <strong>Optimize your Wi-Fi:</strong> Place your router in a central location, away from obstacles and other electronic devices.
                </li>
                <li>
                  <strong>Update your equipment:</strong> Older modems and routers might not support the latest speed standards.
                </li>
                <li>
                  <strong>Close background applications:</strong> Programs running in the background can use your bandwidth and affect test results.
                </li>
                <li>
                  <strong>Contact your ISP:</strong> If you consistently get speeds much lower than what you're paying for, contact your internet service provider.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
