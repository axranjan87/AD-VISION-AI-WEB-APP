"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  HelpCircle,
  BookOpen,
  Video,
  FileText,
  Settings,
  Mail,
  Phone,
  Clock,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickActions = [
  { icon: HelpCircle, text: "How to use?", action: "help" },
  { icon: FileText, text: "Text Ads", action: "text_ads" },
  { icon: Video, text: "Video Ads", action: "video_ads" },
  { icon: Settings, text: "Setup Guide", action: "setup" },
];

const faqResponses: { [key: string]: string } = {
  help: "To get started:\n1. Click 'Generate Ads' on the home page\n2. Fill in your product/service details\n3. Choose tone, platform, and language\n4. Click 'Generate' and get instant results!\n\nNeed more help? Type your question!",
  text_ads: "Text Ads feature lets you:\n• Generate multiple ad variations\n• Customize tone (Persuasive, Friendly, Professional, etc.)\n• Support for 40+ languages\n• Optimized for different platforms\n\nTry it now from the home page!",
  video_ads: "Video Ads feature:\n• AI-powered video generation\n• Professional quality outputs\n• Multiple style options\n• Platform-specific optimization\n\nNote: Video generation takes 1-2 minutes. Start from the home page!",
  setup: "Setup Instructions:\n1. Install dependencies: npm install\n2. Set up Convex: npx convex dev\n3. Create .env.local with:\n   - NEXT_PUBLIC_CONVEX_URL\n   - AKOOL_API_KEY\n4. Run: npm run dev\n\nCheck QUICKSTART.md for details!",
  default: "I'm here to help! You can ask me about:\n• How to generate ads\n• Text vs Video ads\n• Setting up the app\n• Troubleshooting issues\n• Features and capabilities\n\nType your question or use the quick actions above!",
};

export function HelpChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm your 24/7 AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // FAQ matching
    if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
      return faqResponses.help;
    }
    if (lowerMessage.includes("text ad") || lowerMessage.includes("copy")) {
      return faqResponses.text_ads;
    }
    if (lowerMessage.includes("video") || lowerMessage.includes("visual")) {
      return faqResponses.video_ads;
    }
    if (lowerMessage.includes("setup") || lowerMessage.includes("install") || lowerMessage.includes("configure")) {
      return faqResponses.setup;
    }
    if (lowerMessage.includes("error") || lowerMessage.includes("problem") || lowerMessage.includes("issue")) {
      return "I can help troubleshoot! Common issues:\n\n• 'Convex URL not found' → Run 'npm run convex:dev' in Terminal 1\n• 'API key error' → Check your .env.local file\n• Video generation fails → Verify Akool API key and credits\n\nWhat specific error are you seeing?";
    }
    if (lowerMessage.includes("feature") || lowerMessage.includes("what can")) {
      return "Ad-Vision AI features:\n\n✅ AI-powered text ad generation\n✅ Professional video ad creation\n✅ 40+ language support\n✅ Multi-platform optimization\n✅ Customizable tones and styles\n✅ Analytics dashboard\n✅ Secure cloud storage\n✅ 24/7 support\n\nWhich feature would you like to know more about?";
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("support") || lowerMessage.includes("email")) {
      return "For support, you can:\n\n📧 Email: support@advision.ai\n📞 Phone: Available in dashboard\n💬 Live Chat: Right here, 24/7!\n📚 Docs: Check /features page\n\nI'm available anytime to help!";
    }
    if (lowerMessage.includes("pricing") || lowerMessage.includes("cost") || lowerMessage.includes("free")) {
      return "Ad-Vision AI offers:\n\n🆓 Free tier available\n💎 Premium features\n📊 Usage-based pricing\n🎁 Starter credits included\n\nCheck the dashboard for your current plan and usage!";
    }

    // Default response
    return faqResponses.default;
  };

  const handleQuickAction = (action: string) => {
    const response = faqResponses[action] || faqResponses.default;
    handleSendMessage(action, response);
  };

  const handleSendMessage = (text?: string, botResponse?: string) => {
    const userText = text || inputValue.trim();
    if (!userText && !botResponse) return;

    if (userText) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: userText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);
    }

    setTimeout(() => {
      setIsTyping(false);
      const responseText = botResponse || generateBotResponse(userText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary via-emerald-500 to-primary text-white rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center hover:scale-110 transition-transform group"
            aria-label="Open help chat"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-dark-bg animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: isMinimized ? 0 : 0,
              scale: 1,
              height: isMinimized ? "auto" : "600px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-dark-card border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col glass"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 via-emerald-500/20 to-primary/20 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/30 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    Help Assistant
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      24/7 Online
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400">We're here to help!</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  <Minimize2 className="w-4 h-4 text-gray-300" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick Actions */}
                <div className="p-4 border-b border-white/10 bg-white/5">
                  <p className="text-xs text-gray-400 mb-2">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(action.action)}
                          className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 rounded-lg text-xs text-gray-300 hover:text-white transition-colors"
                        >
                          <Icon className="w-3 h-3" />
                          <span>{action.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-dark-card to-dark-bg/50">
                  {messages.map((message) => {
                    const Icon = message.sender === "user" ? User : Bot;
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-900"
                              : "bg-primary/20 text-primary"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div
                          className={`flex-1 max-w-[80%] ${
                            message.sender === "user" ? "text-right" : ""
                          }`}
                        >
                          <div
                            className={`inline-block p-3 rounded-2xl ${
                              message.sender === "user"
                                ? "bg-primary/20 text-white rounded-br-none"
                                : "bg-white/10 text-gray-200 rounded-bl-none"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white/10 text-gray-200 p-3 rounded-2xl rounded-bl-none">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-white/5">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your question..."
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() && !isTyping}
                      className="px-4 py-2 bg-primary text-primary-900 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Send message"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    💡 Try: "How do I generate ads?" or use quick actions above
                  </p>
                </div>
              </>
            )}

            {isMinimized && (
              <div className="p-4 text-center text-sm text-gray-400">
                Click to expand
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
