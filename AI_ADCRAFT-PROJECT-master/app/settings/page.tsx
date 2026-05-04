"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import { ThreeDCard } from "@/components/ThreeDCard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: true,
    language: "en",
    timezone: "UTC",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));

    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    toast.success("Settings saved successfully!");
  };

  const settingSections = [
    {
      icon: User,
      title: "Profile",
      color: "text-blue-400",
      fields: [
        { label: "Name", value: user?.name || "Not set", editable: true },
        { label: "Email", value: user?.email || "Not set", editable: false },
      ],
    },
    {
      icon: Bell,
      title: "Notifications",
      color: "text-yellow-400",
      fields: [
        { label: "Push Notifications", type: "toggle", key: "notifications" },
        { label: "Email Updates", type: "toggle", key: "emailUpdates" },
      ],
    },
    {
      icon: Palette,
      title: "Appearance",
      color: "text-purple-400",
      fields: [
        { label: "Dark Mode", type: "toggle", key: "darkMode" },
      ],
    },
    {
      icon: Globe,
      title: "Language & Region",
      color: "text-green-400",
      fields: [
        {
          label: "Language",
          type: "select",
          key: "language",
          options: ["English", "Spanish", "French", "German", "Hindi"],
        },
        {
          label: "Timezone",
          type: "select",
          key: "timezone",
          options: ["UTC", "EST", "PST", "IST", "GMT"],
        },
      ],
    },
    {
      icon: Shield,
      title: "Security",
      color: "text-red-400",
      fields: [
        { label: "Password", value: "••••••••", editable: true, action: "Change" },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-primary text-sm font-semibold mb-6">
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="gradient-text">Account Settings</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Manage your account preferences and settings
          </p>
        </motion.div>

        <div className="space-y-6 mb-8">
          {settingSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <ThreeDCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className={`w-6 h-6 ${section.color}`} />
                    <h2 className="text-xl font-bold text-white">{section.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {section.fields.map((field, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div>
                          <label className="text-white font-medium">{field.label}</label>

                          {/* ✅ value safe */}
                          {"value" in field && field.value && (
                            <p className="text-gray-400 text-sm mt-1">{field.value}</p>
                          )}
                        </div>

                        {/* ✅ toggle safe */}
                        {"type" in field && field.type === "toggle" && (
                          <button
                            onClick={() =>
                              setSettings({ ...settings, [field.key!]: !settings[field.key as keyof typeof settings] })
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings[field.key as keyof typeof settings] ? "bg-primary" : "bg-gray-600"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                settings[field.key as keyof typeof settings] ? "translate-x-6" : ""
                              }`}
                            />
                          </button>
                        )}

                        {/* ✅ select safe */}
                        {"type" in field && field.type === "select" && (
                          <select
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) =>
                              setSettings({ ...settings, [field.key!]: e.target.value })
                            }
                            className="px-4 py-2 bg-dark-bg border border-white/10 rounded-lg text-white"
                          >
                            {"options" in field &&
                              field.options.map((opt) => (
                                <option key={opt} value={opt.toLowerCase()}>
                                  {opt}
                                </option>
                              ))}
                          </select>
                        )}

                        {/* ✅ action safe */}
                        {"action" in field && field.action && (
                          <button className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm font-semibold">
                            {field.action}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </ThreeDCard>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-8 py-4 bg-primary text-primary-900 font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
}