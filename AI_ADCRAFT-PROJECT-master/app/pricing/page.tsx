"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  Video,
  FileText,
  Zap,
  Crown,
  Rocket,
  CreditCard,
  Shield,
  ArrowRight,
  Star,
  Users,
  BarChart3,
  Globe,
  Infinity,
  Calendar,
  Mail,
} from "lucide-react";
import { ThreeDCard } from "@/components/ThreeDCard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type PlanType = "free" | "pro" | "ultra";

interface Plan {
  id: PlanType;
  name: string;
  price: number;
  priceYearly: number;
  description: string;
  icon: any;
  features: {
    included: string[];
    excluded?: string[];
  };
  color: string;
  gradient: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceYearly: 0,
    description: "Perfect for trying out Ad-Vision AI",
    icon: Sparkles,
    color: "text-gray-400",
    gradient: "from-gray-500/20 to-slate-500/20",
    features: {
      included: [
        "10 Text ads per month",
        "2 Video ads per month",
        "Basic templates",
        "English language only",
        "Standard support",
        "1 Platform export",
        "Basic analytics",
      ],
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    priceYearly: 290,
    description: "For professionals and growing businesses",
    icon: Zap,
    color: "text-primary",
    gradient: "from-primary/20 to-emerald-500/20",
    popular: true,
    features: {
      included: [
        "Unlimited Text ads",
        "50 Video ads per month",
        "All premium templates",
        "40+ Languages",
        "Priority support",
        "Multi-platform export",
        "Advanced analytics",
        "A/B testing",
        "Custom branding",
        "API access",
        "Team collaboration (up to 5)",
        "Cloud storage (50GB)",
      ],
    },
  },
  {
    id: "ultra",
    name: "Ultra",
    price: 99,
    priceYearly: 990,
    description: "For agencies and large teams",
    icon: Crown,
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 via-orange-500/20 to-amber-500/20",
    features: {
      included: [
        "Unlimited everything",
        "Unlimited Video ads",
        "All premium templates + custom",
        "40+ Languages + custom",
        "24/7 Priority support",
        "All platform exports",
        "Enterprise analytics",
        "Advanced A/B testing",
        "White-label branding",
        "Full API access",
        "Unlimited team members",
        "Unlimited cloud storage",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "Training & onboarding",
      ],
    },
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (planId: PlanType) => {
    if (planId === "free") {
      // Free plan - no payment needed
      const userData = localStorage.getItem("user");
      if (!userData) {
        toast.error("Please login first");
        router.push("/login");
        return;
      }
      
      const user = JSON.parse(userData);
      const subscription = {
        plan: "free",
        status: "active",
        startDate: new Date().toISOString(),
        expiresAt: null,
      };
      
      localStorage.setItem("subscription", JSON.stringify(subscription));
      toast.success("Free plan activated!");
      router.push("/dashboard");
      return;
    }

    setSelectedPlan(planId);
  };

  const handlePayment = async (planId: PlanType) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.error("Please login first");
      router.push("/login");
      setIsProcessing(false);
      return;
    }

    const user = JSON.parse(userData);
    const plan = plans.find((p) => p.id === planId);
    const price = billingCycle === "yearly" ? plan?.priceYearly : plan?.price;
    
    // Save subscription (in production, this would be handled by payment gateway)
    const subscription = {
      plan: planId,
      status: "active",
      billingCycle,
      price,
      startDate: new Date().toISOString(),
      expiresAt: billingCycle === "yearly" 
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    localStorage.setItem("subscription", JSON.stringify(subscription));
    
    toast.success(`${plan?.name} plan activated successfully!`);
    setSelectedPlan(null);
    setIsProcessing(false);
    router.push("/dashboard");
  };

