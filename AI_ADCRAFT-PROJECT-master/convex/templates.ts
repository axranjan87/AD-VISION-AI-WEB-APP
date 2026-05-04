import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a template
export const saveTemplate = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    product: v.string(),
    audience: v.string(),
    tone: v.string(),
    platform: v.string(),
    language: v.string(),
    isPublic: v.boolean(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const templateId = await ctx.db.insert("templates", {
      ...args,
      usageCount: 0,
      createdAt: Date.now(),
    });
    return templateId;
  },
});

// Get public templates
export const getPublicTemplates = query({
  handler: async (ctx) => {
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_public", (q) => q.eq("isPublic", true))
      .order("desc")
      .collect();
    return templates;
  },
});

// Get user's templates
export const getUserTemplates = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_creator", (q) => q.eq("createdBy", args.userId))
      .order("desc")
      .collect();
    return templates;
  },
});

// Increment template usage
export const incrementTemplateUsage = mutation({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    if (template) {
      await ctx.db.patch(args.templateId, {
        usageCount: template.usageCount + 1,
      });
    }
  },
});
