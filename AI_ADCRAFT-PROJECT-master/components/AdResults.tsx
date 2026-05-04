"use client";

import { useState, useEffect } from "react";
import { AdMode } from "@/app/page";
import { Copy, Download, Check, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { SaveButton } from "@/components/SaveButton";
import { motion } from "framer-motion";

interface AdResultsProps {
  results: {
    type: AdMode;
    content: string;
    metadata?: {
      videoUrl?: string;
      variations?: string[];
      fallback?: boolean;
      message?: string;
      jobId?: string;
      status?: string;
      pollUrl?: string;
      demo?: boolean;
    };
  };
}

export function AdResults({ results }: AdResultsProps) {
  const [copied, setCopied] = useState(false);
  const [videoStatus, setVideoStatus] = useState(results.metadata?.status);
  const [isPolling, setIsPolling] = useState(false);
  const [videoUrl, setVideoUrl] = useState(results.metadata?.videoUrl);

  // Auto-poll for video status if jobId exists
  useEffect(() => {
    const jobId = results.metadata?.jobId;
    const hasVideoUrl = results.metadata?.videoUrl || videoUrl;
    
    if (results.type === "video" && jobId && !hasVideoUrl) {
      const pollInterval = setInterval(async () => {
        if (isPolling) return;
        
        setIsPolling(true);
        try {
          const response = await fetch(
            `/api/generate-video/status?jobId=${jobId}`
          );
          
          if (response.ok) {
            const data = await response.json();
            
            if (data.status === "completed" && data.videoUrl) {
              setVideoStatus("completed");
              setVideoUrl(data.videoUrl);
              clearInterval(pollInterval);
              toast.success("Video generated successfully!");
            } else if (data.status === "failed") {
              setVideoStatus("failed");
              clearInterval(pollInterval);
              toast.error(data.error || "Video generation failed");
            } else {
              setVideoStatus(data.status || "processing");
            }
          }
        } catch (error) {
          console.error("Polling error:", error);
        } finally {
          setIsPolling(false);
        }
      }, 3000); // Poll every 3 seconds

      return () => clearInterval(pollInterval);
    }
  }, [results.metadata?.jobId, results.type, isPolling, videoUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(results.content);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleDownloadVideo = async () => {
    const urlToDownload = videoUrl || results.metadata?.videoUrl;
    if (results.type === "video" && urlToDownload) {
      try {
        const response = await fetch(urlToDownload);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ad-video.mp4";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success("Video downloaded!");
      } catch (err) {
        toast.error("Failed to download video");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 space-y-4"
    >
      {results.metadata?.fallback && results.metadata?.message && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-200 text-sm">
          <p className="font-medium mb-1">⚠️ Notice</p>
          <p>{results.metadata.message}</p>
        </div>
      )}
      
      {results.metadata?.demo && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-200 text-sm">
          <p className="font-medium mb-2">❌ Demo Mode Active</p>
          <p className="mb-2">No API key configured. This is a sample video, not generated from your input.</p>
          <p className="text-xs text-red-300/80">
            To generate real videos based on your product "{results.metadata?.product || 'input'}", 
            please add AKOOL_API_KEY to your .env.local file.
          </p>
        </div>
      )}

      {results.metadata?.requiresApiKey && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 text-blue-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-blue-400 text-xl">ℹ️</div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-blue-300">Your Video Ad Preview</h3>
              <p className="text-sm mb-4">
                Your video ad for <span className="font-semibold">"{results.metadata?.product}"</span> is ready to generate! 
                All your inputs have been processed and the prompt is ready.
              </p>
              
              <div className="bg-dark-muted/50 rounded-lg p-4 mb-4">
                <p className="text-xs text-blue-300/80 mb-2 font-semibold">Generated Prompt (Based on Your Inputs):</p>
                <pre className="text-xs text-blue-100 whitespace-pre-wrap break-words font-mono">
                  {results.metadata?.prompt}
                </pre>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <p><span className="font-semibold">Product:</span> {results.metadata?.product}</p>
                {results.metadata?.audience && (
                  <p><span className="font-semibold">Target Audience:</span> {results.metadata.audience}</p>
                )}
                <p><span className="font-semibold">Tone:</span> {results.metadata?.tone}</p>
                <p><span className="font-semibold">Platform:</span> {results.metadata?.platform}</p>
                <p><span className="font-semibold">Duration:</span> {results.metadata?.duration}s</p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="font-semibold mb-2 text-yellow-300">📋 Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs text-yellow-200/90">
                  <li>{results.metadata?.setupInstructions?.step1}</li>
                  <li>{results.metadata?.setupInstructions?.step2}</li>
                  <li>{results.metadata?.setupInstructions?.step3}</li>
                  <li>{results.metadata?.setupInstructions?.step4}</li>
                </ol>
                <a
                  href="https://akool.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-primary text-primary-900 font-semibold rounded-lg text-sm hover:bg-primary/90 transition-colors"
                >
                  Get API Key →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {results.type === "video" && results.metadata?.product && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-blue-200 text-sm">
          <p className="font-medium mb-2">📋 Your Video Ad Details</p>
          <div className="space-y-1 text-xs">
            <p><span className="font-semibold">Product:</span> {results.metadata.product}</p>
            {results.metadata.audience && (
              <p><span className="font-semibold">Target Audience:</span> {results.metadata.audience}</p>
            )}
            {results.metadata.tone && (
              <p><span className="font-semibold">Tone:</span> {results.metadata.tone}</p>
            )}
            {results.metadata.platform && (
              <p><span className="font-semibold">Platform:</span> {results.metadata.platform}</p>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {results.type === "text" ? "Text Ad Results" : "Video Ad Results"}
        </h2>
        <div className="flex gap-2">
          {results.type === "text" && (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-dark-muted border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy All
                  </>
                )}
              </button>
              <SaveButton
                ad={{
                  type: results.type,
                  content: results.content,
                  metadata: results.metadata,
                  product: results.metadata?.product,
                  audience: results.metadata?.audience,
                  tone: results.metadata?.tone,
                  platform: results.metadata?.platform,
                }}
              />
            </>
          )}
          {results.type === "video" && (results.metadata?.videoUrl || videoUrl) && (
            <button
              onClick={handleDownloadVideo}
              className="flex items-center gap-2 px-4 py-2 bg-dark-muted border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download Video
            </button>
          )}
        </div>
      </div>

      {results.type === "text" ? (
        <div className="bg-dark-muted border border-white/10 rounded-xl p-6">
          <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-300">
            {results.content}
          </pre>
        </div>
      ) : (
        <div className="bg-dark-muted border border-white/10 rounded-xl p-6">
          {(results.metadata?.videoUrl || videoUrl) ? (
            <video
              src={videoUrl || results.metadata?.videoUrl}
              controls
              className="w-full max-w-3xl mx-auto rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          ) : results.metadata?.jobId ? (
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                <div className="text-gray-300">
                  <p className="font-medium mb-2">🎬 Generating Your Custom Video Ad...</p>
                  <p className="text-sm text-gray-400 mb-3">
                    {videoStatus === "processing" 
                      ? "Creating your personalized ad based on your inputs. This may take 1-2 minutes..."
                      : videoStatus === "failed"
                      ? "Generation failed. Please try again."
                      : "Processing your request..."}
                  </p>
                  {videoStatus === "processing" && (
                    <div className="mt-4 space-y-2 text-xs text-gray-500">
                      <p>✓ Analyzing your product/service</p>
                      <p>✓ Applying your tone and style preferences</p>
                      <p>✓ Optimizing for your selected platform</p>
                      <p>⏳ Generating video content...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Video URL not available
            </div>
          )}
        </div>
      )}

      {results.metadata?.variations && results.metadata.variations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Variations</h3>
          <div className="space-y-3">
            {results.metadata.variations.map((variation, index) => (
              <div
                key={index}
                className="bg-dark-muted border border-white/10 rounded-lg p-4"
              >
                <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-300">
                  {variation}
                </pre>
              </div>
            ))}
          </div>
        </div>
        )}
    </motion.div>
  );
}