  const savings = (plan: Plan) => {
    if (billingCycle === "yearly" && plan.price > 0) {
      return Math.round(((plan.price * 12 - plan.priceYearly) / (plan.price * 12)) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-primary text-sm font-semibold mb-6"
          >
            <Star className="w-4 h-4 fill-primary" />
            <span>Choose Your Plan</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text">Simple, Transparent</span>
            <br />
            <span className="text-white">Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Start free, upgrade as you grow. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${billingCycle === "monthly" ? "text-white font-semibold" : "text-gray-400"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-primary" : "bg-gray-600"
              }`}
            >
              <motion.div
                animate={{ x: billingCycle === "yearly" ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </button>
            <span className={`text-sm ${billingCycle === "yearly" ? "text-white font-semibold" : "text-gray-400"}`}>
              Yearly
              <span className="ml-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                Save up to 17%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = billingCycle === "yearly" ? plan.priceYearly : plan.price;
            const pricePerMonth = billingCycle === "yearly" ? Math.round(plan.priceYearly / 12) : plan.price;
            
            return (
              <ThreeDCard key={plan.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative h-full bg-gradient-to-br ${plan.gradient} border-2 rounded-2xl p-8 ${
                    plan.popular
                      ? "border-primary shadow-2xl shadow-primary/20 scale-105"
                      : "border-white/10"
                  } flex flex-col`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-primary to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${plan.color} bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      {price === 0 ? (
                        <div className="text-4xl font-bold text-white">Free</div>
                      ) : (
                        <>
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="text-5xl font-extrabold text-white">${pricePerMonth}</span>
                            <span className="text-gray-400">/month</span>
                          </div>
                          {billingCycle === "yearly" && (
                            <div className="text-sm text-gray-400 mt-1">
                              Billed ${price}/year
                              {savings(plan) > 0 && (
                                <span className="ml-2 text-primary font-semibold">
                                  Save {savings(plan)}%
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 space-y-3 mb-8">
                    {plan.features.included.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200 text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.features.excluded?.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-400 text-sm line-through">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-emerald-500 text-white shadow-lg shadow-primary/30"
                        : plan.id === "free"
                        ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {plan.id === "free" ? "Get Started Free" : "Choose Plan"}
                  </button>
                </motion.div>
              </ThreeDCard>
            );
          })}
        </div>

        {/* Payment Modal */}
        {selectedPlan && selectedPlan !== "free" && (
          <PaymentModal
            plan={plans.find((p) => p.id === selectedPlan)!}
            billingCycle={billingCycle}
            onClose={() => setSelectedPlan(null)}
            onPayment={() => handlePayment(selectedPlan)}
            isProcessing={isProcessing}
          />
        )}

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I change plans later?",
                a: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and PayPal. Enterprise plans also support bank transfers.",
              },
              {
                q: "Is there a free trial for paid plans?",
                a: "Yes! All paid plans come with a 14-day free trial. No credit card required to start.",
              },
              {
                q: "What happens if I exceed my plan limits?",
                a: "You'll be notified when approaching limits. You can upgrade anytime or purchase additional credits.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <ThreeDCard>
            <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border border-primary/30 rounded-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Still have questions?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Our team is here to help you choose the perfect plan for your needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-4 bg-primary text-primary-900 font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Sales
                </Link>
                <Link
                  href="/features"
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                >
                  View Features
                </Link>
              </div>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </div>
  );
}

// Payment Modal Component
function PaymentModal({
  plan,
  billingCycle,
  onClose,
  onPayment,
  isProcessing,
}: {
  plan: Plan;
  billingCycle: "monthly" | "yearly";
  onClose: () => void;
  onPayment: () => void;
  isProcessing: boolean;
}) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const price = billingCycle === "yearly" ? plan.priceYearly : plan.price;
  const pricePerMonth = billingCycle === "yearly" ? Math.round(plan.priceYearly / 12) : plan.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        toast.error("Please fill all card details");
        return;
      }
    }
    onPayment();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark-card border border-white/20 rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plan Summary */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300">{plan.name} Plan</span>
            <span className="text-white font-semibold">
              ${pricePerMonth}/month
            </span>
          </div>
          <div className="text-sm text-gray-400">
            {billingCycle === "yearly" ? `Billed $${price} annually` : "Billed monthly"}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="text-sm text-gray-400 mb-3 block">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`p-4 rounded-lg border-2 transition-all ${
                paymentMethod === "card"
                  ? "border-primary bg-primary/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-2 text-white" />
              <span className="text-sm text-white">Credit Card</span>
            </button>
            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`p-4 rounded-lg border-2 transition-all ${
                paymentMethod === "paypal"
                  ? "border-primary bg-primary/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <Shield className="w-6 h-6 mx-auto mb-2 text-white" />
              <span className="text-sm text-white">PayPal</span>
            </button>
          </div>
        </div>

        {/* Card Form */}
        {paymentMethod === "card" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                maxLength={19}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                  maxLength={3}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400 pt-2">
              <Shield className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-primary to-emerald-500 text-white font-bold rounded-lg hover:from-primary/90 hover:to-emerald-500/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Payment ${price}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* PayPal Option */}
        {paymentMethod === "paypal" && (
          <div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-300 text-center">
                You will be redirected to PayPal to complete your payment
              </p>
            </div>
            <button
              onClick={onPayment}
              disabled={isProcessing}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Processing...
                </>
              ) : (
                <>
                  Pay with PayPal ${price}
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
