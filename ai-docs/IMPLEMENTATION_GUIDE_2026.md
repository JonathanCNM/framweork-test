# Lola Framework UI - Complete Implementation Guide (2026)

**Version:** 0.3.1+  
**Last Updated:** July 2026  
**Status:** Production Ready

This is the **authoritative guide** for implementing Lola Framework UI components. It incorporates all learnings, patterns, and best practices discovered through extensive use and iteration.

---

## 🎯 Critical Information First

### Installation & Setup

```bash
# Install the package
npm install lola-framework-ui-test

# Peer dependencies (React 18+)
npm install react react-dom
```

### Required Imports

```tsx
// 1. ALWAYS import styles in your main app file (REQUIRED)
import 'lola-framework-ui-test/dist/styles.css';

// 2. Import components
import { Button, InputField, Layout } from 'lola-framework-ui-test';

// 3. CRITICAL: Icons MUST use /src/icons path
import { UsaIcon, MexicoIcon, IconApp } from 'lola-framework-ui-test/src/icons';

// 4. Hooks (if needed)
import { useLolaTheme, useFonts } from 'lola-framework-ui-test';
```

**⚠️ COMMON MISTAKE:** Using `lola-framework-ui-test/icons` will cause errors. Always use `/src/icons`.

---

## 📐 Architecture Overview

### View-Based System

Lola Framework uses a **view-based architecture** where each screen/page is classified into one of 5 view types:

1. **primaryMeshGradientView** - Welcome screens, hero sections
2. **specialView** - Special features, highlights
3. **errorView** - Error pages, error states
4. **whiteView** - Forms, data entry, modals (most common)
5. **dataView** - Data display, dashboards

**Why it matters:** Each view type determines which text components to use and how colors are applied.

---

## 🎨 Theme System

### Basic Theme Structure

```tsx
import { useLolaTheme, type LolaThemeConfig } from 'lola-framework-ui-test';

const myTheme: LolaThemeConfig = {
  font: {
    h1: { fontWeight: "400", min: "1.75rem", max: "2rem", lineHeight: "1" },
    highlight: { fontWeight: "700", min: "1.75rem", max: "2rem", lineHeight: "0.95" },
    h2: { fontWeight: "600", min: "1.25rem", max: "1.5rem", lineHeight: "1" },
    bodycopy: { fontWeight: "500", min: "1rem", max: "1.25rem", lineHeight: "1.25rem" },
    // ... other font configs
    fontfamily: "Inter",
    fontcdn: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  },
  colors: {
    primaryGradient: "#1DAFA1",
    secondaryGradient: "#10B981",
    secondaryColor: "#252525",
    whiteColor: "#FFFFFF",
    inactived: "#979797",
    errorColor: "#E81C1C",
    partnerHighlights: "#AAFF74",
    gradientDeg: "116.74deg",
    primaryGradientPoint: "23.26%",
    secundaryGradientPoint: "111.43%",
    primaryMesh: "linear-gradient(116.74deg, #1DAFA1 23.26%, #10B981 111.43%)",
    errorViewBackground: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    // Optional: custom special view background (falls back to primaryMesh)
    // specialViewBackground: "linear-gradient(135deg, #1DAFA1 0%, #10B981 100%)",
    cardPanelBackground: "transparent",
    cardBackground: "#eeeef1",
    cardBackgroundSecundary: "#17171c",
    lightness: "light", // or "dark"
    useSystemTheme: false // true = adapt to system theme
  },
  styles: {
    // NEW in v0.3.1 - Custom styling options
    cardBorderRadius: "16px",
    buttonBorderRadius: "8px",
    inputBorderRadius: "8px",
    cardBorderColor: "#E4E4E4",
    inputBorderColor: "#E4E4E4",
    activeBorderBoton: "#1DAFA1",
    tamañoBordeCard: "1px",
    tamañoBordeInput: "1px",
    buttonPadding: "1rem",
    inputPadding: "0.75rem",
    cardPadding: "1.5rem",
    buttonSize: "medium" // "small" | "medium" | "large"
  }
};

// Initialize theme in your app
function App() {
  const lolaTheme = useLolaTheme(myTheme);
  const theme = lolaTheme.views;
  
  return (
    <YourApp theme={theme} />
  );
}
```

### Legacy Theme Support

Themes created before v0.3.1 may not have the `styles` section. The framework handles this gracefully:

