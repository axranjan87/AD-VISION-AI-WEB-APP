"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import { AdResults } from "@/components/AdResults";
import { AdMode } from "@/app/page";

export default function ViewAdPage() {
  const router = useRouter();
  const params = useParams();
  const [ad, setAd] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const viewingAd = sessionStorage.getItem("viewingAd");
    if (viewingAd) {
      const adData = JSON.parse(viewingAd);
      setAd(adData);
    } else {
      // Try to load from saved ads
      const savedAds = JSON.parse(localStorage.getItem("savedAds") || "[]");
      const foundAd = savedAds.find((a: any) => a.id === params.id);
      if (foundAd) {
        setAd(foundAd);
      } else {
        toast.error("Ad not found");
        router.push("/dashboard");
      }
    }
  }, [params.id, router]);

  const handleCopy = async () => {
    if (ad?.content) {
      await navigator.clipboard.writeText(ad.content);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!ad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading ad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{ad.product}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span>Platform: {ad.platform}</span>
                <span>•</span>
                <span>Tone: {ad.tone}</span>
                <span>•</span>
                <span>Type: {ad.type}</span>
                {ad.audience && (
                  <>
                    <span>•</span>
                    <span>Audience: {ad.audience}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {ad.type === "text" && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => {
                  if (ad.type === "text") {
                    const blob = new Blob([ad.content], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `ad-${ad.product.replace(/\s+/g, "-")}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                    toast.success("Downloaded!");
                  } else if (ad.metadata?.videoUrl) {
                    window.open(ad.metadata.videoUrl, "_blank");
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-900 font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          <AdResults
            results={{
              type: ad.type as AdMode,
              content: ad.content,
              metadata: ad.metadata,
            }}
          />
        </div>
      </div>
    </div>
  );
}




