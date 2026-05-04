"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Video, Trash2, Eye, Download, Calendar, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

interface SavedAd {
  id: string;
  product: string;
  audience?: string;
  tone: string;
  platform: string;
  type: "text" | "video";
  content: string;
  metadata?: {
    videoUrl?: string;
    variations?: string[];
  };
  createdAt: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [savedAds, setSavedAds] = useState<SavedAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [filter, setFilter] = useState<"all" | "text" | "video">("all");

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));

    // Load saved ads
    loadSavedAds();
  }, [router]);

  const loadSavedAds = () => {
    const ads = JSON.parse(localStorage.getItem("savedAds") || "[]");
    setSavedAds(ads);
    setIsLoading(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      const updatedAds = savedAds.filter((ad) => ad.id !== id);
      localStorage.setItem("savedAds", JSON.stringify(updatedAds));
      setSavedAds(updatedAds);
      toast.success("Ad deleted successfully");
    }
  };

  const handleView = (ad: SavedAd) => {
    // Store ad in session to view it
    sessionStorage.setItem("viewingAd", JSON.stringify(ad));
    router.push(`/dashboard/view/${ad.id}`);
  };

  const handleDownload = (ad: SavedAd) => {
    if (ad.type === "text") {
      const blob = new Blob([ad.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ad-${ad.product.replace(/\s+/g, "-")}-${ad.id}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Ad downloaded!");
    } else if (ad.metadata?.videoUrl) {
      window.open(ad.metadata.videoUrl, "_blank");
      toast.success("Opening video...");
    }
  };

  const filteredAds = filter === "all" 
    ? savedAds 
    : savedAds.filter((ad) => ad.type === filter);

  const stats = {
    total: savedAds.length,
    text: savedAds.filter((ad) => ad.type === "text").length,
    video: savedAds.filter((ad) => ad.type === "video").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-400">Manage your generated ads</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Ads</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Text Ads</p>
                <p className="text-3xl font-bold">{stats.text}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Video Ads</p>
                <p className="text-3xl font-bold">{stats.video}</p>
              </div>
              <Video className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "all"
                ? "bg-primary text-primary-900 font-semibold"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter("text")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "text"
                ? "bg-primary text-primary-900 font-semibold"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Text ({stats.text})
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "video"
                ? "bg-primary text-primary-900 font-semibold"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Video ({stats.video})
          </button>
        </div>

        {/* Ads List */}
        {filteredAds.length === 0 ? (
          <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-12 text-center">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No ads yet</h3>
            <p className="text-gray-400 mb-6">Start creating amazing ads to see them here</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-primary-900 font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Your First Ad
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {ad.type === "video" ? (
                      <Video className="w-5 h-5 text-primary" />
                    ) : (
                      <FileText className="w-5 h-5 text-primary" />
                    )}
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded capitalize">
                      {ad.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(ad.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{ad.product}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {ad.type === "text" ? ad.content.substring(0, 100) + "..." : "Video ad"}
                </p>

                <div className="space-y-2 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Platform:</span>
                    <span>{ad.platform}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Tone:</span>
                    <span className="capitalize">{ad.tone}</span>
                  </div>
                  {ad.audience && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Audience:</span>
                      <span className="line-clamp-1">{ad.audience}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(ad)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(ad)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}




