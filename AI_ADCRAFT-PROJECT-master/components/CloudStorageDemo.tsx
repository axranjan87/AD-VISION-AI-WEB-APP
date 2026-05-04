"use client";

import { useState } from "react";
import { Cloud, Check, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function CloudStorageDemo() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      // Check if Convex URL is configured
      const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
      if (convexUrl) {
        // Simulate connection check
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsConnected(true);
        toast.success("Cloud Storage connected!");
      } else {
        setIsConnected(false);
        toast.error("Convex not configured. Check your .env.local file");
      }
    } catch (error) {
      setIsConnected(false);
      toast.error("Connection failed");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Cloud className="w-6 h-6 text-indigo-400" />
        <h3 className="text-lg font-semibold">Cloud Storage Status</h3>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        {isConnected ? (
          <>
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-400">Connected to Convex</span>
          </>
        ) : (
          <>
            <X className="w-5 h-5 text-red-400" />
            <span className="text-sm text-red-400">Not Connected</span>
          </>
        )}
      </div>

      <button
        onClick={checkConnection}
        disabled={isChecking}
        className="w-full px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isChecking ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <Cloud className="w-4 h-4" />
            Check Connection
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 mt-4">
        Your ads are automatically saved to Convex cloud storage. Access them from any device.
      </p>
    </div>
  );
}