```tsx
// Legacy theme (still works)
const legacyTheme = {
  font: { /* ... */ },
  colors: { /* ... */ }
  // No 'styles' section - will use defaults
};

// Modern theme (recommended)
const modernTheme = {
  font: { /* ... */ },
  colors: { /* ... */ },
  styles: { /* ... */ } // Full control over styling
};
```

---

## 📝 Text Components: The Critical Rule

### The Golden Rule

**Use the CORRECT text component based on the VIEW TYPE, not your preference.**

| View Type | Body Text | Heading | Configuration |
|-----------|-----------|---------|---------------|
| **primaryMeshGradientView** | `GradientText` | `PageTitle` | `as="p" className="lola-body-copy bodycopy"` |
| **specialView** | `GradientText` | `PageTitle` | `as="p" className="lola-body-copy bodycopy"` |
| **errorView** | `GradientText` | `PageTitle` | `as="p" className="lola-body-copy bodycopy"` |
| **whiteView** | `BodyCopy` | `BodyCopy as="h2"` | `<BodyCopy>Text</BodyCopy>` |
| **dataView** | `BodyCopy` | `BodyCopy as="h2"` | `<BodyCopy>Text</BodyCopy>` |

### ❌ BREAKING CHANGE: BodyCopy No Longer Accepts textColor

```tsx
// ❌ WRONG - This will not work
<BodyCopy textColor={theme.errorView.bodyCopy}>
  Error text
</BodyCopy>

// ✅ CORRECT - Use GradientText for colored text in gradient views
<GradientText 
  as="p" 
  className="lola-body-copy bodycopy"
  textColor={theme.errorView.bodyCopy}
>
  Error text
</GradientText>

// ✅ CORRECT - Use BodyCopy without textColor in plain views
<BodyCopy>
  Form helper text
</BodyCopy>
```

### Complete Examples

#### Example 1: Error View (Gradient Background)

```tsx
import { 
  AuraLayout, 
  Layout, 
  PageTitle, 
  GradientText, 
  Button,
  ElevatedCircle 
} from 'lola-framework-ui-test';
import { ErrorIcon } from 'lola-framework-ui-test/src/icons';

function ErrorPage({ theme }) {
  const colorConfig = theme.errorView;
  
  return (
    <AuraLayout colorConfig={colorConfig}>
      <Layout.Content>
        <div className="homepage-content elevated-circle-container">
          <ElevatedCircle background={colorConfig.backgroundIcon}>
            <ErrorIcon colors={colorConfig.iconColors} />
          </ElevatedCircle>
          
          <PageTitle
            highlight="Error"
            highlightColor={colorConfig.title}
            secudnary="Something went wrong"
            secudnaryColor={colorConfig.subtitile}
          />
          
          {/* ✅ Use GradientText for body text in gradient views */}
          <GradientText 
            as="p" 
            className="lola-body-copy bodycopy"
            textColor={colorConfig.bodyCopy}
          >
            We couldn't complete your request. Please try again.
          </GradientText>
        </div>
      </Layout.Content>
      
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          background={colorConfig.backgroundBtn}
          color={colorConfig.textColorBtn}
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
}
```

#### Example 2: Form View (White Background)

```tsx
import {
  AuraLayout,
  Layout,
  Navbar,
  BodyCopy,
  InputField,
  Button
} from 'lola-framework-ui-test';
import { useState } from 'react';

function FormPage({ theme }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const colorConfig = theme.whiteView;
  
  return (
    <AuraLayout colorConfig={colorConfig}>
      <Layout.Header>
        <Navbar
          color={colorConfig.title}
          title="User Information"
          align="center"
        />
      </Layout.Header>
      
      <Layout.Content>
        {/* ✅ Use BodyCopy as heading in plain views */}
        <BodyCopy as="h2" style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
          Enter Your Details
        </BodyCopy>
        
        {/* ✅ Use BodyCopy without textColor for helper text */}
        <BodyCopy style={{ marginBottom: "1.5rem" }}>
          Please fill out the form below to continue.
        </BodyCopy>
        
        <InputField
          label="Full Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Layout.Content>
      
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          background={colorConfig.backgroundBtn}
          color={colorConfig.textColorBtn}
        >
          Continue
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
}
```

---

## 🧩 Component Categories

### Form Components

