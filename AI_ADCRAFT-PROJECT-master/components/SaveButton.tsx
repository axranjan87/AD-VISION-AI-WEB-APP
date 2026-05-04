"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
  ad: {
    type: "text" | "video";
    content: string;
    metadata?: any;
    product?: string;
    audience?: string;
    tone?: string;
    platform?: string;
  };
}

export function SaveButton({ ad }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to save ads");
      router.push("/login");
      return;
    }

    const savedAds = JSON.parse(localStorage.getItem("savedAds") || "[]");
    const newAd = {
      id: Date.now().toString(),
      product: ad.product || ad.metadata?.product || "Generated Ad",
      audience: ad.audience || ad.metadata?.audience,
      tone: ad.tone || ad.metadata?.tone || "persuasive",
      platform: ad.platform || ad.metadata?.platform || "generic",
      type: ad.type,
      content: ad.content,
      metadata: ad.metadata,
      createdAt: Date.now(),
    };

    // Check if already saved
    const exists = savedAds.some((a: any) => 
      a.content === ad.content && a.type === ad.type
    );

    if (exists) {
      toast.info("This ad is already saved");
      return;
    }

    savedAds.unshift(newAd);
    localStorage.setItem("savedAds", JSON.stringify(savedAds.slice(0, 50)));
    setSaved(true);
    toast.success("Ad saved to dashboard!");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <button
      onClick={handleSave}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-900 font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
    >
      {saved ? (
        <>
          <Check className="w-4 h-4" />
          Saved!
        </>
      ) : (
        <>
          <Save className="w-4 h-4" />
          Save to Dashboard
        </>
      )}
    </button>
  );
}




