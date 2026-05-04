# Ad-Vision AI

Ad-Vision AI is an advanced web-based application designed to automate the creation of personalized advertisements using Artificial Intelligence. The project integrates Akool AI for content generation, React and Next.js for the frontend, and Convex for backend data management.

## Features

-  **AI-Powered Generation**: Generate customized ad copies and video ads using Akool AI
-  **Text Ads**: Create high-converting ad copy with multiple variations
-  **Video Ads**: Generate professional video advertisements
-  **Multi-Language Support**: Create ads in multiple languages
-  **Data Management**: Store and manage ads using Convex backend
-  **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
-  **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Convex (real-time database)
- **AI Services**: Akool AI (primary), OpenAI (fallback)
- **UI Libraries**: Lucide React, React Hot Toast

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Akool AI API key (get one at [akool.com](https://akool.com))
- Optional: OpenAI API key (for text generation fallback)
- Convex account (free tier available at [convex.dev](https://convex.dev))

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Convex

1. Create a Convex account at [convex.dev](https://convex.dev)
2. Install Convex CLI globally (if not already installed):
   ```bash
   npm install -g convex
   ```
3. Initialize Convex in your project:
   ```bash
   npx convex dev
   ```
   This will:
   - Create a new Convex project (or link to existing one)
   - Generate deployment URL
   - Start the Convex development server

4. Copy the deployment URL (it will look like `https://xxx.convex.cloud`)

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Convex Configuration (required)
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-url.convex.cloud

# Akool AI API Key (required for video generation, optional for text)
AKOOL_API_KEY=your_akool_api_key_here

# OpenAI API Key (optional - used as fallback for text generation)
OPENAI_API_KEY=your_openai_api_key_here
```

**Get API Keys:**
- **Akool AI**: Sign up at [akool.com](https://akool.com) and get your API key from the dashboard
- **OpenAI**: Get your API key from [platform.openai.com](https://platform.openai.com)

### 4. Run the Development Server

Open two terminal windows:

**Terminal 1 - Convex Development:**
```bash
npm run convex:dev
```
This keeps your Convex backend in sync with your schema.

**Terminal 2 - Next.js Development:**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Generating Text Ads

1. Click on **"Text Ads"** mode
2. Fill in the form:
   - **Product/Service**: Describe what you're advertising
   - **Target Audience**: Specify your target audience (optional)
   - **Tone**: Choose from Persuasive, Friendly, Professional, Witty, or Luxury
   - **Platform**: Select the advertising platform
   - **Language**: Enter the language for the ad
   - **Length**: Choose Short, Medium, or Long
3. Click **"Generate Ads"**
4. Copy the generated ad copy using the **"Copy All"** button

### Generating Video Ads

1. Click on **"Video Ads"** mode
2. Fill in the same form fields as text ads
3. Click **"Generate Ads"**
4. Wait for video generation (may take 1-2 minutes)
5. Download the generated video using the **"Download Video"** button

## Project Structure

```
advision/
├── app/
│   ├── api/
│   │   ├── generate-text/    # Text ad generation API route
│   │   └── generate-video/   # Video ad generation API route
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main page
│   └── globals.css           # Global styles
├── components/
│   ├── AdForm.tsx            # Ad generation form
│   ├── AdResults.tsx         # Results display component
│   ├── ConvexClientProvider.tsx  # Convex client provider
│   ├── Header.tsx            # Header component
│   └── ModeToggle.tsx        # Mode switcher
├── convex/
│   ├── schema.ts             # Database schema
│   ├── ads.ts                # Ad-related queries/mutations
│   └── templates.ts          # Template-related queries/mutations
├── public/                   # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run convex:dev` - Start Convex development server
- `npm run convex:deploy` - Deploy Convex backend

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy Convex

```bash
npm run convex:deploy
```

## Troubleshooting

### "NEXT_PUBLIC_CONVEX_URL is not defined"
- Make sure you've created `.env.local` with your Convex deployment URL
- Restart your development server after adding environment variables

### "No API key configured"
- Ensure you've added `AKOOL_API_KEY` or `OPENAI_API_KEY` to `.env.local`
- Restart the development server after adding API keys

### Video generation fails
- Check your Akool AI API key is valid
- Ensure you have sufficient credits in your Akool account
- Check the browser console and server logs for detailed error messages

### Convex connection issues
- Make sure `npm run convex:dev` is running
- Verify your `NEXT_PUBLIC_CONVEX_URL` is correct
- Check that your Convex project is properly initialized

## Notes

- API keys are stored server-side and never exposed to the client
- Video generation may take 1-2 minutes depending on complexity
- The app uses Akool AI as primary service, with OpenAI as fallback for text generation
- All generated ads are stored in Convex database for future reference

## License

MIT

## Support

For issues and questions:
- Check the [Akool AI Documentation](https://docs.akool.com)
- Visit [Convex Documentation](https://docs.convex.dev)
- Review [Next.js Documentation](https://nextjs.org/docs)