#### Button
```tsx
import { Button } from 'lola-framework-ui-test';

// Basic usage
<Button background="#1DAFA1" color="#fff">
  Click Me
</Button>

// With gradient
<Button 
  background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)" 
  color="#fff"
  showIcon
  size="large"
>
  Gradient Button
</Button>

// Variants
<Button variant="outline" color="#1DAFA1" background="#1DAFA1">
  Outline Button
</Button>

<Button variant="cancel" color="#1DAFA1">
  Cancel
</Button>

// Loading state
<Button loading={isSubmitting} background="#1DAFA1" color="#fff">
  Submit
</Button>
```

#### InputField
```tsx
import { InputField } from 'lola-framework-ui-test';
import { useState } from 'react';

function MyForm() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  return (
    <InputField
      label="Email"
      name="email"
      type="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        setIsValid(e.target.value.includes('@'));
      }}
      isValid={isValid}
      activeColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      errorColor="#E81C1C"
    />
  );
}
```

#### Select & SearchSelect
```tsx
import { Select, SearchSelect } from 'lola-framework-ui-test';

// Basic Select
<Select
  items={[
    { label: "Option 1", code: "opt1" },
    { label: "Option 2", code: "opt2" }
  ]}
  selectedItem="opt1"
  onChange={(selected) => console.log(selected)}
  selectedBackground="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
/>

// SearchSelect with search functionality
<SearchSelect
  items={[
    { label: "United States", code: "us" },
    { label: "Mexico", code: "mx" },
    { label: "Canada", code: "ca" }
  ]}
  value="us"
  onChange={(selected) => console.log(selected)}
  placeholder="Select a country"
  searchable={true}
/>
```

### Layout Components

#### AuraLayout + Layout
```tsx
import { AuraLayout, Layout, Navbar } from 'lola-framework-ui-test';

function MyPage({ theme }) {
  const colorConfig = theme.whiteView;
  
  return (
    <AuraLayout colorConfig={colorConfig}>
      <Layout.Header>
        <Navbar
          title="Page Title"
          color={colorConfig.title}
          onBackClick={() => history.back()}
        />
      </Layout.Header>
      
      <Layout.Content>
        {/* Your content here */}
      </Layout.Content>
      
      <Layout.Footer>
        {/* Footer content (usually buttons) */}
      </Layout.Footer>
    </AuraLayout>
  );
}
```

### Display Components

#### PageTitle
```tsx
import { PageTitle } from 'lola-framework-ui-test';

// Two-line title with gradient
<PageTitle
  highlight="Welcome"
  highlightColor={theme.specialView.title}
  secudnary="to Lola Framework"
  secudnaryColor={theme.specialView.subtitile}
/>

// Note: "secudnary" is intentional (framework typo)
```

#### ElevatedCircle
```tsx
import { ElevatedCircle } from 'lola-framework-ui-test';
import { SuccessIcon } from 'lola-framework-ui-test/src/icons';

<ElevatedCircle background={theme.specialView.backgroundIcon}>
  <SuccessIcon colors={theme.specialView.iconColors} />
</ElevatedCircle>
```

### Feedback Components

#### Loader & CircularProgress
```tsx
import { Loader, CircularProgress } from 'lola-framework-ui-test';

// Simple loader
<Loader />

// Circular progress with custom colors
<CircularProgress 
  color1="#667eea"
  color2="#764ba2"
/>
```

---

## 🎨 Icons

### Available Icons (New Components)

All icons are exported from `/src/icons`:

```tsx
import { 
  // Navigation
  BackArrow,
  RightArrow,
  RightRoundedIcon,
  BackArrowV2Icon,
  
  // Status
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  RoundedCheckIcon,
  
  // Finance
  CardIcon,
  AddCardIcon,
  AddCardV2Icon,
  CreditCardIcon,
  DebitCardIcon,
  BankIcon,
  BankV2Icon,
  CashIcon,
  CashSpecialIcon,
  WalletIcon,
  
  // Location
  HomeAddressIcon,
  UsaIcon,
  SpainIcon,
  MexicoIcon,
  
  // Actions
  ExchangeIcon,
  ExchangeV2Icon,
  EditIcon,
  EditPencilIcon,
  UploadIcon,
  UploadCloud,
  Close,
  
  // People
  UserInfoIcon,
  UserCheckIcon,
  UserPlusIcon,
  UsersIcon,
  FaceIcon,
  
  // Camera
  CameraGradient,
  IproovCameraErrorIcon,
  CameraErrorIcon,
  
  // Misc
  IconApp,
  LolaLogo,
  KapitalIcon,
  KapitalRIcon,
  HeartIcon,
  HeartOutlineIcon,
  SupportIcon,
  SupportV2Icon,
  WhatsAppIcon,
  ClosedEye,
  OpenEye
} from 'lola-framework-ui-test/src/icons';

// Usage
<UsaIcon size={24} />
<CardIcon size={32} colors={['#667eea', '#764ba2']} />
```

