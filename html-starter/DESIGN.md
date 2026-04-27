---
name: DevProof Design System
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8e5'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#f0ecf9'
  surface-container-high: '#eae6f4'
  surface-container-highest: '#e4e1ee'
  on-surface: '#1b1b24'
  on-surface-variant: '#464555'
  inverse-surface: '#302f39'
  inverse-on-surface: '#f3effc'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#F43F5E'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#fcf8ff'
  on-background: '#1b1b24'
  surface-variant: '#e4e1ee'
  success: '#10B981'
  warning: '#F59E0B'
  light-bg: '#F8FAFC'
  light-surface: '#FFFFFF'
  light-border: '#E5E7EB'
  light-text-primary: '#0F172A'
  light-text-secondary: '#64748B'
  dark-bg: '#0B1120'
  dark-surface: '#111827'
  dark-card: '#1E293B'
  dark-border: '#334155'
  dark-text-primary: '#F8FAFC'
  dark-text-secondary: '#CBD5E1'
typography:
  hero-title:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  h4:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.5'
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  small:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1440px
  content-max: 1280px
---

# DevProof UI Design System & Product UX Guide
Version 1.0

---

# Overview

DevProof is a premium AI-powered SaaS platform that transforms GitHub profiles into professional proof-of-skill assets:

- Developer strength reports
- Public portfolios
- Fellowship readiness analysis
- Resume generation
- Repository quality insights
- Career growth recommendations

This document defines the complete UI/UX design direction, visual system, component behavior, page layouts, and product experience.

---

# Product Positioning

DevProof should feel like:

- A funded startup product
- Premium and trustworthy
- Built for developers
- Smart and modern
- Clean and efficient
- Data-rich but uncluttered

---

# Design Goals

1. Build trust immediately
2. Make analytics feel valuable
3. Convert visitors to users quickly
4. Reduce onboarding friction
5. Present technical data beautifully
6. Make users proud to share their profile
7. Feel elite enough for recruiters and MLH reviewers

---

# Brand Personality

- Intelligent
- Technical
- Professional
- Minimal
- Fast
- Credible
- Global
- Ambitious

---

# Target Users

## Primary Users

### Developers
Want to showcase skills and improve careers.

### Students
Need internship/fellowship proof.

### Job Seekers
Need better portfolio/resume assets.

### Self-Taught Engineers
Need credible validation.

---

## Secondary Users

### Recruiters
Need fast candidate insights.

### Hiring Managers
Need quality signals.

### Fellowship Reviewers
Need project readiness evidence.

---

# Visual Language

## General Direction

Blend of:

- Linear
- Vercel
- Stripe
- Notion
- Framer

Use strong whitespace, clean geometry, subtle shadows, modern typography.

---

# Color System

## Light Theme

### Primary

Indigo  
#4F46E5

### Accent

Cyan  
#06B6D4

### Success

Emerald  
#10B981

### Warning

Amber  
#F59E0B

### Error

Rose  
#F43F5E

### Background

#F8FAFC

### Surface

#FFFFFF

### Border

#E5E7EB

### Text Primary

#0F172A

### Text Secondary

#64748B

---

## Dark Theme

### Background

#0B1120

### Surface

#111827

### Card

#1E293B

### Border

#334155

### Text Primary

#F8FAFC

### Text Secondary

#CBD5E1

---

# Typography

## Font Choices

Primary:

- Inter

Alternatives:

- Geist
- Satoshi

---

## Type Scale

### Hero Title

56px  
Bold

### H1

40px  
Bold

### H2

32px  
Semibold

### H3

24px  
Semibold

### H4

20px  
Medium

### Body

16px  
Regular

### Small

14px

### Caption

12px

---

# Spacing System

Use 8px base grid:

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64
- 80
- 96

---

# Border Radius

Buttons: 14px  
Cards: 20px  
Inputs: 14px  
Modals: 24px  
Chips: 999px

---

# Shadows

## Card

0 8px 24px rgba(15,23,42,0.08)

## Hover

0 12px 32px rgba(15,23,42,0.12)

## Modal

0 24px 60px rgba(15,23,42,0.18)

---

# Layout Grid

## Desktop

12-column grid  
Max width: 1440px  
Content width: 1280px

## Tablet

8-column grid

## Mobile

4-column grid

---

# Core Components

---

# Buttons

## Primary

Gradient fill  
Indigo → Cyan

States:

- Default
- Hover
- Pressed
- Disabled
- Loading

Label examples:

- Analyze Profile
- Generate Resume
- Connect GitHub

---

## Secondary

Outline button

---

## Ghost

Transparent background

---

## Danger

Rose solid

---

# Inputs

## Standard Input

Used for:

- Email
- GitHub username
- Search

States:

- Default
- Focused
- Error
- Disabled

---

# Dropdowns

Rounded with search support.

---

# Cards

Used heavily across dashboard.

Must include:

- Header
- Content
- Optional footer

---

# Badges

Examples:

- Full Stack
- MLH Ready
- Verified Builder
- Open Source Active
- TypeScript Pro

---

# Tabs

Use for:

- Dashboard sections
- Repo details
- Resume templates

---

# Tables

Modern, clean rows.

Hover row state required.

---

# Charts

Use:

- Bar chart
- Line chart
- Pie chart
- Radar chart
- Circular progress

Animations subtle.

---

# Icons

Use consistent outline icon pack.

Recommended:

- Lucide
- Heroicons

---

# Navigation

---

# Sidebar (Desktop)

Items:

- Dashboard
- Repositories
- Portfolio
- Resume
- Readiness
- Compare
- Notifications
- Settings

Collapsed mode supported.

---

# Top Navbar

Contains:

- Search
- Theme toggle
- Notifications
- User avatar
- Workspace menu

---

# Mobile Navigation

Bottom nav preferred:

- Home
- Repos
- Portfolio
- Settings

---

# Page Designs

---

# 1. Landing Page

## Goal

Convert visitors.

---

## Sections

### Hero

Headline:

Turn Your GitHub Into Proof of Skill

Subheadline:

AI-powered reports, portfolios, and career insights.

CTAs:

- Analyze My GitHub
- View Demo

Hero visual:

Animated dashboard preview.

---

### Social Proof

Metrics:

- 10k+ developers analyzed
- 500+ resumes generated
- Used globally

---

### How It Works

3 steps:

1. Connect GitHub
2. AI scans projects
3. Get professional proof

---

### Feature Grid

6 cards:

- Strength Score
- Repo Scoring
- Resume Builder
- Portfolio Generator
- MLH Readiness
- Career Advice

---

### Testimonials

Use clean quote cards.

---

### Final CTA

Ready to unlock your developer potential?

---

# 2. Authentication

## Login

Fields:

- Email
- Password

Options:

- Continue with GitHub
- Forgot password

---

## Signup

Fields:

- Name
- Email
- Password
- GitHub username

---

# 3. Onboarding

## Step 1

Welcome screen

---

## Step 2

Connect GitHub

---

## Step 3

Select Goal

- Internship
- MLH Fellowship
- Job Search
- Improve Profile

---

## Step 4

Analysis Loading

Animated progress states:

- Reading repos
- Scoring profile
- Building portfolio

---

# 4. Dashboard

## Header

Avatar  
Name  
GitHub username

---

## KPI Cards

1. Developer Score
2. MLH Readiness
3. Top Stack
4. Weekly Growth

---

## Charts

### Commit Timeline

Line chart.

### Languages Breakdown

Pie chart.

### Repo Activity

Bar chart.

---

## AI Insights

Examples:

- Strong full-stack profile
- Improve documentation
- Add tests for stronger score

---

# 5. Repositories Page

## View Modes

- Table
- Cards

---

## Columns

- Repo Name
- Language
- Stars
- Last Updated
- Score
- Quality
- Actions

---

## Filters

- Language
- Active only
- Highest score
- Needs improvement

---

# 6. Repository Detail Page

## Header

Repo name  
GitHub link  
Live demo

---

## Sections

### Metrics

- Stars
- Forks
- Commits
- Contributors
- Last updated

---

### Tech Stack

Badges.

---

### AI Summary

Explain repo purpose.

---

### README Audit

Checklist:

- Setup guide
- Features listed
- Screenshots
- Good structure

---

### Suggestions

- Add tests
- Improve docs
- Refactor modules

---

# 7. Public Portfolio Page

URL format:

/u/username

---

## Layout

Hero section:

- Avatar
- Name
- Headline
- Skills
- Contact CTA

---

## Sections

### Featured Projects

Cards.

### Skills

Grouped tags.

### GitHub Stats

### Timeline

### Resume Download

---

# 8. Resume Builder

## Layout

Left: Form  
Right: Live preview

---

## Templates

- Modern
- ATS
- Minimal

---

## Export

PDF / Print

---

# 9. Readiness Page

## Large Score Circle

Overall score.

---

## Subscores

- Projects
- Consistency
- Collaboration
- Documentation
- Technical Breadth

---

## Recommendations

Checklist style.

---

# 10. Compare Developers

Inputs:

User A  
User B

---

## Comparison Cards

- Skill spread
- Repo quality
- Consistency
- Strength score

---

# 11. Notifications

Examples:

- Analysis complete
- Resume ready
- Weekly score improved

---

# 12. Settings

- Theme
- Public profile visibility
- Re-analyze profile
- Export data
- Delete account

---

# Empty States

Use encouraging copy.

Example:

No repositories found yet. Connect GitHub to begin.

---

# Loading States

Use skeleton loaders.

Never show blank screens.

---

# Error States

Friendly + actionable.

Example:

Could not fetch GitHub profile. Check username or try again.

---

# Motion Design

Use subtle animation only.

Examples:

- Card hover lift
- Number count-up
- Progress ring fill
- Page fade transition

Avoid over-animation.

---

# Accessibility

Must support:

- Keyboard navigation
- Focus states
- Contrast compliance
- Screen readers
- Reduced motion mode

---

# UX Principles

1. One clear CTA per screen
2. Show progress often
3. Reward users with scores
4. Keep actions simple
5. Make outputs shareable
6. Use human language

---

# Copy Tone

Use:

- Clear
- Confident
- Helpful
- Professional

Avoid robotic jargon.

---

# Example Microcopy

Your profile is stronger than 72% of similar developers.

Your documentation score improved this week.

One open-source contribution could raise your readiness score.

---

# Designer Deliverables

Must produce:

1. Landing page desktop + mobile
2. Auth screens
3. Dashboard
4. Repo page
5. Repo detail
6. Portfolio page
7. Resume builder
8. Readiness page
9. Compare page
10. Design system components

---

# Developer Handoff Requirements

Include:

- Auto layout
- Responsive constraints
- Color tokens
- Typography styles
- Component variants
- Spacing tokens

---

# Final Experience Standard

When users open DevProof, they should feel:

“This is premium, smart, and built for serious developers.”

---