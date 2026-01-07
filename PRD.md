# Planning Guide

A car financing calculator that empowers potential buyers to understand their monthly payment obligations with transparent, real-time calculations.

**Experience Qualities**: 
1. **Trustworthy** - Clear, accurate calculations with professional presentation that builds confidence in financial decisions
2. **Empowering** - Interactive controls that let users explore different scenarios and understand how each variable affects their payment
3. **Accessible** - Simple, focused interface that presents complex financial information in an immediately understandable way

**Complexity Level**: Micro Tool (single-purpose application) - This is a focused calculator with a single clear purpose: calculating monthly car payments based on user inputs.

## Essential Features

### Real-time Payment Calculation
- **Functionality**: Calculates monthly payment using standard amortization formula based on vehicle price, down payment, interest rate, and loan term
- **Purpose**: Provides immediate feedback on affordability and helps users make informed purchasing decisions
- **Trigger**: Any change to input values (vehicle price, down payment, interest rate, or term)
- **Progression**: User adjusts input → Calculation updates instantly → Monthly payment displays prominently
- **Success criteria**: Payment updates within 100ms of input change; formula accurately reflects standard auto loan amortization

### Vehicle Price Input
- **Functionality**: Text input field for estimated vehicle price with currency formatting
- **Purpose**: Sets the baseline cost of the vehicle being financed
- **Trigger**: User types in the field
- **Progression**: User focuses field → Types amount → Value formats as currency → Calculation updates
- **Success criteria**: Accepts numeric input; formats with dollar sign and commas; validates positive numbers

### Down Payment Input
- **Functionality**: Text input field for down payment amount with currency formatting
- **Purpose**: Reduces the total amount financed and demonstrates impact on monthly payment
- **Trigger**: User types in the field
- **Progression**: User focuses field → Types amount → Value formats as currency → Total financed cost recalculates → Monthly payment updates
- **Success criteria**: Accepts numeric input; validates down payment doesn't exceed vehicle price; updates total finance cost display

### Interest Rate Slider
- **Functionality**: Interactive slider control for interest rate (0-20% range) with precise percentage display
- **Purpose**: Allows users to explore different APR scenarios based on their credit profile
- **Trigger**: User drags slider or clicks position on track
- **Progression**: User interacts with slider → Percentage value updates in real-time → Monthly payment recalculates
- **Success criteria**: Smooth drag interaction; displays percentage to 2 decimal places; range covers typical auto loan rates

### Loan Term Selector
- **Functionality**: Dropdown or segmented control to select loan duration (48, 60, 72, or 84 months)
- **Purpose**: Shows how loan length affects monthly affordability vs. total interest paid
- **Trigger**: User clicks to open selector and chooses term
- **Progression**: User opens selector → Views term options → Selects term → Monthly payment recalculates
- **Success criteria**: Clearly displays all four term options; selected term is visually distinct

### Total Finance Cost Display
- **Functionality**: Calculated read-only field showing vehicle price minus down payment
- **Purpose**: Transparently shows the actual amount being financed
- **Trigger**: Updates when vehicle price or down payment changes
- **Progression**: Automatic calculation and display
- **Success criteria**: Always equals vehicle price minus down payment; updates immediately; formatted as currency

## Edge Case Handling

- **Zero or Empty Inputs**: Default to $0 for calculations; guide user with placeholder text
- **Down Payment Exceeds Vehicle Price**: Prevent or warn user; cap down payment at vehicle price
- **Extreme Interest Rates**: Allow full 0-20% range but provide visual indicators for unusually high rates
- **Zero Interest Rate**: Handle gracefully with simple division calculation (no amortization needed)
- **Very Large Numbers**: Format with appropriate comma separators; handle calculations up to $1,000,000

## Design Direction

The design should evoke confidence, clarity, and sophistication—like a premium automotive showroom translated into digital form. It should feel modern and trustworthy, with a professional aesthetic that reassures users they're making informed financial decisions. The interface should breathe with generous spacing, using bold typography and a refined color palette that suggests both luxury and reliability.

## Color Selection

A sophisticated automotive-inspired palette that balances professional trust with modern energy.

- **Primary Color**: Deep Navy Blue `oklch(0.25 0.08 250)` - Communicates trust, stability, and financial professionalism; used for key CTAs and headers
- **Secondary Colors**: 
  - Warm Charcoal `oklch(0.35 0.02 265)` - Supporting text and secondary elements
  - Soft Silver `oklch(0.92 0.01 260)` - Background panels and cards