---

## 🎭 Advanced Patterns

### Custom View with Navigation

```tsx
import { useNavigate } from 'react-router-dom';
import {
  AuraLayout,
  Layout,
  Navbar,
  Button,
  BodyCopy
} from 'lola-framework-ui-test';

function TransferPage({ theme }) {
  const navigate = useNavigate();
  const colorConfig = theme.whiteView;
  
  return (
    <AuraLayout colorConfig={colorConfig}>
      <Layout.Header>
        <Navbar
          color={colorConfig.title}
          title="Transfer Money"
          noBackButton={false}
          onBackClick={() => navigate(-1)}
          align="center"
        />
      </Layout.Header>
      
      <Layout.Content>
        <div style={{ padding: '1rem' }}>
          <BodyCopy>
            Enter transfer details below
          </BodyCopy>
          
          {/* Your form fields here */}
        </div>
      </Layout.Content>
      
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          background={colorConfig.backgroundBtn}
          color={colorConfig.textColorBtn}
          onClick={() => navigate('/confirm')}
        >
          Continue
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
}
```

### Theme Switching

```tsx
import { useLolaTheme } from 'lola-framework-ui-test';
import { useState } from 'react';

function App() {
  const [isDark, setIsDark] = useState(false);
  
  const theme = {
    // ... your theme config
    colors: {
      // ... colors
      lightness: isDark ? 'dark' : 'light',
      useSystemTheme: false
    }
  };
  
  const lolaTheme = useLolaTheme(theme);
  
  return (
    <>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Theme
      </button>
      <YourApp theme={lolaTheme.views} />
    </>
  );
}
```

### System Theme Adaptation

```tsx
const adaptiveTheme = {
  // ... font config
  colors: {
    // ... color config
    useSystemTheme: true, // Enable system theme adaptation
    lightness: 'light' // Default preference
  }
};

// Result:
// - whiteView and dataView adapt automatically
// - Light mode: dark text on light background
// - Dark mode: light text on dark background
// - Gradient views (error, special, etc.) always use fixed colors
```

---

## 🎯 Common Patterns & Recipes

### Pattern 1: Multi-Step Form

```tsx
function MultiStepForm({ theme }) {
  const [step, setStep] = useState(1);
  const colorConfig = theme.whiteView;
  
  return (
    <AuraLayout colorConfig={colorConfig}>
      <Layout.Header>
        <Navbar
          title={`Step ${step} of 3`}
          color={colorConfig.title}
        />
      </Layout.Header>
      
      <Layout.Content>
        <CustomStepper
          currentStep={step}
          steps={[
            { label: 'Personal Info' },
            { label: 'Address' },
            { label: 'Confirmation' }
          ]}
          color={colorConfig.stepsLabelColor}
          background={colorConfig.stepsColors}
          trackBackground={colorConfig.title}
        />
        
        {step === 1 && <PersonalInfoForm />}
        {step === 2 && <AddressForm />}
        {step === 3 && <ConfirmationForm />}
      </Layout.Content>
      
      <Layout.Footer>
        <Button
          showIcon
          size="large"
          background={colorConfig.backgroundBtn}
          color={colorConfig.textColorBtn}
          onClick={() => setStep(step + 1)}
          disabled={step === 3}
        >
          {step === 3 ? 'Submit' : 'Continue'}
        </Button>
      </Layout.Footer>
    </AuraLayout>
  );
}
```

### Pattern 2: Payment Method Selector

