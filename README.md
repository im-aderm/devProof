# DevProof

DevProof is a production-grade AI SaaS platform that transforms GitHub profiles into professional proof-of-skill assets. It analyzes developer activity to provide verified portfolios, AI-generated skill reports, and readiness scores for technical roles.

## Features

- **GitHub Data Engine**: Deep analysis of repositories, languages, and contribution metadata.
- **AI Analysis Layer**: LLM-powered developer personas and project summaries.
- **Developer Dashboard**: Real-time performance metrics and talent indexing.
- **Public Portfolio Generator**: Shareable, professional profiles for developers.
- **Resume Builder**: ATS-friendly and modern resume exports.
- **Readiness Engine**: Specialized scoring for MLH, internships, and job readiness.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **Backend**: Next.js Server Actions.
- **Database**: PostgreSQL with Prisma ORM.
- **AI**: OpenAI API.
- **Styling**: Vanilla CSS + Tailwind (Dark Mode First).

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- GitHub OAuth application credentials
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/devproof.git
   cd devproof
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy `.env.example` to `.env` and fill in your credentials.
   ```bash
   cp .env.example .env
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Development Progress

Development is organized into phased deliveries. Current progress:
- [x] Phase 0: Product Foundation
- [ ] Phase 1: Public Marketing Site
- [ ] Phase 2: Authentication & User Accounts
- ... (and more)

See `PHASE_X.md` files for detailed achievement logs for each phase.

## License

This project is licensed under the ISC License.