- **Accent Color**: Electric Cyan `oklch(0.72 0.15 210)` - Attention-grabbing highlight for the monthly payment display and interactive slider; suggests innovation and clarity
- **Foreground/Background Pairings**: 
  - Background (Cool White `oklch(0.98 0.01 250)`): Deep Navy text `oklch(0.25 0.08 250)` - Ratio 9.2:1 ✓
  - Primary (Deep Navy `oklch(0.25 0.08 250)`): White text `oklch(1 0 0)` - Ratio 9.2:1 ✓
  - Accent (Electric Cyan `oklch(0.72 0.15 210)`): Deep Navy text `oklch(0.25 0.08 250)` - Ratio 4.6:1 ✓
  - Cards (Soft Silver `oklch(0.92 0.01 260)`): Warm Charcoal text `oklch(0.35 0.02 265)` - Ratio 7.1:1 ✓

## Font Selection

Typography should convey precision and modernity—the clarity of technical documentation meets the polish of a luxury brand.

- **Primary**: Sora (Bold/SemiBold for headings, Medium for body) - A geometric sans-serif with distinctive rounded characters that feels both technical and approachable
- **Accent Numbers**: Space Grotesk (for financial displays) - Monospaced-style numerals that emphasize precision and readability in the payment displays

**Typographic Hierarchy**: 
- H1 (Page Title): Sora Bold/32px/tight letter spacing (-0.5px)/leading-none
- H2 (Section Labels): Sora SemiBold/14px/uppercase/wide letter spacing (1px)/text-muted-foreground
- Large Display (Monthly Payment): Space Grotesk Bold/48px/tabular numbers/leading-none
- Body (Input Labels): Sora Medium/15px/leading-relaxed
- Small Text (Helper Text): Sora Regular/13px/text-muted-foreground

## Animations

Animations should enhance comprehension by connecting cause and effect—when a slider moves, the payment number should smoothly update to show the relationship. Use subtle spring physics (framer-motion) for the monthly payment value changes to make the calculation feel responsive and alive. Input fields should have gentle focus states with a soft glow effect. The slider handle should have satisfying tactile feedback with scale transforms on interaction. Keep transitions quick (150-250ms) to maintain the sense of real-time calculation without feeling sluggish.

## Component Selection

- **Components**: 
  - `Card` - Main container for the calculator with subtle shadow for depth
  - `Input` - Vehicle price and down payment fields with currency formatting
  - `Slider` - Interest rate control with custom thumb styling
  - `Select` - Loan term picker (48, 60, 72, 84 months)
  - `Label` - Field labels with uppercase styling and letter-spacing
  - `Separator` - Divider between input section and results
  
- **Customizations**: 
  - Custom currency input component that formats values with $ and commas in real-time
  - Oversized monthly payment display card with animated number transitions
  - Custom slider styling with gradient track showing "affordable" to "expensive" range
  - Total finance cost as a read-only calculated field with distinct muted appearance
  
- **States**: 
  - Inputs: Default with soft border, Focus with cyan glow ring, Filled with darker text
  - Slider: Default with subtle track, Hover with highlighted thumb, Active with scaled thumb (1.1x)
  - Select: Closed with chevron icon, Open with smooth dropdown, Selected with checkmark
  - Monthly Payment Display: Idle state, Updating with smooth number transition
  
- **Icon Selection**: 
  - `CarSimple` - Header icon to establish context
  - `Calculator` - Supporting icon for the results section
  - `Percent` - Inline with interest rate display
  - `CalendarBlank` - Inline with loan term
  - `TrendUp` - Indicator when payment increases
  
- **Spacing**: 
  - Container padding: p-8
  - Section gaps: gap-6 for major sections, gap-3 for input groups
  - Card margin: max-w-2xl mx-auto with generous viewport margins (my-12)
  - Input internal spacing: py-3 px-4
  
- **Mobile**: 
  - Single column layout on mobile (<768px)
  - Larger touch targets for slider (min 44px height)
  - Stacked input fields with full width
  - Monthly payment display remains prominent but scales down font size (36px on mobile)
  - Reduced padding on cards (p-6 on mobile)
  - Bottom sheet alternative for Select component on mobile
