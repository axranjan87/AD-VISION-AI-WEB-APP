import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ads: defineTable({
    userId: v.string(),
    product: v.string(),
    audience: v.optional(v.string()),
    tone: v.string(),
    platform: v.string(),
    language: v.string(),
    length: v.string(),
    type: v.union(v.literal("text"), v.literal("video")),
    content: v.string(), // Generated ad copy or video URL
    metadata: v.optional(v.object({
      videoUrl: v.optional(v.string()),
      variations: v.optional(v.array(v.string())),
      generatedAt: v.number(),
    })),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_created", ["createdAt"]),

  templates: defineTable({
    name: v.string(),
    description: v.string(),
    product: v.string(),
    audience: v.string(),
    tone: v.string(),
    platform: v.string(),
    language: v.string(),
    isPublic: v.boolean(),
    createdBy: v.string(),
    usageCount: v.number(),
    createdAt: v.number(),
  })
    .index("by_public", ["isPublic"])
    .index("by_creator", ["createdBy"]),

  subscriptions: defineTable({
    userId: v.string(),
    plan: v.union(v.literal("free"), v.literal("pro"), v.literal("ultra")),
    status: v.union(v.literal("active"), v.literal("cancelled"), v.literal("expired")),
    billingCycle: v.optional(v.union(v.literal("monthly"), v.literal("yearly"))),
    price: v.number(),
    startDate: v.number(),
    expiresAt: v.optional(v.number()),
    paymentMethod: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),
});
