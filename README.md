# Schrödinger's Cat - Science Exploration Platform

A content-first digital product science store built with Next.js, TypeScript, and Tailwind CSS. This platform focuses on free exploration of science, paradoxes, and daily curiosity, with products naturally embedded in the content.

## 🚀 Getting Started & Development Workflow

> **📚 NEW**: Complete 8-Agent Development Workflow now available!  
> Start here: [**WORKFLOW-INDEX.md**](WORKFLOW-INDEX.md)

**Quick Links**:
- ⚡ [Get Started](GET-STARTED.md) - First 4 hours
- 🤖 [8-Agent Workflow](agent-workflow.md) - Complete system
- ✅ [Implementation Checklist](IMPLEMENTATION-CHECKLIST.md) - Track progress
- 📊 [Roadmap](ROADMAP.md) - Timeline & milestones

**Ready to build?** Follow the workflow to systematically improve every aspect of the platform.

## 🎯 Philosophy

**95/5 Model**: 95% of visitors never buy (and that's perfect). The 5% who do are supporting something they already love—like Kurzgesagt or Wait But Why.

### Three-Layer Architecture:

1. **Layer 1: Free Exploration Hub** - Paradox library, daily curiosity, interactive tools
2. **Layer 2: Retention Mechanics** - Weekly puzzles, progress tracking, community
3. **Layer 3: Embedded Shop** - Products emerge naturally from content

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── paradoxes/         # Paradox library
│   ├── curiosity/         # Daily curiosity
│   ├── tools/             # Interactive tools
│   ├── puzzles/           # Weekly puzzles
│   ├── shop/              # Product shop
│   └── newsletter/        # Newsletter signup
├── components/            # React components
│   ├── Navigation.tsx     # Site navigation
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero section
│   ├── Layer1Section.tsx  # Free exploration hub
│   ├── Layer2Section.tsx  # Retention mechanics
│   ├── Layer3Section.tsx  # Embedded shop
│   └── NewsletterCTA.tsx  # Newsletter call-to-action
├── plan.md                # Project plan and strategy
└── package.json           # Dependencies
```

## 🎨 Features

- **Beautiful, modern UI** with Tailwind CSS
- **Framer Motion** animations for smooth interactions
- **Fully responsive** design for all devices
- **Content-first approach** with embedded shopping
- **TypeScript** for type safety
- **Next.js 14** with App Router

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons

## 📝 Current Status

**MVP is live and functional!** The following features are implemented:

- [x] Complete paradox library with detailed explainer (Schrödinger's Cat)
- [x] Daily curiosity content system (7 entries including Butterfly Effect, Fermi Paradox, Dark Matter, etc.)
- [x] Interactive science tools (Quantum Coin Flip simulator with statistics)
- [x] Weekly puzzle system (The Light Bulb Puzzle with hints and explanations)
- [x] Newsletter signup forms (UI ready)
- [x] Shop product catalog preview
- [x] Beautiful, modern UI with smooth animations
- [x] Fully responsive design
- [x] Progress and Community placeholder pages

**Next Steps:**

- [ ] Newsletter integration (backend email service)
- [ ] Payment processor integration (FanBasis/PayPal/Payoneer)
- [ ] Product detail pages with checkout flow
- [ ] User authentication and progress tracking
- [ ] Additional paradox explainers (Grandfather Paradox, Ship of Theseus)
- [ ] More interactive tools
- [ ] Community features

## 🌟 Key Principles

1. **No Pressure**: You're not begging people to buy; you're inviting them to support
2. **Better Retention**: Free daily value creates habit (email subscribers = real audience)
3. **Higher Trust**: Giving freely proves you're not just in it for money
4. **Sustainable**: Even with 0 sales, you're building something valuable

## 📄 License

This project is open source and available for personal use.

---

Built with curiosity and ❤️ in Tbilisi.

