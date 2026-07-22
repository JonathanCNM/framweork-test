# Catálogo de Componentes

## Tabla de Contenidos

- [Layout & Structure](#layout--structure)
- [UI Elements](#ui-elements)
- [Form Components](#form-components)
- [Navigation](#navigation)
- [Feedback & Progress](#feedback--progress)
- [Specialized Components](#specialized-components)
- [Custom Hooks](#custom-hooks)
- [Sistema de Iconos](#sistema-de-iconos)

---

## Layout & Structure

### Layout

**Compound component para estructurar páginas**

```typescript
import { Layout } from 'lola-framework-ui';

<Layout 
  background="#ffffff"
  auraColors={["#3ee0cf", "#ff6b6b"]}
  devMode={false}
>
  <Layout.Header>
    <Navbar />
  </Layout.Header>
  
  <Layout.Content isOverflowauto={true}>
    {/* Contenido principal */}
  </Layout.Content>
  
  <Layout.Footer>
    <Button>Continue</Button>
  </Layout.Footer>
</Layout>
```

**Props**:
- `background`: Color de fondo
- `auraColors`: Array de 2 colores para efectos de aura
- `devMode`: Mostrar grid de diseño
- `className`: Clases CSS adicionales

**Características**:
- ✅ Responsive por defecto
- ✅ Manejo automático de teclado móvil
- ✅ Efectos de aura opcionales
- ⚠️ Sin scroll interno por defecto

---

### AuraLayout

**Layout con efectos de gradiente radial**

```typescript
import { AuraLayout } from 'lola-framework-ui';

<AuraLayout
  primaryColor="#3ee0cf"
  secondaryColor="#ff6b6b"
>
  {children}
</AuraLayout>
```

---

### Page

**Wrapper simple para páginas**

```typescript
import { Page } from 'lola-framework-ui';

<Page className="custom-page">
  {content}
</Page>
```

---

### DesignLayout

**Grid de diseño para desarrollo (dev mode)**

- Grid 3x3 para alineación
- Solo visible en `devMode`

---

## UI Elements

### Button

**Botón con múltiples variantes y animaciones**

```typescript
import { Button } from 'lola-framework-ui';

<Button
  variant="default" | "outline" | "link" | "cancel"
  size="small" | "medium" | "large"
  loading={false}
  background="#000"
  color="#fff"
  showIcon={true}
  icon={<CustomIcon />}
  textAnimated={true}
  onClick={handleClick}
>
  Button Text
</Button>
```

**Variantes**:

1. **Default**: Fondo sólido
```typescript
<Button variant="default" background="#3ee0cf">
  Continue
</Button>
```

2. **Outline**: Solo borde
```typescript
<Button variant="outline" background="linear-gradient(90deg, #3ee0cf, #ff6b6b)">
  Continue
</Button>
```

3. **Link**: Estilo de enlace con underline
```typescript
<Button variant="link" color="#3ee0cf">
  Learn More
</Button>
```

4. **Cancel**: Transparente
```typescript
<Button variant="cancel">
  Cancel
</Button>
```

**Características**:
- ✅ Loading state con spinner
- ✅ Texto con gradiente animado
- ✅ Iconos opcionales
- ✅ Totalmente accesible
- ✅ Estados disabled

---

### Title

**Títulos con gradientes y subtítulos**

```typescript
import { Title } from 'lola-framework-ui';

<Title
  size="sm" | "lg" | "xl"
  align="left" | "center" | "right"
  gradient="linear-gradient(90deg, #3ee0cf, #ff6b6b)"
  subtitle="Optional subtitle"
>
  Main Title
</Title>
```

**Ejemplo**:
```typescript
<Title 
  size="xl" 
  align="center"
  gradient="linear-gradient(90deg, #3ee0cf 0%, #ff6b6b 100%)"
  subtitle="Welcome back"
>
  Lola Framework
</Title>
```

---

### PageTitle

**Título especializado para páginas**

Similar a `Title` pero optimizado para headers de página.

---

### GradientText

**Texto con gradiente personalizable**

```typescript
import { GradientText } from 'lola-framework-ui';

<GradientText
  textColor="linear-gradient(90deg, #3ee0cf, #ff6b6b)"
  textAnimated={true}
  textAnimatedDelay={0}
  isLeaving={false}
>
  Gradient Text
</GradientText>
```

**Características**:
- ✅ Animaciones de typing
- ✅ Entrada/salida con transiciones
- ✅ Múltiples gradientes

---

### BodyCopy

**Texto de cuerpo con estilos consistentes**

```typescript
import { BodyCopy } from 'lola-framework-ui';

<BodyCopy align="center" | "left" | "right">
  Body text content
</BodyCopy>
```

---

### RotatingText

**Texto rotativo con animaciones**

```typescript
import { RotatingText } from 'lola-framework-ui';

<RotatingText
  texts={["Option 1", "Option 2", "Option 3"]}
  interval={3000}
/>
```

---

### QuoteInfo

**Currency amount display and input with exchange rate information**

```typescript
import { QuoteInfo } from 'lola-framework-ui';

<QuoteInfo
  label="You send"
  amount="1,250.50"
  currency="USD"
  mode="info" | "input"
  exchangeRate={18.5}
  onAmountChange={(amount) => console.log(amount)}
  initialAmount="100"
  translations={{
    rateText: "1 {from} = {rate} {to}",
    estimatedRate: "Estimated rate"
  }}
  WarningIcon={<WarningIcon />}
  background="var(--gradient-card)"
  textColor="var(--foreground)"
  alternativeTextColor="var(--muted-foreground)"
/>
```

**Props**:
- `label`: Label text (required)
- `amount`: Display amount (for info mode)
- `currency`: Currency code (required)
- `mode`: "info" (display) or "input" (editable) - default: "info"
- `exchangeRate`: Exchange rate value
- `onAmountChange`: Callback when amount changes (input mode)
- `initialAmount`: Initial amount value (input mode)
- `translations`: Text translations object (required)
- `WarningIcon`: Custom warning icon
- `background`, `textColor`, `alternativeTextColor`: Custom colors

**Características**:
- ✅ Two modes: display and input
- ✅ Dynamic font sizing for large amounts
- ✅ Currency formatting with grouping (1,234.56)
- ✅ Decimal support (2 decimal places)
- ✅ Max value: 99,999 (5 integer digits)
- ✅ Exchange rate display
- ✅ Tabular numbers for better alignment
- ✅ Auto-adjusting input width

---

### ExchangeFeeInfo

**Exchange rate chip display**

```typescript
import { ExchangeFeeInfo } from 'lola-framework-ui';

<ExchangeFeeInfo
  fee="18.50"
  currency="MXN"
  translations={{ rateText: "1 {from} = {rate} {to}" }}
  chipBackground="var(--gradient-glass)"
  textColor="var(--foreground)"
  ExchangeIcon={<ExchangeIcon />}
  className="custom-class"
  style={{ margin: '10px' }}
/>
```

**Props**:
- `fee`: Exchange fee/rate value (required)
- `currency`: Target currency code (required)
- `translations`: Translation object with rateText (required)
- `chipBackground`: Background color for chips - default: `var(--gradient-glass)`
- `textColor`: Text color - default: `var(--foreground)`
- `ExchangeIcon`: Custom exchange icon
- `className`, `style`: Custom styling

**Características**:
- ✅ Chip-style design
- ✅ Circular icons (31x31px)
- ✅ Pill-shaped info text
- ✅ Dynamic text with placeholders
- ✅ Fully customizable

---

### QuoteSection

**Container wrapper for quote-related content**

```typescript
import { QuoteSection } from 'lola-framework-ui';

<QuoteSection className="custom-class" style={{ padding: '20px' }}>
  <QuoteInfo label="You send" amount="100" currency="USD" />
  <QuoteInfo label="They receive" amount="1850" currency="MXN" />
</QuoteSection>
```

**Props**:
- `children`: React nodes to display (required)
- `className`: Additional CSS classes
- `style`: Custom inline styles

**Características**:
- ✅ Simple wrapper component
- ✅ Consistent quote section styling
- ✅ Flex column layout with gap

---

### Toast

**Notification toast with auto-dismiss**

```typescript
import { Toast } from 'lola-framework-ui';

<Toast
  visible={true}
  message="Transaction completed successfully"
  title="Success!"
  buttonText="View"
  onButtonClick={() => alert('Clicked')}
  duration={3000}
  type="success" | "error" | "info"
  onClose={() => setVisible(false)}
  showIcon={true}
  className="custom-class"
  style={{ zIndex: 10000 }}
/>
```

**Props**:
- `visible`: Controls toast visibility (required)
- `message`: Main message text (required)
- `title`: Optional title
- `buttonText`: Optional action button text
- `onButtonClick`: Action button callback
- `duration`: Auto-dismiss duration in ms - default: 2000
- `type`: Toast type - default: "success"
- `onClose`: Callback when toast closes
- `showIcon`: Show status icon - default: true
- `className`, `style`: Custom styling

**Características**:
- ✅ Three types: success (green), error (red), info (blue)
- ✅ Auto-dismiss with configurable duration
- ✅ Built-in icons (✓, ✕, ℹ)
- ✅ Optional action button
- ✅ Slide-up animation
- ✅ Fixed bottom positioning
- ✅ Max-width: 376px

---

### Popup

**Modal popup with backdrop**

```typescript
import { Popup } from 'lola-framework-ui';

<Popup
  visible={true}
  onClose={() => setVisible(false)}
  className="custom-class"
  showCloseBtn={true}
  footerColor="#000000"
  CloseIcon={Close}
>
  <div>Your popup content here</div>
</Popup>
```

**Props**:
- `children`: Content to display (required, JSX.Element)
- `visible`: Controls popup visibility
- `onClose`: Callback when popup closes (required)
- `className`: Additional CSS classes
- `showCloseBtn`: Show close button - default: true
- `footerColor`: Color for close icon - default: "#000000"
- `CloseIcon`: Custom close icon component

**Características**:
- ✅ Click-outside-to-close functionality
- ✅ Backdrop blur effect
- ✅ Bottom-sheet style (mobile-friendly)
- ✅ Glass morphism design
- ✅ Accessible (role="alert")
- ✅ Responsive (adapts on mobile)

---

### RainbowWrapper

**Animated border effects wrapper**

```typescript
import { RainbowWrapper } from 'lola-framework-ui';

<RainbowWrapper
  error="Error message"
  isActive={true}
  backgroundBtn="linear-gradient(90deg, #667eea, #764ba2)"
  isStatic={true}
  customRainbowColors={['#667eea 0%', '#764ba2 50%', '#667eea 100%']}
  borderStroke={2}
>
  <InputField label="Email" />
</RainbowWrapper>
```

**Props**:
- `error`: Error message (triggers shake animation)
- `children`: Content to wrap (required)
- `isActive`: Show border effect - default: false
- `backgroundBtn`: Border gradient (static mode) - default: gradient
- `isStatic`: Static or animated - default: true
- `customRainbowColors`: Custom colors for moving mode
- `borderStroke`: Border thickness - default: 1

**Características**:
- ✅ Two modes: static and moving (animated)
- ✅ Mask composite technique for clean borders
- ✅ Rainbow animation (2s loop)
- ✅ Glow effect (moving mode)
- ✅ Shake animation on error
- ✅ Customizable colors and thickness

---

### TransactionItem

**Transaction history item display**

```typescript
import { TransactionItem } from 'lola-framework-ui';

<TransactionItem
  operationId="TXN001"
  statusInfo={{
    icon: <SuccessIcon />,
    value: "Completed",
    color: "#10b981"
  }}
  amount="1250.50"
  currency="USD"
  date="Jan 15, 2026"
  onClick={(id) => console.log(id)}
  footerColor="#000"
  translations={{
    avatar: "JD",
    transfers: "Transfer",
    statusTranslations: { completed: "Completed" }
  }}
  icons={{ SuccessIcon, ErrorIcon, CheckCircleIcon, etc. }}
  background="var(--gradient-card)"
  textColor="var(--foreground)"
  alternativeTextColor="var(--muted-foreground)"
/>
```

**Props**:
- `operationId`: Unique transaction ID (required)
- `statusInfo`: Status object with icon, value, color (required)
- `amount`: Transaction amount (required)
- `currency`: Currency code (required)
- `date`: Transaction date (required)
- `onClick`: Click callback with operationId
- `translations`: Text translations (required)
- `icons`: Custom icon components
- `background`, `textColor`, `alternativeTextColor`: Custom colors

**Características**:
- ✅ Status indicator with icon
- ✅ Amount formatting with locale support
- ✅ Hover effect (lift animation)
- ✅ Clickable with callback
- ✅ Avatar/icon display
- ✅ Tabular numbers for amounts
- ✅ Fully themed

---

### TransferPanel

**Amount display panel**

```typescript
import { TransferPanel } from 'lola-framework-ui';

<TransferPanel
  amount="1,250.50"
  currency="USD"
  footerText="Total Amount"
  icon={<CashIcon />}
  background="var(--gradient-card)"
  textColor="var(--foreground)"
  alternativeTextColor="var(--muted-foreground)"
/>
```

**Props**:
- `amount`: Amount to display (required)
- `currency`: Currency code (required)
- `footerText`: Footer text (required)
- `icon`: Optional icon element
- `background`, `textColor`, `alternativeTextColor`: Custom colors

**Características**:
- ✅ Square panel design (180x180px)
- ✅ Large amount display (2rem)
- ✅ Icon support in footer
- ✅ Responsive (120x120px on mobile)
- ✅ Centered layout

---

### TransferPanelSection

**Container for transfer panels**

```typescript
import { TransferPanelSection, TransferPanel } from 'lola-framework-ui';

<TransferPanelSection className="custom-class" style={{ gap: '20px' }}>
  <TransferPanel amount="1000" currency="USD" footerText="Send" />
  <TransferPanel amount="18500" currency="MXN" footerText="Receive" />
</TransferPanelSection>
```

**Props**:
- `children`: TransferPanel components (required)
- `className`: Additional CSS classes
- `style`: Custom inline styles

**Características**:
- ✅ Flex container with gap
- ✅ Centered alignment
- ✅ Full width layout
- ✅ Simple wrapper component

---

### PayoutInfo

**Payout method display card with icon and details**

```typescript
import { PayoutInfo } from 'lola-framework-ui';

<PayoutInfo
  title="Credit Card"
  subtitle="Visa •••• 4242"
  icon={<CardIcon colors={["#3ee0cf", "#3ee0cf"]} size={24} />}
  onChange={handleChange}
  background="#fff"
  color="#252525"
  fee="$5.00"
  className="custom-class"
/>
```

**Props**:
- `title`: Main text (required)
- `subtitle`: Secondary text (required)
- `icon`: JSX element for icon (required)
- `onChange`: Click handler
- `background`: Background color (default: `#fff`)
- `color`: Text color (default: `#252525`)
- `fee`: Fee display (string or JSX element)
- `className`: Additional CSS classes

**Use Cases**:
```typescript
// Basic payout method
<PayoutInfo
  title="Bank Account"
  subtitle="Chase •••• 9876"
  icon={<BankIcon colors={["#667eea", "#667eea"]} size={24} />}
  onChange={() => selectPayoutMethod('bank')}
/>

// With fee display
<PayoutInfo
  title="International Transfer"
  subtitle="SWIFT •••• ABC123"
  icon={<BankIcon colors={["#3ee0cf", "#3ee0cf"]} size={24} />}
  fee={<span style={{ color: '#6b7280' }}>Fee: $5.00</span>}
/>

// Custom background with gradient
<PayoutInfo
  title="Premium Card"
  subtitle="Gold •••• 1234"
  icon={<CardIcon colors={["#fbbf24", "#f59e0b"]} size={24} />}
  background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  color="#ffffff"
/>
```

**Características**:
- ✅ Click handler support
- ✅ Custom icon support
- ✅ Gradient backgrounds
- ✅ Fee display option
- ✅ Fully customizable styling

---

## Form Components

### InputField

**Input con label flotante y validación**

```typescript
import { InputField } from 'lola-framework-ui';

<InputField
  type="text" | "email" | "password" | "number" | "tel" | "color"
  placeholder="Enter your name"
  value={value}
  onChange={handleChange}
  error={errorMessage}
  disabled={false}
  icon={<Icon />}
  borderRadius="10px"
  activeColor="#3ee0cf"
  inactiveColor="#979797"
  errorColor="#fd2a35"
/>
```

**Tipos especiales**:

1. **Currency Input**
```typescript
<InputField
  type="currency"
  placeholder="Amount"
  currency="USD"
/>
```

2. **Color Picker**
```typescript
<InputField
  type="color"
  placeholder="Select color"
/>
```

**Características**:
- ✅ Label flotante animado
- ✅ Validación visual
- ✅ Iconos opcionales
- ✅ Estados de error
- ✅ Autocomplete seguro

---

### LabelInput

**Label animado para inputs**

```typescript
import { LabelInput } from 'lola-framework-ui';

<LabelInput
  color="#3ee0cf"
  isActive={true}
>
  Label Text
</LabelInput>
```

---

### Select

**Selector customizado**

```typescript
import { Select, type ISelectItem } from 'lola-framework-ui';

const options: ISelectItem[] = [
  { id: '1', label: 'Option 1', value: 'opt1' },
  { id: '2', label: 'Option 2', value: 'opt2' }
];

<Select
  items={options}
  selectedItem={selected}
  onSelectItem={handleSelect}
  placeholder="Select an option"
  editMode={false}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

**Características**:
- ✅ Customizable completamente
- ✅ Modo edición
- ✅ Acciones (editar/eliminar)
- ✅ Estilos con gradientes

---

### SearchSelect

**Selector con búsqueda**

```typescript
import { SearchSelect, type SelectItem } from 'lola-framework-ui';

const items: SelectItem[] = [
  { id: '1', name: 'United States' },
  { id: '2', name: 'Mexico' },
  { id: '3', name: 'Spain' }
];

<SearchSelect
  items={items}
  selectedItem={selected}
  onSelectItem={handleSelect}
  placeholder="Search country"
  color="linear-gradient(90deg, #3ee0cf, #ff6b6b)"
  activeItemBg="#3ee0cf"
  activeItemColor="#fff"
/>
```

**Características**:
- ✅ Búsqueda en tiempo real
- ✅ Apertura arriba/abajo según espacio
- ✅ Teclado navegable
- ✅ Estilos customizables

---

### InputRadio

**Input radio customizado**

```typescript
import { InputRadio } from 'lola-framework-ui';

<InputRadio
  name="options"
  value="option1"
  checked={isChecked}
  onChange={handleChange}
  label="Option 1"
/>
```

---

### QuoteInfo

**Currency amount display and input with exchange information**

```typescript
import { QuoteInfo } from 'lola-framework-ui';
import { UsaIcon } from 'lola-framework-ui/src/icons';

const [amount, setAmount] = useState(0);

<QuoteInfo
  label="You send"
  amount="1,250.50"
  currency="USD"
  textColor="#252525"
  mode="info" | "input"
  isActive={false}
  showSelectorChevron={false}
  hideCurrencySymbol={false}
  amountState={amount}
  setAmountState={setAmount}
  theme={theme}
  icon={<UsaIcon size={24} />}
  bottomSlot={<div>Additional info</div>}
/>
```

**Props**:
- `label`: Label text (required)
- `amount`: Display amount for info mode
- `currency`: Currency code (required)
- `textColor`: Text color (required)
- `mode`: Display or input mode (default: `info`)
- `isActive`: Active state styling
- `showSelectorChevron`: Show dropdown chevron
- `hideCurrencySymbol`: Hide "$" symbol
- `amountState`: Current amount value (required)
- `setAmountState`: Amount change handler (required)
- `theme`: Theme configuration (required)
- `icon`: Currency icon
- `bottomSlot`: Additional content below amount

**Modes**:

1. **Info Mode** (Display)
```typescript
<QuoteInfo
  label="You send"
  amount="1,250.50"
  currency="USD"
  textColor="#252525"
  mode="info"
  amountState={1250.5}
  setAmountState={() => {}}
  theme={theme}
  icon={<UsaIcon size={24} />}
/>
```

2. **Input Mode** (Editable)
```typescript
const [amount, setAmount] = useState(0);

<QuoteInfo
  label="Enter amount"
  currency="USD"
  textColor="#252525"
  mode="input"
  amountState={amount}
  setAmountState={(value) => setAmount(value.amount)}
  theme={theme}
  icon={<UsaIcon size={24} />}
/>
```

3. **With Selector Chevron**
```typescript
<QuoteInfo
  label="Currency"
  amount="5,000.00"
  currency="MXN"
  textColor="#252525"
  mode="info"
  showSelectorChevron={true}
  isActive={true}
  amountState={5000}
  setAmountState={() => {}}
  theme={theme}
  icon={<MexicoIcon size={24} />}
/>
```

4. **With Bottom Slot**
```typescript
<QuoteInfo
  label="Transfer amount"
  amount="10,000.00"
  currency="USD"
  textColor="#252525"
  mode="info"
  amountState={10000}
  setAmountState={() => {}}
  theme={theme}
  icon={<UsaIcon size={24} />}
  bottomSlot={
    <div>Transfer fee: $5.00 • Arrives in 1-2 business days</div>
  }
/>
```

**Características**:
- ✅ Two modes: display and input
- ✅ Dynamic font sizing for large amounts
- ✅ Currency formatting with grouping
- ✅ Decimal support (2 decimal places)
- ✅ Currency selector chevron option
- ✅ Custom icon support
- ✅ Bottom slot for additional information
- ✅ Active state styling
- ✅ Max value: 99,999
- ⚠️ Requires theme configuration

**Exchange Rate Example**:
```typescript
const [sendAmount, setSendAmount] = useState(0);
const exchangeRate = 18.5;
const receiveAmount = (sendAmount * exchangeRate).toFixed(2);

<>
  <QuoteInfo
    label="You send"
    currency="USD"
    textColor="#252525"
    mode="input"
    amountState={sendAmount}
    setAmountState={(v) => setSendAmount(parseFloat(v.amount || '0'))}
    theme={theme}
    icon={<UsaIcon size={24} />}
  />
  
  <QuoteInfo
    label="They receive"
    amount={receiveAmount}
    currency="MXN"
    textColor="#10b981"
    mode="info"
    isActive={true}
    amountState={parseFloat(receiveAmount)}
    setAmountState={() => {}}
    theme={theme}
    icon={<MexicoIcon size={24} />}
  />
</>
```

---

### VgsInput

**⚠️ Requiere @vgs/collect-js-react**

**Input seguro para tarjetas de crédito**

```typescript
import { VgsInput } from 'lola-framework-ui';

<VgsInput
  type="card_holder_name" | "card_number" | "card_exp_date" | "card_cvc"
  placeholder="Card number"
  autoFocus={false}
  errorLabel={error}
  setErrorLabel={setError}
  onGetCardInfo={handleCardInfo}
  borderRadius="10px"
  activeColor="#3ee0cf"
  errorColor="#fd2a35"
/>
```

**Tipos disponibles**:
- `card_holder_name`: Nombre del titular
- `card_number`: Número de tarjeta
- `card_exp_date`: Fecha de expiración
- `card_cvc`: CVV/CVC

---

### VgsFormWrapper

**⚠️ Requiere @vgs/collect-js-react**

**Wrapper para formularios VGS Collect**

```typescript
import { VgsFormWrapper } from 'lola-framework-ui';

<VgsFormWrapper
  vaultId="your-vault-id"
  environment="sandbox"
  onSubmit={handleSubmit}
>
  <VgsInput type="card_number" />
  <VgsInput type="card_exp_date" />
  <VgsInput type="card_cvc" />
</VgsFormWrapper>
```

---

## Navigation

### Navbar

**Barra de navegación**

```typescript
import { Navbar } from 'lola-framework-ui';

<Navbar
  showBackButton={true}
  onBackClick={handleBack}
  title="Page Title"
  icon={<CustomIcon />}
  onIconClick={handleIconClick}
  iconDisabled={false}
  centerTitle={true}
  gradient="linear-gradient(90deg, #3ee0cf, #ff6b6b)"
/>
```

**Layouts**:

1. **Con título centrado**
```typescript
<Navbar
  centerTitle={true}
  title="Dashboard"
  showBackButton={true}
/>
```

2. **Con título a la izquierda**
```typescript
<Navbar
  centerTitle={false}
  title="Settings"
  icon={<SettingsIcon />}
  onIconClick={handleSettings}
/>
```

---

## Feedback & Progress

### Loader

**Indicador de carga con gradiente**

```typescript
import { Loader } from 'lola-framework-ui';

<Loader
  colors={["#3ee0cf", "#ff6b6b"]}
  strokeWidth={2}
  size={24}
/>
```

**Características**:
- ✅ Gradiente animado
- ✅ Tamaño customizable
- ✅ Grosor de línea ajustable

---

### CircularProgress

**Progreso circular**

```typescript
import { CircularProgress } from 'lola-framework-ui';

<CircularProgress
  progress={75}
  size={120}
  strokeWidth={8}
  colors={["#3ee0cf", "#ff6b6b"]}
  showPercentage={true}
>
  <Icon />
</CircularProgress>
```

**Uso típico**:
```typescript
<CircularProgress
  progress={uploadProgress}
  size={150}
  colors={["#3ee0cf", "#ff6b6b"]}
  showPercentage={true}
>
  <UploadIcon />
</CircularProgress>
```

---

### CustomStepper

**Indicador de pasos**

```typescript
import { CustomStepper, type ISteps } from 'lola-framework-ui';

const steps: ISteps[] = [
  { id: 1, label: 'Personal Info' },
  { id: 2, label: 'Address' },
  { id: 3, label: 'Payment' }
];

<CustomStepper
  steps={steps}
  currentStep={2}
  activeColor="linear-gradient(90deg, #3ee0cf, #ff6b6b)"
  inactiveColor="#e0e0e0"
  labelColor="#333"
/>
```

**Características**:
- ✅ Animaciones entre pasos
- ✅ Labels customizables
- ✅ Colores por paso
- ✅ Progreso visual

---

## Specialized Components

### ElevatedCircle

**Círculo con elevación y sombra**

```typescript
import { ElevatedCircle } from 'lola-framework-ui';

<ElevatedCircle
  size={128}
  shadow="0 4px 24px rgba(0,0,0,0.1)"
>
  <Icon />
</ElevatedCircle>
```

---

### IproovButtonSlot

**Botón especializado para iProov**

```typescript
import { IproovButtonSlot } from 'lola-framework-ui';

<IproovButtonSlot
  onStart={handleStart}
  buttonText="Start Verification"
  subtitle="Optional subtitle"
/>
```

---

### MotionWrapper

**Wrapper para animaciones con Framer Motion**

```typescript
import { MotionWrapper } from 'lola-framework-ui';

<MotionWrapper
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {children}
</MotionWrapper>
```

---

## Custom Hooks

### useTheme

**Sistema de theming dinámico**

```typescript
import { useTheme, type IUseTheme } from 'lola-framework-ui';

const theme: IUseTheme = {
  h1: {
    weight: 600,
    min: "1.5rem",
    max: "3rem",
    lineHeight: 1.2
  },
  bodycopy: {
    weight: 400,
    min: "1rem",
    max: "1.25rem"
  }
};

const { onSetTheme, downloadThemeTxt, generateColorsByView } = useTheme(theme);

// Aplicar tema
onSetTheme(theme);

// Descargar tema como txt
downloadThemeTxt(theme, "my-theme.txt");

// Generar colores por vista
const colors = generateColorsByView(themeConfig);
```

**Características**:
- ✅ Clamp automático para responsive
- ✅ Inyección CSS dinámica
- ✅ Export de temas
- ⚠️ Performance: re-calcula en cada render

---

### useBlockScroll

**Bloqueo de scroll del body**

```typescript
import { useBlockScroll } from 'lola-framework-ui';

function Modal() {
  useBlockScroll(); // Bloquea scroll mientras el componente está montado
  
  return <div>Modal content</div>;
}
```

**Características**:
- ✅ Limpieza automática en unmount
- ✅ Previene scroll en iOS
- ⚠️ Usa body-scroll-lock@beta

---

### useKeyboardVisible

**Detección de teclado móvil**

```typescript
import { useKeyboardVisible } from 'lola-framework-ui';

function Form() {
  const { isKeyboardOpen, viewportHeight, handlerSetIsKeyboardOpen } = useKeyboardVisible();
  
  return (
    <div style={{ height: `${viewportHeight}px` }}>
      {isKeyboardOpen && <div>Keyboard is visible</div>}
    </div>
  );
}
```

**Características**:
- ✅ Detección automática en iOS/Android
- ✅ Ajuste de viewport height
- ✅ Sincronización via localStorage

---

### usePreventReload

**Prevención de recarga de página**

```typescript
import { usePreventReload } from 'lola-framework-ui';

function Form() {
  usePreventReload(hasUnsavedChanges);
  
  return <form>{/* ... */}</form>;
}
```

---

### useVgsCollectLoader

**⚠️ Requiere @vgs/collect-js**

**Carga de VGS Collect**

```typescript
import { useVgsCollectLoader } from 'lola-framework-ui';

function PaymentForm() {
  const { isVGSLoaded, isVGSLoading, vgsError } = useVgsCollectLoader({
    vgsVaultId: "vault-id",
    vgsEnvironment: "sandbox",
    vgsVersion: "2.25.0"
  });
  
  if (isVGSLoading) return <Loader />;
  if (vgsError) return <Error message={vgsError} />;
  
  return <VgsFormWrapper>...</VgsFormWrapper>;
}
```

---

### useFonts

**Gestión de fuentes**

```typescript
import { useFonts, type UseFontsProps } from 'lola-framework-ui';

const fonts: UseFontsProps = {
  primary: "Manrope",
  secondary: "Inter"
};

useFonts(fonts);
```

---

### useLocalStorage

**Wrapper de localStorage con eventos**

```typescript
import { 
  setLocalStorage, 
  listenLocalStorage, 
  storageEventTarget 
} from 'lola-framework-ui';

// Guardar
setLocalStorage('theme', 'dark');

// Escuchar cambios
const unlisten = listenLocalStorage('theme', (newValue) => {
  console.log('Theme changed to:', newValue);
});

// Cleanup
unlisten();
```

---

## Sistema de Iconos

### 52 Iconos Disponibles

```typescript
import {
  // Camera & Upload
  CameraGradient,
  UploadCloud,
  UploadIcon,
  
  // Navigation
  BackArrow,
  BackArrowV2Icon,
  RightArrow,
  RightIcon,
  RightRoundedIcon,
  Close,
  
  // Status
  SuccessIcon,
  ErrorIcon,
  ErrorUserIcon,
  WarningIcon,
  RoundedCheckIcon,
  
  // User
  FaceIcon,
  UserInfoIcon,
  UserCheckIcon,
  UserPlusIcon,
  UsersIcon,
  
  // Actions
  EditIcon,
  EditPencilIcon,
  
  // Emotion
  HeartIcon,
  HeartOutlineIcon,
  
  // Payment
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
  
  // Communication
  WhatsAppIcon,
  SupportIcon,
  SupportV2Icon,
  
  // Finance
  ExchangeIcon,
  ExchangeV2Icon,
  
  // Camera Specific
  CameraErrorIcon,
  IproovCameraErrorIcon,
  
  // Brands
  IconApp,
  LolaLogo,
  KapitalRIcon,
  KapitalIcon,
  
  // Country Flags
  UsaIcon,
  SpainIcon,
  MexicoIcon,
  
  // Eye
  ClosedEye,
  OpenEye
} from 'lola-framework-ui';

// Uso
<CameraGradient 
  colors={["#3ee0cf", "#ff6b6b"]}
  size={24}
/>
```

**Características**:
- ✅ SVG components
- ✅ Colores dinámicos (array de 2 colores)
- ✅ Tamaño customizable
- ⚠️ Sin tree-shaking (todos se importan juntos)

**Ejemplo de uso**:
```typescript
<Button 
  icon={<RightRoundedIcon colors={["#3ee0cf", "#ff6b6b"]} />}
  showIcon={true}
>
  Continue
</Button>
```

---

## Patrones de Uso Comunes

### Formulario Completo

```typescript
function RegistrationForm() {
  const [formData, setFormData] = useState({});
  const { isKeyboardOpen } = useKeyboardVisible();
  
  return (
    <Layout background="#fff">
      <Layout.Header>
        <Navbar 
          title="Registration"
          showBackButton={true}
          onBackClick={() => router.back()}
        />
      </Layout.Header>
      
      <Layout.Content>
        <Title size="xl" align="center">
          Create Account
        </Title>
        
        <InputField
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        
        <InputField
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </Layout.Content>
      
      <Layout.Footer style={{ bottom: isKeyboardOpen ? 0 : 32 }}>
        <Button 
          size="large"
          background="linear-gradient(90deg, #3ee0cf, #ff6b6b)"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Layout.Footer>
    </Layout>
  );
}
```

---

## Resumen de Componentes

| Categoría | Cantidad | Estado |
|-----------|----------|--------|
| **Layout** | 4 | ✅ Estable |
| **UI Elements** | 16 | ✅ Estable |
| **Forms** | 8 | ⚠️ VGS components requieren deps |
| **Navigation** | 1 | ✅ Estable |
| **Feedback** | 4 | ✅ Estable |
| **Specialized** | 3 | ✅ Estable |
| **Hooks** | 8 | ⚠️ useBlockScroll usa beta |
| **Iconos** | 52 | ⚠️ Sin tree-shaking |

**Total**: 104 exports (34 components + 8 hooks + 52 icons + 10 new utils)

**New Components (v0.4.0)**:
- QuoteInfo - Currency display/input with exchange rates
- ExchangeFeeInfo - Exchange rate chip display
- QuoteSection - Quote container wrapper
- Toast - Notification toast with auto-dismiss
- Popup - Modal popup with backdrop
- RainbowWrapper - Animated border effects
- TransactionItem - Transaction history display
- TransferPanel - Amount display panel
- TransferPanelSection - Transfer panel container

---

[← Volver al Índice](../README.md) | [Siguiente: Problemas →](../problems/README.md)
