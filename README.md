# DevProof

**DevProof** is an advanced developer portfolio and analytics platform designed to bridge the gap between technical expertise and professional visibility. By integrating directly with the GitHub ecosystem, DevProof provides developers with data-driven insights, verifiable credentials, and professional-grade resumes.

## 🚀 Key Features

- **Dynamic GitHub Analysis:** Deep-dive into repository metrics, language composition, and contribution patterns.
- **AI-Powered Summaries:** Intelligent generation of developer personas and summaries using state-of-the-art AI.
- **Verifiable Resumes:** Create modern, professional resumes with verification signals that prove your contributions to open-source projects.
- **Performance Scoring:** A proprietary scoring engine that evaluates project readiness, complexity, and technical depth.
- **Collaborative Insights:** Visualize your impact within organizations and across the developer community.
- **Public Profiles:** Shareable, visually stunning profiles that showcase your technical journey.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **API Integration:** [Octokit](https://github.com/octokit/octokit.js) (GitHub API)
- **AI Engine:** [Google Generative AI](https://ai.google.dev/) / [OpenAI](https://openai.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS)
- A PostgreSQL database instance
- GitHub OAuth Application credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/devproof.git
   cd devproof
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your `DATABASE_URL`, `NEXTAUTH_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, and AI API keys.

4. **Database Migration:**
   ```bash
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🏗️ Deployment

DevProof is optimized for deployment on the [Vercel](https://vercel.com) platform. Ensure all environment variables are correctly configured in your deployment settings.

```bash
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (if applicable).

---

Built with ❤️ for the developer community.