```tsx
import { 
  PayoutInfo, 
  QuoteInfo, 
  ExchangeFeeInfo 
} from 'lola-framework-ui-test';
import { CreditCardIcon, BankIcon } from 'lola-framework-ui-test/src/icons';

function PaymentSelector({ theme, onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <PayoutInfo
        icon={<CreditCardIcon size={24} />}
        title="Credit Card"
        subtitle="**** 4242"
        bgc={theme.whiteView.backgroundBtn}
        onClick={() => onSelect('card')}
      />
      
      <PayoutInfo
        icon={<BankIcon size={24} />}
        title="Bank Account"
        subtitle="****1234"
        bgc={theme.whiteView.backgroundBtn}
        onClick={() => onSelect('bank')}
      />
    </div>
  );
}
```

### Pattern 3: Transaction List

```tsx
import { TransactionItem } from 'lola-framework-ui-test';

function TransactionHistory({ transactions, theme }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          avatar={tx.recipient.avatar}
          title={tx.recipient.name}
          status={tx.status}
          amount={tx.amount}
          currency={tx.currency}
          date={tx.date}
          bgc={theme.whiteView.card}
          onClick={() => viewTransaction(tx.id)}
        />
      ))}
    </div>
  );
}
```

---

## ⚠️ Common Mistakes & Solutions

### Mistake 1: Wrong Import Path for Icons
```tsx
// ❌ WRONG - Will cause errors
import { UsaIcon } from 'lola-framework-ui-test/icons';

// ✅ CORRECT
import { UsaIcon } from 'lola-framework-ui-test/src/icons';
```

### Mistake 2: Using Title in Plain Views
```tsx
// ❌ WRONG - Title is for gradient views only
<AuraLayout colorConfig={theme.whiteView}>
  <Title title="Form Title" color="#000" />
</AuraLayout>

// ✅ CORRECT
<AuraLayout colorConfig={theme.whiteView}>
  <BodyCopy as="h2" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
    Form Title
  </BodyCopy>
</AuraLayout>
```

### Mistake 3: Using BodyCopy with textColor
```tsx
// ❌ WRONG - textColor prop no longer exists
<BodyCopy textColor={theme.errorView.bodyCopy}>
  Error message
</BodyCopy>

// ✅ CORRECT
<GradientText 
  as="p" 
  className="lola-body-copy bodycopy"
  textColor={theme.errorView.bodyCopy}
>
  Error message
</GradientText>
```

### Mistake 4: Forgetting to Import Styles
```tsx
// ❌ WRONG - Styles not imported
import { Button } from 'lola-framework-ui-test';

// ✅ CORRECT - Always import styles in main file
import 'lola-framework-ui-test/dist/styles.css';
import { Button } from 'lola-framework-ui-test';
```

### Mistake 5: Incorrect PageTitle Props
```tsx
// ❌ WRONG - Using "secondary" instead of "secudnary"
<PageTitle
  highlight="Welcome"
  highlightColor={color}
  secondary="Back"  // Wrong spelling
  secondaryColor={color}
/>

// ✅ CORRECT - Use "secudnary" (framework typo)
<PageTitle
  highlight="Welcome"
  highlightColor={color}
  secudnary="Back"  // Correct spelling (intentional typo in framework)
  secudnaryColor={color}
/>
```

---

## 🚀 Performance Best Practices

### 1. Import Only What You Need
```tsx
// ❌ BAD - Imports everything
import * as Lola from 'lola-framework-ui-test';

// ✅ GOOD - Tree-shakeable imports
import { Button, InputField, Layout } from 'lola-framework-ui-test';
```

### 2. Lazy Load Icons
```tsx
// For rarely used icons
const RareIcon = lazy(() => 
  import('lola-framework-ui-test/src/icons').then(mod => ({ 
    default: mod.RareIcon 
  }))
);
```

### 3. Memoize Theme Configuration
```tsx
import { useMemo } from 'react';

function App() {
  const theme = useMemo(() => ({
    font: { /* ... */ },
    colors: { /* ... */ },
    styles: { /* ... */ }
  }), []);
  
  const lolaTheme = useLolaTheme(theme);
  // ...
}
```

---

## 🧪 Testing

### Component Testing Example
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from 'lola-framework-ui-test';

