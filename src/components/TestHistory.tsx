"use client";

import { useSpeedTest, SpeedTestResult } from "@/contexts/SpeedTestContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

export default function TestHistory() {
  const { history, clearHistory } = useSpeedTest();

  // Format the date from timestamp
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // If there's no history, show a message
  if (history.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto mt-6">
        <CardHeader>
          <CardTitle>Test History</CardTitle>
          <CardDescription>Your speed test history will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No tests recorded yet. Run your first speed test to see results here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Test History</CardTitle>
          <CardDescription>Your recent speed test results</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearHistory}
          className="h-8"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((result) => (
            <div key={result.id} className="border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">{formatDate(result.timestamp)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <ArrowDown className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">
                    {result.downloadSpeed !== null ? `${result.downloadSpeed} Mbps` : "—"}
                  </span>
                </div>
                <div className="flex items-center">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium">
                    {result.uploadSpeed !== null ? `${result.uploadSpeed} Mbps` : "—"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
