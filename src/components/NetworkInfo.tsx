"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, WifiOff, Globe, Clock } from "lucide-react";

// Define the NetworkInformation interface for TypeScript
interface NetworkInformation {
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
  type?: string;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

// Extend Navigator interface
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

interface NetworkConnection {
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
  type?: string;
  online: boolean;
}

export default function NetworkInfo() {
  const [networkInfo, setNetworkInfo] = useState<NetworkConnection>({
    online: true,
  });

  useEffect(() => {
    // Check if browser is online
    const updateOnlineStatus = () => {
      setNetworkInfo((prev) => ({ ...prev, online: navigator.onLine }));
    };

    // Update network information if available
    const updateNetworkInfo = () => {
      // Check if the Network Information API is available
      const nav = navigator as NavigatorWithConnection;
      const connection = nav.connection;

      if (connection) {
        setNetworkInfo({
          downlink: connection.downlink,
          effectiveType: connection.effectiveType,
          rtt: connection.rtt,
          saveData: connection.saveData,
          type: connection.type,
          online: navigator.onLine,
        });
      }
    };

    // Listen for online/offline events
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Update initial status
    updateOnlineStatus();
    updateNetworkInfo();

    // If Network Information API is available, listen for changes
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection;
    if (connection) {
      connection.addEventListener("change", updateNetworkInfo);
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      if (connection) {
        connection.removeEventListener("change", updateNetworkInfo);
      }
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {networkInfo.online ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5 text-red-500" />}
          Network Information
        </CardTitle>
        <CardDescription>
          Details about your current connection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Connection Type:</span>
            </div>
            <div className="text-sm font-medium">
              {networkInfo.type || networkInfo.effectiveType || "Unknown"}
            </div>

            {networkInfo.downlink && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Estimated Speed:</span>
                </div>
                <div className="text-sm font-medium">
                  {networkInfo.downlink} Mbps
                </div>
              </>
            )}

            {networkInfo.rtt && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Latency (RTT):</span>
                </div>
                <div className="text-sm font-medium">
                  {networkInfo.rtt} ms
                </div>
              </>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Wifi className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Status:</span>
            </div>
            <div className="text-sm font-medium">
              {networkInfo.online ? (
                <span className="text-green-500">Online</span>
              ) : (
                <span className="text-red-500">Offline</span>
              )}
            </div>

            {networkInfo.saveData && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Data Saver:</span>
                </div>
                <div className="text-sm font-medium">
                  Enabled
                </div>
              </>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Note: Network information availability depends on your browser. Some browsers may not provide all details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