test('Button renders with gradient', () => {
  render(
    <Button 
      background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      color="#fff"
    >
      Click Me
    </Button>
  );
  
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
```

---

## 📦 New Components (v0.3.1+)

### PayoutInfo
Display payment method information with icon and details.

```tsx
import { PayoutInfo } from 'lola-framework-ui-test';
import { CreditCardIcon } from 'lola-framework-ui-test/src/icons';

<PayoutInfo
  icon={<CreditCardIcon size={24} />}
  title="Credit Card"
  subtitle="**** 4242"
  rightText="$100.00"
  bgc="#F3F4F6"
  onClick={() => handleSelect()}
/>
```

### QuoteInfo
Display exchange rate and transfer quote information.

```tsx
import { QuoteInfo } from 'lola-framework-ui-test';

<QuoteInfo
  fromAmount={100}
  fromCurrency="USD"
  toAmount={1750}
  toCurrency="MXN"
  exchangeRate="1 USD = 17.50 MXN"
  bgc="#F3F4F6"
/>
```

### TransferPanel
Compact transfer information panel.

```tsx
import { TransferPanel } from 'lola-framework-ui-test';

<TransferPanel
  amount={100}
  currency="USD"
  label="You Send"
  bgc="#F3F4F6"
/>
```

### TransactionItem
Transaction list item with avatar, status, and details.

```tsx
import { TransactionItem } from 'lola-framework-ui-test';

<TransactionItem
  avatar="JD"
  title="John Doe"
  status="completed"
  statusColor="#10B981"
  amount={-50.00}
  currency="USD"
  date="2026-07-15"
  bgc="#F3F4F6"
  onClick={() => viewDetails()}
/>
```

### ExchangeFeeInfo
Display exchange rate chips and fee information.

```tsx
import { ExchangeFeeInfo } from 'lola-framework-ui-test';

<ExchangeFeeInfo
  exchangeRate="1 USD = 17.50 MXN"
  fee="$2.50"
  bgc="#1DAFA1"
  colorc="#FFFFFF"
/>
```

### Popup
Bottom sheet modal with blur backdrop.

```tsx
import { Popup } from 'lola-framework-ui-test';

<Popup 
  visible={isOpen}
  onClose={() => setIsOpen(false)}
  bgc="#FFFFFF"
>
  <h2>Popup Content</h2>
  <p>Your content here</p>
</Popup>
```

### Toast
Notification toast with variants.

```tsx
import { Toast } from 'lola-framework-ui-test';

<Toast
  title="Success"
  message="Transfer completed successfully"
  type="success" // "success" | "error" | "info"
  action={{
    label: "View",
    onClick: () => navigate('/transfers')
  }}
/>
```

### RainbowWrapper
Animated rainbow border effect.

```tsx
import { RainbowWrapper } from 'lola-framework-ui-test';

<RainbowWrapper
  type="moving" // or "static"
  borderWidth="2px"
>
  <div>Content with rainbow border</div>
</RainbowWrapper>
```

---

## 🔧 Troubleshooting

### Issue: Components Not Styled
**Solution:** Ensure you've imported the CSS:
```tsx
import 'lola-framework-ui-test/dist/styles.css';
```

### Issue: Icons Not Found
**Solution:** Use `/src/icons` path:
```tsx
import { IconName } from 'lola-framework-ui-test/src/icons';
```

### Issue: Text Invisible in Dark Mode
**Solution:** Set `useSystemTheme: true` or `lightness: 'dark'`:
```tsx
colors: {
  // ...
  lightness: 'dark',
  useSystemTheme: true
}
```

### Issue: TypeScript Errors
**Solution:** Ensure peer dependencies are installed:
```bash
npm install --save-dev @types/react @types/react-dom
```

---

## 📚 Additional Resources

- **Storybook Demo:** https://lola-framweork-ui.vercel.app
- **GitHub Repository:** [Your repo URL]
- **Main Documentation:** See README.md
- **Theme System Guide:** See SYSTEM_THEME_GUIDE.md
- **View Best Practices:** See VIEW_BEST_PRACTICES.md

---

## 🎯 Quick Checklist for New Implementations

- [ ] Install package: `npm install lola-framework-ui-test`
- [ ] Import styles in main file
- [ ] Set up theme with `useLolaTheme` hook
- [ ] Choose correct view type for your page
- [ ] Use correct text components (GradientText vs BodyCopy)
- [ ] Import icons from `/src/icons`
- [ ] Use `PageTitle` props: `secudnary` not `secondary`
- [ ] Test in both light and dark modes
- [ ] Verify on mobile devices

---

**Last Updated:** July 17, 2026  
**Version:** 0.3.1+  
**Maintainer:** Lola Framework Team
