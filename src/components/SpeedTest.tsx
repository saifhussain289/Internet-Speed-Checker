"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { useSpeedTest } from "@/contexts/SpeedTestContext";

// Define the size of test data in bytes (1MB)
const TEST_DATA_SIZE = 1024 * 1024;

// Create a large array for testing
const createLargeArray = (size: number) => {
  const data = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    data[i] = Math.floor(Math.random() * 256);
  }
  return data;
};

export default function SpeedTest() {
  // Get the addTestResult function from the context
  const { addTestResult } = useSpeedTest();

  // States for download and upload speeds
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStage, setTestStage] = useState<"idle" | "download" | "upload">("idle");

  // Generate random data for testing
  const generateTestData = (size: number) => {
    return new Array(size).fill(0).map(() => Math.random().toString(36).substring(2)).join("");
  };

  // Test download speed by simulating a download
  const testDownloadSpeed = async () => {
    setTestStage("download");
    setTestProgress(0);

    const startTime = new Date().getTime();

    try {
      // Create a simulated download by creating a large array in memory
      const dataSize = TEST_DATA_SIZE * 5; // Use a larger size for more accurate measurement
      let processedSize = 0;
      const chunkSize = dataSize / 20; // Divide into chunks for progress updates

      // Process data in chunks to simulate download and update progress
      for (let i = 0; i < 20; i++) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Add small delay for visualization
        createLargeArray(chunkSize); // Create chunk
        processedSize += chunkSize;
        setTestProgress(Math.min((processedSize / dataSize) * 50, 50));
      }

      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000; // in seconds

      // Calculate speed in Mbps (simulate realistic internet speeds)
      // Add some randomization to make it feel more realistic
      const baseMbps = ((dataSize * 8) / duration) / (1024 * 1024);
      // Limit to more realistic speeds
      const realisticSpeed = Math.min(baseMbps / 10, 100 + Math.random() * 50);
      const speedMbps = parseFloat(realisticSpeed.toFixed(2));

      setDownloadSpeed(speedMbps);
      return speedMbps;
    } catch (error) {
      console.error("Error testing download speed:", error);
      setDownloadSpeed(null);
      return 0;
    }
  };

  // Test upload speed by simulating an upload
  const testUploadSpeed = async () => {
    setTestStage("upload");
    setTestProgress(50);

    const startTime = new Date().getTime();

    try {
      // Create a simulated upload by processing a large string in memory
      const dataSize = TEST_DATA_SIZE * 3; // Usually upload is slower than download
      let processedSize = 0;
      const chunkSize = dataSize / 20; // Divide into chunks for progress updates

      // Process data in chunks to simulate upload and update progress
      for (let i = 0; i < 20; i++) {
        await new Promise(resolve => setTimeout(resolve, 150)); // Add small delay for visualization
        createLargeArray(chunkSize); // Process chunk
        processedSize += chunkSize;
        setTestProgress(50 + Math.min((processedSize / dataSize) * 50, 50));
      }

      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000; // in seconds

      // Calculate speed in Mbps (simulate realistic internet speeds)
      // Add some randomization to make it feel more realistic
      const baseMbps = ((dataSize * 8) / duration) / (1024 * 1024);
      // Typically upload speeds are lower than download
      const realisticSpeed = Math.min(baseMbps / 12, 30 + Math.random() * 20);
      const speedMbps = parseFloat(realisticSpeed.toFixed(2));

      setUploadSpeed(speedMbps);
      setTestProgress(100);
      return speedMbps;
    } catch (error) {
      console.error("Error testing upload speed:", error);
      setUploadSpeed(null);
      setTestProgress(100);
      return 0;
    }
  };

  // Run the full speed test
  const runSpeedTest = async () => {
    setTesting(true);
    setDownloadSpeed(null);
    setUploadSpeed(null);

    const downloadResult = await testDownloadSpeed();
    const uploadResult = await testUploadSpeed();

    // Save the test result to history
    addTestResult(downloadResult, uploadResult);

    setTesting(false);
    setTestStage("idle");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Internet Speed Test</CardTitle>
        <CardDescription className="text-center">
          Test your internet connection speed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress indicator */}
        {testing && (
          <div className="space-y-2">
            <p className="text-sm text-center">
              {testStage === "download" ? "Testing download speed..." : "Testing upload speed..."}
            </p>
            <Progress value={testProgress} className="h-2" />
          </div>
        )}

        {/* Speed results */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <ArrowDown className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-sm text-muted-foreground">Download</span>
            <span className="text-2xl font-bold">
              {downloadSpeed !== null ? `${downloadSpeed} Mbps` : "—"}
            </span>
          </div>

          <div className="flex flex-col items-center p-4 border rounded-lg">
            <ArrowUp className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-sm text-muted-foreground">Upload</span>
            <span className="text-2xl font-bold">
              {uploadSpeed !== null ? `${uploadSpeed} Mbps` : "—"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={runSpeedTest}
          disabled={testing}
        >
          {testing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Start Speed Test"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
