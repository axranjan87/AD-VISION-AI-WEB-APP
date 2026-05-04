# Ad-Vision AI - Quick Start Guide

## Step-by-Step Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Convex (First Time Only)

Run this command and follow the prompts:
```bash
npx convex dev
```

This will:
- Create a Convex account (if needed)
- Create a new project
- Generate your deployment URL
- Start the Convex dev server

**Copy the deployment URL** (e.g., `https://xxx.convex.cloud`)

### 3. Create Environment File

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-url.convex.cloud
AKOOL_API_KEY=your_akool_key
```

**Get API Keys:**
- **Akool AI**: [akool.com](https://akool.com) → Sign up → Get API key
- **OpenAI** (optional): [platform.openai.com](https://platform.openai.com) → API Keys

### 4. Run the Project

**Open TWO terminal windows:**

**Terminal 1:**
```bash
npm run convex:dev
```
Keep this running!

**Terminal 2:**
```bash
npm run dev
```

### 5. Open Browser

Visit: **http://localhost:3000**

## That's It! 🎉

You can now:
- Generate text ads
- Generate video ads
- Copy/download results

## Troubleshooting

**"Convex URL not found"**
→ Make sure Terminal 1 (`convex:dev`) is running

**"API key error"**
→ Check your `.env.local` file has the correct keys
→ Restart Terminal 2 after adding keys

**Port 3000 already in use**
→ Next.js will automatically use port 3001

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Customize the ad generation prompts in `app/api/generate-text/route.ts`
- Explore Convex dashboard at [dashboard.convex.dev](https://dashboard.convex.dev)

