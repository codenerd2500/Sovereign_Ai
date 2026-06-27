---
name: Sovereign Command
colors:
  surface: '#15121b'
  surface-dim: '#15121b'
  surface-bright: '#3b3742'
  surface-container-lowest: '#0f0d15'
  surface-container-low: '#1d1a23'
  surface-container: '#211e27'
  surface-container-high: '#2c2832'
  surface-container-highest: '#37333d'
  on-surface: '#e7e0ed'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e7e0ed'
  inverse-on-surface: '#322f39'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#bcc7de'
  on-tertiary: '#263143'
  tertiary-container: '#8691a7'
  on-tertiary-container: '#1f2a3c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#15121b'
  on-background: '#e7e0ed'
  surface-variant: '#37333d'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.05em
  data-readout:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1440px
---

## Brand & Style

The design system establishes a **Cyber-Industrial** aesthetic, blending high-performance computing visuals with a secure, sovereign architectural feel. It is designed to evoke a sense of total control, precision, and futuristic authority.

The UI leans heavily into **Glassmorphism** and **Minimalism**, using translucency and depth to organize complex data flows without overwhelming the operator. High-contrast accents provide immediate visual hierarchy, while the dark environment minimizes eye strain during long-duration "Agent Execution" monitoring. The emotional response should be one of immersion, reliability, and technical sophistication.

## Colors

The palette is anchored by **Deep Obsidian**, providing a void-like canvas that makes interactive elements "pop." 

- **Primary (Electric Violet):** Reserved for primary actions, active states, and core branding. It represents the "intelligence" of the system.
- **Secondary (Neon Cyan):** Used for status indicators, progress bars, and secondary data visualizations. It signals "system health" and "connectivity."
- **Neutrals (Slate Grays):** Employed for structural elements, borders, and inactive text to maintain a low-profile industrial feel.
- **Backgrounds:** Use subtle gradients of Obsidian to Slate for surface depth.

## Typography

This system utilizes a dual-font strategy to differentiate between human-centric interface controls and machine-centric data outputs.

- **Inter:** Chosen for its supreme legibility in dark modes. It handles all navigation, headers, and UI controls.
- **JetBrains Mono:** Used exclusively for "A2A Execution Logs," terminal readouts, and metadata labels. The monospace nature reinforces the industrial, code-based environment.

All typography should favor high contrast (White or light Slate) against the dark background. Letter spacing is slightly tightened for headlines to give a "dense" professional look, while labels are tracked out for clarity.

## Layout & Spacing

The layout follows a **Fluid Grid** model with high-density spacing. This is a "command center" environment where information density is a feature, not a bug.

- **Grid:** 12-column layout for desktop, 4-column for mobile.
- **Rhythm:** An 8px base unit is used for component sizing, but a tighter 4px unit is used for internal component padding to maintain a "technical" feel.
- **Margins:** Large outer margins (48px) on desktop create a "letterboxed" cinematic feel, focusing the operator's eye on the central console.
- **Responsive:** On mobile, glass cards stack vertically, and horizontal scrolling is permitted for data tables to maintain the integrity of "Execution Logs."

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Backdrop Blurs** rather than traditional heavy shadows.

- **Layer 0 (Background):** Solid #050505.
- **Layer 1 (Cards/Containers):** Semi-transparent Slate Grays (10-15% opacity) with a `20px` backdrop blur (Glassmorphism).
- **Layer 2 (Modals/Popovers):** Higher opacity fills with a subtle 1px border in a lighter Slate (#334155).
- **Accents:** Depth is further suggested by "Glow" effects. Primary buttons and active indicators use a soft `0px 0px 15px` outer glow in their respective accent colors (Violet or Cyan) to simulate light emission from a screen.

## Shapes

The shape language is "Soft-Industrial." While the aesthetic is futuristic, sharp corners are avoided to maintain a professional, modern software feel.

- **Base Radius:** 0.5rem (8px) for cards and input fields.
- **Large Radius:** 1rem (16px) for major dashboard sections.
- **Interactive Elements:** Buttons and tags use a consistent 8px radius.
- **Borders:** All containers must feature a 1px solid border. Use `rgba(255, 255, 255, 0.1)` for standard containers and `primary_color` at 30% opacity for focused or high-priority elements.

## Components

### Buttons
- **Primary:** Background #8B5CF6 with a slight inner glow. Text is white. On hover, the glow expands (box-shadow).
- **Secondary/Ghost:** 1px border of #1E293B, transparent background. Text is light gray.
- **System Actions:** High-contrast, sharp micro-interactions (0.1s transitions).

### Cards (Glassmorphism)
- Use a subtle gradient fill from top-left to bottom-right.
- Border: 1px solid #1E293B.
- Backdrop-filter: blur(12px).

### A2A Execution Logs
- Background: Solid #000000.
- Typography: JetBrains Mono (Data-readout).
- Scrolling: Custom scrollbars—ultra-thin, Slate Gray, no track background.

### Status Indicators
- **System Idle:** Cyan pulse (slow).
- **Agent Executing:** Violet spinning or breathing effect.
- **Error/Breach:** Red strobe (fast).

### Input Fields
- Dark, recessed appearance. 
- Focus state: Border color changes to Primary (#8B5CF6) with a subtle outer glow.