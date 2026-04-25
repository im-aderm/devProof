---
name: DevProof Design Identity
colors:
  surface: '#13121b'
  surface-dim: '#13121b'
  surface-bright: '#393842'
  surface-container-lowest: '#0e0d16'
  surface-container-low: '#1b1b24'
  surface-container: '#1f1f28'
  surface-container-high: '#2a2933'
  surface-container-highest: '#35343e'
  on-surface: '#e4e1ee'
  on-surface-variant: '#c7c4d8'
  inverse-surface: '#e4e1ee'
  inverse-on-surface: '#302f39'
  outline: '#918fa1'
  outline-variant: '#464555'
  surface-tint: '#c3c0ff'
  primary: '#c3c0ff'
  on-primary: '#1d00a5'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#4d44e3'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#6f3dd9'
  on-tertiary-container: '#e3d5ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#13121b'
  on-background: '#e4e1ee'
  surface-variant: '#35343e'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
---

## Brand & Style

The brand personality for this design system is **Analytical, Elite, and Empowering**. It is designed to serve as a high-fidelity lens through which developer talent is viewed. The aesthetic targets a sophisticated audience of technical recruiters, engineering managers, and high-growth startups who value precision and clarity.

The visual style is **Modern/Minimalist** with a focus on "Software-as-a-Service" polish. It draws heavily from the technical elegance of modern developer tools, utilizing a "Dark UI First" mindset that translates seamlessly into a high-contrast light mode. The interface prioritizes data-dense layouts without sacrificing breathing room, ensuring that complex code metrics and portfolio pieces are presented with editorial quality.

## Colors

The palette is built on a foundation of high-contrast neutrals to ensure code snippets and data visualizations remain the focal point.

- **Primary Indigo (#4F46E5):** Used for primary actions, active states, and brand-critical touchpoints.
- **Accent Emerald (#10B981):** Representing growth, "green streaks" in contribution graphs, and successful deployments.
- **Accent Purple (#8B5CF6):** Reserved for premium features, AI-driven analysis, and specialized technical certifications.
- **Neutral System:** In dark mode, use a deep obsidian (#0A0A0B) for backgrounds with a slightly elevated charcoal (#171719) for cards. Light mode utilizes a crisp white (#FFFFFF) with cool gray (#F3F4F6) secondary surfaces.

## Typography

This design system utilizes **Inter** for all interface elements to maintain a systematic, utilitarian, and highly readable environment. 

Headings are set with tight letter-spacing and bold weights to create a commanding hierarchy, reminiscent of high-end technical documentation. Body text favors a generous line-height to ensure long-form project descriptions remain accessible. A specialized "label-bold" style is used for technical metadata and badges, ensuring small-scale text remains legible through uppercase styling and increased tracking.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for primary content containers, ensuring that data visualizations maintain their intended aspect ratios across wide displays. 

A 12-column grid is used for the main portfolio view, allowing for a mix of wide "Featured Project" cards (spanning 8 or 12 columns) and narrow "Metric" cards (spanning 3 or 4 columns). This design system employs an 8px linear scale for all padding and margins. Generous section gaps (80px+) are used to separate major profile components (e.g., separating the "Work History" from "Technical Analysis") to prevent cognitive overload.

## Elevation & Depth

Depth is achieved through a combination of **Tonal Layers** and **Ambient Shadows**. Instead of traditional heavy drop shadows, this design system uses 1px borders with low opacity (10-15%) that match the primary or neutral-accent colors.

- **Level 0 (Base):** The main background surface.
- **Level 1 (Cards):** Slightly elevated using a subtle background tint and a 4px blur shadow with 5% opacity.
- **Level 2 (Popovers/Modals):** Floating elements use a more pronounced 12px blur shadow and a semi-transparent backdrop blur (12px) to maintain context of the underlying data.
- **Interactive Depth:** Buttons and interactive cards use a "lift" effect on hover, where the shadow expands slightly and the border brightness increases.

## Shapes

The shape language is defined by a **Rounded (Level 2)** approach. This softens the technical nature of the data, making the platform feel more approachable and modern.

- **Standard Cards:** 16px (rounded-xl) for container corners.
- **Buttons and Inputs:** 8px (rounded-md) to provide a crisp, clickable area.
- **Badges/Chips:** Full pill-shaped (999px) for skill tags to distinguish them from structural card elements.
- **Progress Bars:** 4px radius for the track and the indicator to maintain a streamlined appearance.

## Components

### Buttons
- **Primary:** Filled with a subtle vertical gradient (Indigo #4F46E5 to #4338CA). White text with a faint drop shadow.
- **Secondary (Outlined):** 1px border using the primary color with a transparent background that fills on hover.
- **Tertiary:** Ghost style with no border, becoming subtly gray/tinted on hover.

### Badges & Chips
- **Skill Badges:** Use a subtle background tint of the Indigo or Purple (10% opacity) with high-contrast text. For "Verified" skills, use the Accent Emerald with a small check icon.

### Cards
- **Project Cards:** Feature a large image area with a 16px radius, followed by a metadata section. Use "Glassmorphism" for overlays that appear on image hover.
- **Analysis Cards:** High-contrast background with bold "Display-XL" numbers for key metrics (e.g., "99th Percentile").

### Form Elements
- **Inputs:** Use a 1px border that glows (Indigo) on focus. Labels sit above the input in the "label-bold" style.
- **Progress Bars:** Multi-tone bars where the fill uses a gradient from Indigo to Purple to represent proficiency levels.

### Sophisticated Charts
- **Line/Area Charts:** Use the Accent Emerald for positive trends with a soft gradient fill beneath the line.
- **Radar Charts:** Used for skill-set mapping, employing the Tertiary Purple with 20% opacity for the fill area.