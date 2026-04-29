# 🚀 DevProof: Next Features & Roadmap

This document outlines the planned improvements and upcoming features for the DevProof platform based on the technical audit conducted on April 29, 2026.

## 🛠️ Phase 1: Technical Stabilization (High Priority)

### 1. Robust Rate Limiting & Caching
- **Goal**: Ensure the application remains stable even if Redis is unavailable.
- **Action**: Implement an in-memory fallback for `lib/cache.ts` and `lib/rate-limit.ts`.
- **Target**: `src/lib/cache.ts`, `src/lib/rate-limit.ts`.

### 2. AI Output Reliability
- **Goal**: Prevent JSON parsing errors from AI responses.
- **Action**: Implement Zod schema validation for AI JSON responses and improve prompt engineering for "JSON-only" mode.
- **Target**: `src/lib/ai.ts`, `src/app/api/review/route.ts`.

## 📈 Phase 2: Feature Completion

### 1. Advanced AI Code Review
- **Goal**: Move beyond structural analysis to actual code quality analysis.
- **Action**: Implement a logic to fetch the top 3-5 most complex files (based on size/extension) and provide specific architectural feedback on those files.
- **Target**: `src/app/api/review/[owner]/[repo]/route.ts`.

### 2. Historical Growth Analytics
- **Goal**: Visualize developer growth over time.
- **Action**: Create a "Growth" tab in the Dashboard using the `Snapshot` model data to display charts for Star growth, follower trends, and language evolution.
- **Target**: `src/app/dashboard/growth/page.tsx`.

### 3. Resume Customization (Themes)
- **Goal**: Offer multiple professional resume styles.
- **Action**: Implement "Classic", "Minimal", and "Executive" themes in the Resume Builder.
- **Target**: `src/app/resume/page.tsx`, `src/components/resume/templates/`.

## ✨ Phase 3: New Feature Implementation

### 1. Verification Center (Trust Protocol)
- **Goal**: Allow users to verify their identity and work history.
- **Action**: Create a UI flow to handle `VerificationSignal` submissions (LinkedIn sync, email verification, etc.).
- **Target**: `src/app/verify/page.tsx`.

### 2. Native Export Engine
- **Goal**: Generate high-quality documents without relying on browser printing.
- **Action**: Integrate `jspdf` or a server-side Puppeteer instance to export Resumes as PDF, JSON, and DOCX.
- **Target**: `src/app/api/resume/export/route.ts`.

### 3. Private Repository Access
- **Goal**: Allow users to analyze their private work.
- **Action**: Update the GitHub OAuth scope to include `repo` access and update the `GitHubService` to handle authenticated private repo requests.
- **Target**: `src/lib/auth.ts`, `src/lib/github.ts`.

---

## 📝 Contribution Guide
When implementing these features, ensure:
1. **Glassmorphism UI**: Maintain the premium dark-mode aesthetic.
2. **Type Safety**: Use Prisma generated types and custom interfaces in `src/types`.
3. **Caching**: Always implement caching for expensive AI or GitHub API calls.
