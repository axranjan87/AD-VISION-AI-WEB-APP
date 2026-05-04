import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a generated ad
export const saveAd = mutation({
  args: {
    userId: v.string(),
    product: v.string(),
    audience: v.optional(v.string()),
    tone: v.string(),
    platform: v.string(),
    language: v.string(),
    length: v.string(),
    type: v.union(v.literal("text"), v.literal("video")),
    content: v.string(),
    metadata: v.optional(v.object({
      videoUrl: v.optional(v.string()),
      variations: v.optional(v.array(v.string())),
      generatedAt: v.optional(v.number()),
    })),
  },
  handler: async (ctx, args) => {
    const adId = await ctx.db.insert("ads", {
      ...args,
      createdAt: Date.now(),
    });
    return adId;
  },
});

// Get ads for a user
export const getUserAds = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const ads = await ctx.db
      .query("ads")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
    return ads;
  },
});

// Get a specific ad
export const getAd = query({
  args: { adId: v.id("ads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.adId);
  },
});

// Delete an ad
export const deleteAd = mutation({
  args: { adId: v.id("ads") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.adId);
  },
});
