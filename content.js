/* =========================================================
   use-africa-pay docs — content data
   Real facts used here: GitHub idyWilliams/use-africa-pay (69★ / 9 forks
   as of Sep 2026, fetched live below), npm @use-africa-pay/core@2.1.0,
   @use-africa-pay/next@0.3.0, @use-africa-pay/react-native@0.1.2 (all
   confirmed on the npm registry).
========================================================= */

const NAV = [
  { group: "Getting Started", items: [
    { slug: "overview", title: "Overview" },
    { slug: "installation", title: "Installation" },
    { slug: "quick-start", title: "Quick Start" },
  ]},
  { group: "Core API", items: [
    { slug: "api-useafricapay", title: "useAfricaPay()" },
    { slug: "api-preflight", title: "usePaymentPreflight()" },
    { slug: "api-analytics", title: "usePaymentAnalytics()" },
    { slug: "api-retry", title: "usePaymentRetry()" },
  ]},
  { group: "Providers", items: [
    { slug: "provider-paystack", title: "Paystack" },
    { slug: "provider-flutterwave", title: "Flutterwave" },
    { slug: "provider-monnify", title: "Monnify" },
    { slug: "provider-remita", title: "Remita" },
  ]},
  { group: "Guides", items: [
    { slug: "advanced", title: "Advanced Features" },
    { slug: "error-handling", title: "Error Handling" },
    { slug: "security", title: "Security Best Practices" },
    { slug: "examples", title: "Examples" },
    { slug: "migration", title: "Migration Guide" },
  ]},
  { group: "Reference", items: [
    { slug: "types", title: "Type Reference" },
    { slug: "faq", title: "FAQ" },
    { slug: "troubleshooting", title: "Troubleshooting" },
  ]},
  { group: "Project", items: [
    { slug: "community", title: "Community & Stats" },
  ]},
];

const FLAT_NAV = NAV.flatMap(g => g.items.map(i => ({...i, group: g.group})));

function navNeighbors(slug){
  const idx = FLAT_NAV.findIndex(i => i.slug === slug);
  return { prev: FLAT_NAV[idx-1] || null, next: FLAT_NAV[idx+1] || null };
}

/* ---------- shared snippet helper (used when building HTML strings) ---------- */
function code(lang, label, src){
  return `<div class="code-block${label ? '' : ' no-head'}">
    ${label ? `<div class="code-block-head"><span>${label}</span><button class="copy-btn" data-copy>Copy</button></div>` : `<button class="copy-btn" data-copy style="position:absolute;top:10px;right:10px;">Copy</button>`}
    <pre><code class="language-${lang}">${escapeHtml(src)}</code></pre>
  </div>`;
}
function escapeHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* =========================================================
   PAGE CONTENT
========================================================= */
const PAGES = {};

/* ---------------- OVERVIEW ---------------- */
PAGES["overview"] = {
  kicker: "Documentation",
  title: "use-africa-pay",
  lede: "A unified, type-safe React hook for integrating African payment gateways — Paystack, Flutterwave, Monnify, and Remita — behind a single, consistent API.",
  badgesHtml: `<div class="lead-badges">
    <img src="https://img.shields.io/npm/v/@use-africa-pay/core?style=flat-square&color=2D5A27&label=npm" alt="npm version">
    <img src="https://img.shields.io/npm/dw/@use-africa-pay/core?style=flat-square&color=E8A23D&label=weekly%20downloads" alt="weekly downloads">
    <img src="https://img.shields.io/github/stars/idyWilliams/use-africa-pay?style=flat-square&color=2D5A27&label=stars" alt="GitHub stars">
    <img src="https://img.shields.io/github/license/idyWilliams/use-africa-pay?style=flat-square&color=6B7078&label=license" alt="license">
  </div>`,
  html: `
  <div class="rail-hero">
    ${railDiagram()}
  </div>

  <section>
  <h2 id="why">Why use-africa-pay</h2>
  <p>Every payment provider in Africa ships its own SDK, its own prop names, and its own idea of what a "successful" response looks like. Paystack wants <span class="inline-code">publicKey</span>; Flutterwave wants a phone number it will actually validate; Monnify and Remita both insist on a full name before they'll render a modal. Switching providers midway through a project — or supporting more than one at once — usually means a wall of <span class="inline-code">if (provider === 'x')</span> branches.</p>
  <p><strong>use-africa-pay</strong> replaces that with one hook, one config shape, and one response object, regardless of which rail actually moved the money.</p>
  </section>

  <section>
  <h2 id="features">Key features</h2>
  <div class="card-grid">
    <div class="feature-card"><h4>Unified API</h4><p>Switch providers with a config change, not a rewrite.</p></div>
    <div class="feature-card"><h4>Type-safe</h4><p>Discriminated unions for provider configs, full TS support.</p></div>
    <div class="feature-card"><h4>Standardized responses</h4><p>One response shape across all four providers.</p></div>
    <div class="feature-card"><h4>Preflight validation</h4><p>Catch bad config before the modal even opens.</p></div>
    <div class="feature-card"><h4>Payment analytics</h4><p>Track success rate per provider to inform routing.</p></div>
    <div class="feature-card"><h4>Automatic retries</h4><p>Exponential backoff for transient network failures.</p></div>
    <div class="feature-card"><h4>Security-first</h4><p>Input sanitization, HTTPS enforcement, error redaction.</p></div>
    <div class="feature-card"><h4>Lazy loading</h4><p>Provider SDKs load only when a payment is initialized.</p></div>
  </div>
  </section>

  <section>
  <h2 id="providers">Supported providers</h2>
  <div class="table-wrap"><table>
    <tr><th>Provider</th><th>Countries</th><th>Currencies</th></tr>
    <tr><td><a href="#/provider-paystack">Paystack</a></td><td>Nigeria, Ghana, Kenya, South Africa</td><td>NGN, GHS, KES, USD, ZAR</td></tr>
    <tr><td><a href="#/provider-flutterwave">Flutterwave</a></td><td>30+ African countries</td><td>NGN, GHS, KES, USD, ZAR, XOF, XAF, etc.</td></tr>
    <tr><td><a href="#/provider-monnify">Monnify</a></td><td>Nigeria</td><td>NGN</td></tr>
    <tr><td><a href="#/provider-remita">Remita</a></td><td>Nigeria</td><td>NGN</td></tr>
  </table></div>
  </section>

  <section>
  <h2 id="glance">At a glance</h2>
  ${code('bash','install', `npm install @use-africa-pay/core`)}
  ${code('tsx','App.tsx', `import { useAfricaPay, PaystackAdapter } from '@use-africa-pay/core';

const { initializePayment, loading } = useAfricaPay();

initializePayment({
  provider: 'paystack',
  adapter: PaystackAdapter,
  publicKey: 'YOUR_PUBLIC_KEY',
  amount: 500000, // ₦5,000 in kobo
  currency: 'NGN',
  reference: 'unique_ref_' + Date.now(),
  user: { email: 'customer@example.com', name: 'John Doe' },
  onSuccess: (response) => console.log(response),
});`)}
  <p>Continue to <a href="#/installation">Installation</a> or jump straight to <a href="#/quick-start">Quick Start</a>.</p>
  </section>
  `
};

function railDiagram(){
  const providers = [
    {n:"Paystack", c:"#0BA4DB"}, {n:"Flutterwave", c:"#F5A623"},
    {n:"Monnify", c:"#7B5EF5"}, {n:"Remita", c:"#1D8A5F"}
  ];
  const ys = [30,74,118,162];
  let nodes = providers.map((p,i)=>`
    <rect x="0" y="${ys[i]}" width="118" height="30" rx="7" fill="none" stroke="${p.c}" stroke-width="1.6"/>
    <circle cx="14" cy="${ys[i]+15}" r="4" fill="${p.c}"/>
    <text x="26" y="${ys[i]+19}" fill="var(--ink-soft)">${p.n}</text>
    <path d="M118 ${ys[i]+15} C 170 ${ys[i]+15}, 190 96, 230 96" stroke="${p.c}" stroke-width="1.4" fill="none" opacity="0.55"/>
  `).join("");
  return `<svg viewBox="0 0 460 192" class="rail-node" fill="var(--ink-soft)">
    ${nodes}
    <rect x="232" y="66" width="150" height="60" rx="10" fill="var(--rail)"/>
    <text x="307" y="92" fill="#fff" text-anchor="middle" font-weight="600" style="font-family:'Space Grotesk';font-size:12px">useAfricaPay()</text>
    <text x="307" y="110" fill="#EAF0FF" text-anchor="middle" style="font-size:10px">one hook, one response</text>
    <path d="M382 96 C 410 96, 410 96, 434 96" stroke="var(--rail)" stroke-width="1.6" fill="none" marker-end="url(#arrow)"/>
    <circle cx="446" cy="96" r="9" fill="none" stroke="var(--rail)" stroke-width="1.6"/>
    <path d="M442 96 l3 3 l6 -7" stroke="var(--rail)" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/* ---------------- INSTALLATION ---------------- */
PAGES["installation"] = {
  kicker: "Getting Started", title: "Installation",
  lede: "Add the core package to a React project, plus the optional Next.js and React Native wrappers if you need them.",
  html: `
  <section>
  <h2 id="core">Install the core package</h2>
  ${code('bash','npm', `npm install @use-africa-pay/core`)}
  ${code('bash','yarn', `yarn add @use-africa-pay/core`)}
  ${code('bash','pnpm', `pnpm add @use-africa-pay/core`)}
  </section>

  <section>
  <h2 id="platform">Platform packages</h2>
  <p>Two additional packages wrap the core SDK for specific environments:</p>
  <div class="table-wrap"><table>
    <tr><th>Package</th><th>Version</th><th>Use for</th></tr>
    <tr><td><code>@use-africa-pay/core</code></td><td>2.1.0</td><td>Any React app (Vite, CRA, remix, plain React)</td></tr>
    <tr><td><code>@use-africa-pay/next</code></td><td>0.3.0</td><td>Next.js apps — handles server/client component boundaries</td></tr>
    <tr><td><code>@use-africa-pay/react-native</code></td><td>0.1.2</td><td>React Native / Expo apps</td></tr>
  </table></div>
  <p>The Next.js and React Native packages depend on <code>@use-africa-pay/core</code> for the underlying logic — install core alongside whichever wrapper you use.</p>
  ${code('bash','Next.js', `npm install @use-africa-pay/core @use-africa-pay/next`)}
  ${code('bash','React Native', `npm install @use-africa-pay/core @use-africa-pay/react-native`)}
  </section>

  <section>
  <h2 id="requirements">Requirements</h2>
  <ul>
    <li>React 16.8 or higher (hooks support)</li>
    <li>TypeScript 4.0 or higher (recommended, not required)</li>
    <li>A modern browser with ES6 support</li>
  </ul>
  <div class="callout warn">
    <span class="callout-title">Next.js note</span>
    <p>The hook touches <code>window</code> to load provider scripts, so call it from a Client Component (<code>"use client"</code>), not a Server Component.</p>
  </div>
  </section>
  `
};

/* ---------------- QUICK START ---------------- */
PAGES["quick-start"] = {
  kicker: "Getting Started", title: "Quick Start",
  lede: "Wire up a working payment button in under two minutes.",
  html: `
  <ol class="steps">
    <li>
      <h3 style="margin-top:0">Install the package</h3>
      ${code('bash','', `npm install @use-africa-pay/core`)}
    </li>
    <li>
      <h3 style="margin-top:0">Import the hook and an adapter</h3>
      <p>Each provider ships its own adapter — <code>PaystackAdapter</code>, <code>FlutterwaveAdapter</code>, <code>MonnifyAdapter</code>, or <code>RemitaAdapter</code> — imported from the same package.</p>
      ${code('tsx','', `import { useAfricaPay, PaystackAdapter } from '@use-africa-pay/core';`)}
    </li>
    <li>
      <h3 style="margin-top:0">Call initializePayment</h3>
      ${code('tsx','PaymentButton.tsx', `const PaymentButton = () => {
  const { initializePayment, loading, error, reset } = useAfricaPay();

  const handlePayment = () => {
    initializePayment({
      provider: 'paystack',
      adapter: PaystackAdapter,
      publicKey: 'YOUR_PUBLIC_KEY',
      amount: 500000, // Amount in kobo (₦5,000)
      currency: 'NGN',
      reference: 'unique_ref_' + Date.now(),
      user: {
        email: 'customer@example.com',
        name: 'John Doe',
      },
      onSuccess: (response) => {
        console.log('Payment successful:', response);
      },
      onClose: () => {
        console.log('Payment closed');
      },
      onError: (error) => {
        console.error('Payment error:', error.message);
      },
    });
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay ₦5,000'}
      </button>
      {error && (
        <div>
          <p>Error: {error.message}</p>
          {error.suggestion && <p>Tip: {error.suggestion}</p>}
          <button onClick={reset}>Try Again</button>
        </div>
      )}
    </div>
  );
};`)}
    </li>
    <li>
      <h3 style="margin-top:0">Verify on your server</h3>
      <p>Treat <code>onSuccess</code> as a UI signal only. Before granting access or shipping an order, verify the transaction reference against the provider's API using your secret key — see <a href="#/security">Security Best Practices</a>.</p>
    </li>
  </ol>
  <div class="callout">
    <span class="callout-title">Amounts are always in the lowest denomination</span>
    <p>Multiply Naira by 100 before passing <code>amount</code> — this matches how every supported provider expects it, and avoids floating-point rounding errors.</p>
  </div>
  `
};

/* ---------------- CORE API PAGES ---------------- */
PAGES["api-useafricapay"] = {
  kicker: "Core API", title: "useAfricaPay()",
  lede: "The main hook for initializing a payment against any supported provider.",
  html: `
  <section>
  <h2 id="returns">Returns</h2>
  ${code('typescript','', `{
  initializePayment: (props: InitializePaymentProps) => void;
  loading: boolean;
  error: PaymentError | null;
  reset: () => void;
  getProviderInstance: () => any;
}`)}
  <div class="table-wrap"><table>
    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
    <tr><td><code>initializePayment</code></td><td>function</td><td>Starts a payment for the given provider config.</td></tr>
    <tr><td><code>loading</code></td><td>boolean</td><td>True while a payment is in progress.</td></tr>
    <tr><td><code>error</code></td><td>PaymentError | null</td><td>The last error, if any. Cleared by <code>reset()</code>.</td></tr>
    <tr><td><code>reset</code></td><td>function</td><td>Clears <code>error</code> and resets internal state.</td></tr>
    <tr><td><code>getProviderInstance</code></td><td>function</td><td>Returns the underlying provider SDK instance, once loaded.</td></tr>
  </table></div>
  </section>

  <section>
  <h2 id="example">Example</h2>
  ${code('tsx','', `const { initializePayment, loading, error, reset } = useAfricaPay();`)}
  </section>

  <section>
  <h2 id="params">initializePayment(props)</h2>
  <p>Accepts one of <code>PaystackConfig</code>, <code>FlutterwaveConfig</code>, <code>MonnifyConfig</code>, or <code>RemitaConfig</code> — see the <a href="#/types">Type Reference</a> for the full shape of each, and the individual <a href="#/provider-paystack">provider pages</a> for required fields.</p>
  </section>
  `
};

PAGES["api-preflight"] = {
  kicker: "Core API", title: "usePaymentPreflight()",
  lede: "Validate a payment configuration before showing UI, so a user never gets three taps deep into checkout before discovering a missing field.",
  html: `
  <section>
  <h2 id="returns">Returns</h2>
  ${code('typescript','', `{
  checkPreflight: (config: PreflightConfig) => PreflightCheckResult;
  simulatePayment: (config: PreflightConfig) => Promise<boolean>;
  checking: boolean;
}`)}
  <h3 id="result">PreflightCheckResult</h3>
  ${code('typescript','', `{
  isValid: boolean;
  issues: string[];
  warnings: string[];
  canProceed: boolean;
}`)}
  </section>
  <section>
  <h2 id="example">Example</h2>
  ${code('tsx','CheckoutForm.tsx', `import { usePaymentPreflight } from '@use-africa-pay/core';

const CheckoutForm = () => {
  const { checkPreflight } = usePaymentPreflight();

  const handleValidation = () => {
    const result = checkPreflight({
      amount: 500000,
      currency: 'NGN',
      provider: 'paystack',
      user: { email: 'customer@example.com' }
    });

    if (!result.isValid) {
      console.error('Validation issues:', result.issues);
      return;
    }

    if (result.warnings.length > 0) {
      console.warn('Warnings:', result.warnings);
    }

    // Proceed with payment
  };
};`)}
  </section>
  `
};

PAGES["api-analytics"] = {
  kicker: "Core API", title: "usePaymentAnalytics()",
  lede: "Track success rates per provider so you can route future payments to whichever rail is actually converting.",
  html: `
  <section>
  <h2 id="returns">Returns</h2>
  ${code('typescript','', `{
  recordPayment: (metric: Omit<PaymentMetric, 'timestamp' | 'duration'>) => void;
  startTracking: () => void;
  getProviderStats: (provider?: PaymentProvider) => ProviderStats[];
  getBestProvider: () => PaymentProvider | null;
  clearHistory: () => void;
  getRecentFailures: (count?: number) => PaymentMetric[];
  metrics: PaymentMetric[];
}`)}
  <h3 id="stats">ProviderStats</h3>
  ${code('typescript','', `{
  provider: PaymentProvider;
  totalAttempts: number;
  successful: number;
  failed: number;
  cancelled: number;
  successRate: number;
  avgDuration?: number;
  lastUsed: number;
}`)}
  </section>
  <section>
  <h2 id="example">Example</h2>
  ${code('tsx','PaymentDashboard.tsx', `import { usePaymentAnalytics } from '@use-africa-pay/core';

const PaymentDashboard = () => {
  const { recordPayment, startTracking, getProviderStats, getBestProvider } = usePaymentAnalytics({
    maxHistorySize: 100,
    persistToStorage: true
  });

  const handlePayment = async () => {
    startTracking();
    // ... initialize payment
  };

  const handleSuccess = (response) => {
    recordPayment({
      provider: 'paystack',
      status: 'success',
      amount: 500000,
    });
  };

  const stats = getProviderStats();
  const bestProvider = getBestProvider();
};`)}
  </section>
  `
};

PAGES["api-retry"] = {
  kicker: "Core API", title: "usePaymentRetry()",
  lede: "Automatic retry logic with exponential backoff for transient failures — dropped connections, timeouts, flaky script loads.",
  html: `
  <section>
  <h2 id="returns">Returns</h2>
  ${code('typescript','', `{
  executeWithRetry: <T>(operation: () => Promise<T>, onError?: (error: PaymentError) => void) => Promise<T>;
  manualRetry: <T>(operation: () => Promise<T>) => Promise<T>;
  reset: () => void;
  retryState: RetryState;
}`)}
  <h3 id="state">RetryState</h3>
  ${code('typescript','', `{
  attempt: number;
  isRetrying: boolean;
  canRetry: boolean;
  nextRetryIn?: number;
}`)}
  </section>
  <section>
  <h2 id="example">Example</h2>
  ${code('tsx','PaymentComponent.tsx', `import { usePaymentRetry } from '@use-africa-pay/core';

const PaymentComponent = () => {
  const { executeWithRetry, retryState, reset } = usePaymentRetry({
    maxAttempts: 3,
    exponentialBackoff: true,
    onRetryAttempt: (attempt, error) => {
      console.log(\`Retry attempt \${attempt}:\`, error.message);
    }
  });

  const handlePayment = async () => {
    try {
      await executeWithRetry(async () => {
        await initializePayment({ /* config */ });
      });
    } catch (error) {
      console.error('Failed after all retries:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={retryState.isRetrying}>
        {retryState.isRetrying ? \`Retrying (\${retryState.attempt})\` : 'Pay Now'}
      </button>
      {retryState.nextRetryIn && <span>Retrying in {retryState.nextRetryIn}ms...</span>}
    </div>
  );
};`)}
  </section>
  `
};

/* ---------------- PROVIDER PAGES ---------------- */
function providerPage({name, color, required, optional, example, notes}){
  const reqRows = required.map(r=>`<tr><td><code>${r[0]}</code></td><td><span class="field-req">required</span></td><td>${r[1]}</td></tr>`).join("");
  const optRows = (optional||[]).map(r=>`<tr><td><code>${r[0]}</code></td><td><span class="field-opt">optional</span></td><td>${r[1]}</td></tr>`).join("");
  return `
  <section>
  <h2 id="fields">Fields</h2>
  <div class="table-wrap"><table>
    <tr><th>Field</th><th></th><th>Description</th></tr>
    ${reqRows}${optRows}
  </table></div>
  </section>
  <section>
  <h2 id="example">Example</h2>
  ${code('tsx', `${name}Adapter`, example)}
  </section>
  ${notes ? `<section><h2 id="notes">Notes</h2>${notes}</section>` : ''}
  `;
}

PAGES["provider-paystack"] = {
  kicker: "Providers", title: "Paystack", accent:"#0BA4DB",
  lede: "Nigeria, Ghana, Kenya, South Africa · NGN, GHS, KES, USD, ZAR",
  html: providerPage({
    name: "Paystack",
    required: [
      ["publicKey","Your Paystack public key"],
      ["user.email","Customer email address"],
      ["amount","Amount in kobo (10000 = ₦100)"],
      ["currency","NGN, GHS, KES, USD, or ZAR"],
      ["reference","Unique transaction reference"],
    ],
    optional: [
      ["channels","Payment channels (card, bank, etc.)"],
      ["user.name","Customer name"],
      ["user.phonenumber","Customer phone number"],
      ["metadata","Additional metadata"],
    ],
    example: `import { useAfricaPay, PaystackAdapter } from '@use-africa-pay/core';

initializePayment({
  provider: 'paystack',
  adapter: PaystackAdapter,
  publicKey: 'pk_test_xxxx',
  amount: 500000,
  currency: 'NGN',
  reference: 'PAY_' + Date.now(),
  user: {
    email: 'customer@example.com',
    name: 'John Doe',
  },
  channels: ['card', 'bank'],
});`
  })
};

PAGES["provider-flutterwave"] = {
  kicker: "Providers", title: "Flutterwave", accent:"#F5A623",
  lede: "30+ African countries · NGN, GHS, KES, USD, ZAR, XOF, XAF, and more",
  html: providerPage({
    name: "Flutterwave",
    required: [
      ["publicKey","Your Flutterwave public key"],
      ["user.email","Customer email address"],
      ["user.phonenumber / user.phone","Customer phone number"],
      ["amount","Amount in kobo"],
      ["currency","Currency code"],
      ["reference","Unique transaction reference"],
    ],
    optional: [
      ["payment_options","e.g. 'card, banktransfer'"],
      ["user.name","Customer name"],
      ["metadata","Additional metadata"],
    ],
    example: `import { useAfricaPay, FlutterwaveAdapter } from '@use-africa-pay/core';

initializePayment({
  provider: 'flutterwave',
  adapter: FlutterwaveAdapter,
  publicKey: 'FLWPUBK_TEST-xxxx',
  amount: 500000,
  currency: 'NGN',
  reference: 'FLW_' + Date.now(),
  user: {
    email: 'customer@example.com',
    phonenumber: '08012345678',
    name: 'John Doe',
  },
  payment_options: 'card, banktransfer',
});`,
    notes: `<div class="callout warn"><span class="callout-title">Phone number is required</span><p>Unlike Paystack, Flutterwave validates the phone number server-side. Missing or malformed numbers surface as a <code>ValidationError</code> before the modal opens.</p></div>`
  })
};

PAGES["provider-monnify"] = {
  kicker: "Providers", title: "Monnify", accent:"#7B5EF5",
  lede: "Nigeria · NGN — strong bank transfer support",
  html: providerPage({
    name: "Monnify",
    required: [
      ["publicKey","Your Monnify public key"],
      ["contractCode","Your Monnify contract code"],
      ["user.email","Customer email address"],
      ["user.name","Customer name — required"],
      ["amount","Amount in kobo"],
      ["currency","Currency code"],
      ["reference","Unique transaction reference"],
    ],
    optional: [["metadata","Additional metadata"]],
    example: `import { useAfricaPay, MonnifyAdapter } from '@use-africa-pay/core';

initializePayment({
  provider: 'monnify',
  adapter: MonnifyAdapter,
  publicKey: 'MK_TEST_xxxx',
  contractCode: 'YOUR_CONTRACT_CODE',
  amount: 500000,
  currency: 'NGN',
  reference: 'MON_' + Date.now(),
  user: {
    email: 'customer@example.com',
    name: 'John Doe',
  },
});`
  })
};

PAGES["provider-remita"] = {
  kicker: "Providers", title: "Remita", accent:"#1D8A5F",
  lede: "Nigeria · NGN — common for government and enterprise payments",
  html: providerPage({
    name: "Remita",
    required: [
      ["publicKey","Your Remita public key"],
      ["merchantId","Your Remita merchant ID"],
      ["serviceTypeId","Your Remita service type ID"],
      ["user.email","Customer email address"],
      ["user.name","Customer name — required (or firstName/lastName)"],
      ["amount","Amount in kobo"],
      ["currency","Currency code"],
      ["reference","Unique transaction reference"],
    ],
    example: `import { useAfricaPay, RemitaAdapter } from '@use-africa-pay/core';

initializePayment({
  provider: 'remita',
  adapter: RemitaAdapter,
  testMode: true, // Set to false for Live
  publicKey: 'YOUR_REMITA_PUBLIC_KEY',
  merchantId: 'YOUR_MERCHANT_ID',
  serviceTypeId: 'YOUR_SERVICE_TYPE_ID',
  amount: 500000,
  currency: 'NGN',
  reference: 'RMT_' + Date.now(),
  user: {
    email: 'customer@example.com',
    name: 'John Doe',
    // Or use: firstName: 'John', lastName: 'Doe'
  },
});`,
    notes: `
    <h3 id="test-mode">Test mode</h3>
    <p>Remita requires explicit environment configuration:</p>
    <ul>
      <li><code>testMode: true</code> — Demo / Sandbox (default)</li>
      <li><code>testMode: false</code> — Live production</li>
    </ul>
    <h3 id="names">Name handling</h3>
    <p>Remita requires both a first and last name. Provide either a full <code>name</code> (auto-parsed into <code>firstName</code>/<code>lastName</code>), or supply <code>firstName</code> and <code>lastName</code> directly. Titles like "Mr.", "Dr.", and "Chief" are stripped automatically.</p>
    <div class="callout danger"><span class="callout-title">Going live</span><p>Forgetting to set <code>testMode: false</code> is the single most common reason Remita payments "don't work in production" — the SDK defaults to sandbox.</p></div>
    `
  })
};

/* ---------------- ADVANCED ---------------- */
PAGES["advanced"] = {
  kicker: "Guides", title: "Advanced Features",
  lede: "Custom adapters, server-side verification, and multi-provider routing strategies.",
  html: `
  <section>
  <h2 id="custom-adapter">Custom adapter implementation</h2>
  <p>Build an adapter for any provider not shipped with the core package by implementing <code>AdapterInterface</code>.</p>
  ${code('typescript','', `import { AdapterInterface, AdapterConfig } from '@use-africa-pay/core';

const CustomAdapter: AdapterInterface = {
  loadScript: async (options?: { testMode?: boolean }) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = options?.testMode
        ? 'https://test.provider.com/sdk.js'
        : 'https://provider.com/sdk.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load script'));
      document.head.appendChild(script);
    });
  },

  initialize: (config: AdapterConfig) => {
    window.ProviderSDK.initialize({
      key: config.publicKey,
      amount: config.amount,
      email: config.user.email,
      onSuccess: config.onSuccess,
      onClose: config.onClose,
      onError: config.onError,
    });
  },

  getInstance: () => window.ProviderSDK,
};

initializePayment({
  provider: 'custom' as any,
  adapter: CustomAdapter,
  // ... other config
});`)}
  </section>

  <section>
  <h2 id="server-verification">Server-side verification</h2>
  <p>Always verify payments on your backend before granting access — the client-side <code>onSuccess</code> callback is a UX signal, not proof of payment.</p>
  ${code('typescript','server.ts (Express)', `app.post('/verify-payment', async (req, res) => {
  const { reference, provider } = req.body;

  try {
    let verified = false;

    if (provider === 'paystack') {
      const response = await axios.get(
        \`https://api.paystack.co/transaction/verify/\${reference}\`,
        { headers: { Authorization: \`Bearer \${process.env.PAYSTACK_SECRET_KEY}\` } }
      );
      verified = response.data.data.status === 'success';
    } else if (provider === 'flutterwave') {
      const response = await axios.get(
        \`https://api.flutterwave.com/v3/transactions/\${reference}/verify\`,
        { headers: { Authorization: \`Bearer \${process.env.FLUTTERWAVE_SECRET_KEY}\` } }
      );
      verified = response.data.data.status === 'successful';
    }

    if (verified) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});`)}
  </section>

  <section>
  <h2 id="multi-provider">Multi-provider strategy</h2>
  <p>Combine <code>usePaymentAnalytics</code> with <code>useAfricaPay</code> to route new payments toward whichever provider has been converting best.</p>
  ${code('tsx','SmartPayment.tsx', `const SmartPayment = () => {
  const { getBestProvider, recordPayment, startTracking } = usePaymentAnalytics();
  const { initializePayment } = useAfricaPay();

  const handlePayment = async () => {
    const bestProvider = getBestProvider() || 'paystack';

    startTracking();

    initializePayment({
      provider: bestProvider,
      adapter: bestProvider === 'paystack' ? PaystackAdapter :
               bestProvider === 'flutterwave' ? FlutterwaveAdapter :
               bestProvider === 'monnify' ? MonnifyAdapter : RemitaAdapter,
      // ... config
      onSuccess: (response) => {
        recordPayment({ provider: bestProvider, status: 'success', amount: 500000 });
      },
      onError: (error) => {
        recordPayment({ provider: bestProvider, status: 'failed', amount: 500000, error: error.message });
      },
    });
  };
};`)}
  </section>
  `
};

/* ---------------- ERROR HANDLING ---------------- */
PAGES["error-handling"] = {
  kicker: "Guides", title: "Error Handling",
  lede: "Every error extends a common PaymentError shape, with a suggestion field aimed at whoever's debugging at 2am.",
  html: `
  <section>
  <h2 id="types">Error types</h2>
  <h3 id="payment-error">PaymentError <span class="tag">base</span></h3>
  ${code('typescript','', `{
  message: string;
  code: string;
  provider?: PaymentProvider;
  suggestion?: string;
  rawError?: unknown;
}`)}
  <h3 id="validation-error">ValidationError</h3>
  <p>Thrown when required fields are missing or invalid.</p>
  ${code('typescript','', `{
  message: string;
  code: 'VALIDATION_ERROR';
  suggestion?: string;
}`)}
  <h3 id="network-error">NetworkError</h3>
  <p>Thrown when script loading fails or a network issue occurs.</p>
  ${code('typescript','', `{
  message: string;
  code: 'NETWORK_ERROR';
  provider?: PaymentProvider;
  suggestion: 'Check your internet connection and try again.';
}`)}
  <h3 id="provider-error">ProviderError</h3>
  <p>Thrown when the provider itself returns an error.</p>
  ${code('typescript','', `{
  message: string;
  code: 'PROVIDER_ERROR';
  provider: PaymentProvider;
  suggestion?: string;
  rawError?: any;
}`)}
  </section>

  <section>
  <h2 id="handling">Handling errors</h2>
  ${code('tsx','', `initializePayment({
  // ... config
  onError: (error) => {
    if (error instanceof ValidationError) {
      alert(\`Validation Error: \${error.suggestion}\`);
    } else if (error instanceof NetworkError) {
      alert(\`Network Error: \${error.suggestion}\`);
    } else if (error instanceof ProviderError) {
      console.error('Provider Error:', {
        code: error.code,
        provider: error.provider,
        message: error.message,
        raw: error.rawError,
      });
    } else {
      alert('An unexpected error occurred');
    }
  },
});`)}
  </section>

  <section>
  <h2 id="recovery">Error recovery</h2>
  <p>Use <code>ErrorRecovery</code> for context-aware, provider-specific suggestions.</p>
  ${code('tsx','', `import { ErrorRecovery } from '@use-africa-pay/core';

const handleError = (error: PaymentError) => {
  const suggestion = ErrorRecovery.getSuggestion(error, 'paystack');

  console.log(suggestion.title);      // "Connection Issue"
  console.log(suggestion.message);    // Detailed explanation
  console.log(suggestion.actions);    // Suggested actions
  console.log(suggestion.severity);   // "low" | "medium" | "high"

  if (ErrorRecovery.isRetryable(error)) {
    // Implement retry logic
  }
};`)}
  </section>
  `
};

/* ---------------- SECURITY ---------------- */
PAGES["security"] = {
  kicker: "Guides", title: "Security Best Practices",
  lede: "What the library handles for you, and what's still your responsibility.",
  html: `
  <section>
  <h2 id="built-in">Built into the library</h2>
  <div class="card-grid">
    <div class="feature-card"><h4>Input sanitization</h4><p>All user inputs sanitized automatically.</p></div>
    <div class="feature-card"><h4>HTTPS enforcement</h4><p>Provider scripts load over HTTPS only.</p></div>
    <div class="feature-card"><h4>Error redaction</h4><p>Sensitive data stripped from logs.</p></div>
    <div class="feature-card"><h4>Timeout protection</h4><p>30-second timeout with retry logic.</p></div>
    <div class="feature-card"><h4>No secret keys</h4><p>Only public keys are ever used client-side.</p></div>
    <div class="feature-card"><h4>PCI-DSS ready</h4><p>Follows payment security best practices.</p></div>
  </div>
  </section>

  <section>
  <h2 id="your-responsibility">Your responsibility</h2>
  <ol>
    <li><strong>Never expose secret keys</strong> — only public keys belong in client-side code.</li>
    <li><strong>Always verify on the server</strong> — never trust <code>onSuccess</code> alone.</li>
    <li><strong>Serve over HTTPS</strong> in production.</li>
    <li><strong>Generate unique references</strong> and verify them server-side.</li>
    <li><strong>Double-check sanitized inputs</strong> — the library helps, it doesn't replace your own validation.</li>
    <li><strong>Rate-limit your payment endpoints.</strong></li>
    <li><strong>Monitor for fraud patterns.</strong></li>
    <li><strong>Keep the SDK updated.</strong></li>
    <li><strong>Use test keys in development</strong> — never live keys.</li>
    <li><strong>Log securely</strong> — keep sensitive data out of logs.</li>
  </ol>
  </section>

  <section>
  <h2 id="verify">Server-side verification</h2>
  ${code('typescript','', `app.post('/verify-payment', async (req, res) => {
  const { reference, provider } = req.body;

  const verification = await verifyWithProvider(reference, provider);

  if (verification.success) {
    if (verification.amount === expectedAmount) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Amount mismatch' });
    }
  } else {
    res.json({ success: false, message: 'Payment not verified' });
  }
});`)}
  <div class="callout danger">
    <span class="callout-title">Amount mismatch is not an edge case</span>
    <p>Always compare the verified amount against what you expected the customer to pay — client-side amount tampering is the most common attack against payment integrations of this shape.</p>
  </div>
  </section>
  `
};

/* ---------------- EXAMPLES ---------------- */
PAGES["examples"] = {
  kicker: "Guides", title: "Examples",
  lede: "Three complete integrations: e-commerce checkout, subscriptions, and donations.",
  html: `
  <section>
  <h2 id="ecommerce">E-commerce checkout</h2>
  ${code('tsx','CheckoutPage.tsx', `import { useAfricaPay, PaystackAdapter } from '@use-africa-pay/core';

const CheckoutPage = () => {
  const { initializePayment, loading, error, reset } = useAfricaPay();
  const [cart] = useState([
    { id: 1, name: 'Product 1', price: 15000 },
    { id: 2, name: 'Product 2', price: 35000 },
  ]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    initializePayment({
      provider: 'paystack',
      adapter: PaystackAdapter,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      amount: total * 100,
      currency: 'NGN',
      reference: \`ORDER_\${Date.now()}\`,
      user: { email: 'customer@example.com', name: 'John Doe' },
      metadata: { cartItems: cart, orderId: 'ORDER_' + Date.now() },
      onSuccess: async (response) => {
        const verified = await fetch('/api/verify-payment', {
          method: 'POST',
          body: JSON.stringify({ reference: response.reference }),
        }).then(r => r.json());

        if (verified.success) window.location.href = '/order-success';
      },
    });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>Total: ₦{total.toLocaleString()}</div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <ErrorDisplay error={error} onRetry={reset} />}
    </div>
  );
};`)}
  </section>

  <section>
  <h2 id="subscription">Subscription payment</h2>
  ${code('tsx','SubscriptionPage.tsx', `import { useAfricaPay, FlutterwaveAdapter } from '@use-africa-pay/core';

const SubscriptionPage = () => {
  const { initializePayment } = useAfricaPay();

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    const amount = plan === 'monthly' ? 500000 : 5000000;

    initializePayment({
      provider: 'flutterwave',
      adapter: FlutterwaveAdapter,
      publicKey: process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY,
      amount,
      currency: 'NGN',
      reference: \`SUB_\${plan}_\${Date.now()}\`,
      user: { email: 'customer@example.com', phonenumber: '08012345678' },
      metadata: { plan, billingCycle: plan },
      onSuccess: (response) => {
        fetch('/api/activate-subscription', {
          method: 'POST',
          body: JSON.stringify({ reference: response.reference, plan }),
        });
      },
    });
  };

  return (
    <div>
      <h2>Choose a Plan</h2>
      <button onClick={() => handleSubscribe('monthly')}>Monthly — ₦5,000</button>
      <button onClick={() => handleSubscribe('yearly')}>Yearly — ₦50,000 (Save 17%)</button>
    </div>
  );
};`)}
  </section>

  <section>
  <h2 id="donation">Donation form</h2>
  ${code('tsx','DonationForm.tsx', `import { useAfricaPay, MonnifyAdapter } from '@use-africa-pay/core';

const DonationForm = () => {
  const { initializePayment, loading } = useAfricaPay();
  const [amount, setAmount] = useState(10000);

  const handleDonate = () => {
    initializePayment({
      provider: 'monnify',
      adapter: MonnifyAdapter,
      publicKey: process.env.NEXT_PUBLIC_MONNIFY_KEY,
      contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE,
      amount: amount * 100,
      currency: 'NGN',
      reference: \`DONATE_\${Date.now()}\`,
      user: { email: 'donor@example.com', name: 'John Doe' },
      metadata: { type: 'donation', campaign: 'charity-drive' },
      onSuccess: (response) => alert('Thank you for your donation!'),
    });
  };

  return (
    <div>
      <h2>Make a Donation</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount in Naira" />
      <button onClick={handleDonate} disabled={loading}>Donate ₦{amount.toLocaleString()}</button>
    </div>
  );
};`)}
  </section>
  `
};

/* ---------------- MIGRATION ---------------- */
PAGES["migration"] = {
  kicker: "Guides", title: "Migration Guide",
  lede: "Moving off a direct provider SDK onto a unified config shape.",
  html: `
  <section>
  <h2 id="paystack-direct">From the Paystack inline SDK</h2>
  <div class="migrate-grid">
    <div class="mg-before"><div class="mg-label">Before</div>
    ${code('tsx','', `import PaystackPop from '@paystack/inline-js';

const paystack = new PaystackPop();
paystack.newTransaction({
  key: 'pk_test_xxxx',
  amount: 500000,
  email: 'customer@example.com',
  onSuccess: (response) => console.log(response),
});`)}</div>
    <div class="mg-after"><div class="mg-label">After</div>
    ${code('tsx','', `import { useAfricaPay, PaystackAdapter } from '@use-africa-pay/core';

const { initializePayment } = useAfricaPay();

initializePayment({
  provider: 'paystack',
  adapter: PaystackAdapter,
  publicKey: 'pk_test_xxxx',
  amount: 500000,
  currency: 'NGN',
  reference: 'unique_ref',
  user: { email: 'customer@example.com' },
  onSuccess: (response) => console.log(response),
});`)}</div>
  </div>
  </section>

  <section>
  <h2 id="flutterwave-direct">From flutterwave-react-v3</h2>
  <div class="migrate-grid">
    <div class="mg-before"><div class="mg-label">Before</div>
    ${code('tsx','', `import Flutterwave from 'flutterwave-react-v3';

<Flutterwave
  publicKey="FLWPUBK_TEST-xxxx"
  amount={500000}
  email="customer@example.com"
  callback={(response) => console.log(response)}
/>`)}</div>
    <div class="mg-after"><div class="mg-label">After</div>
    ${code('tsx','', `import { useAfricaPay, FlutterwaveAdapter } from '@use-africa-pay/core';

const { initializePayment } = useAfricaPay();

initializePayment({
  provider: 'flutterwave',
  adapter: FlutterwaveAdapter,
  publicKey: 'FLWPUBK_TEST-xxxx',
  amount: 500000,
  currency: 'NGN',
  reference: 'unique_ref',
  user: { email: 'customer@example.com', phonenumber: '08012345678' },
  onSuccess: (response) => console.log(response),
});`)}</div>
  </div>
  </section>

  <section>
  <h2 id="key-changes">Key changes</h2>
  <ol>
    <li><strong>Unified API</strong> — all providers use the same <code>initializePayment</code> function.</li>
    <li><strong>Adapter pattern</strong> — pass an adapter instance for type safety.</li>
    <li><strong>Standardized response</strong> — every provider returns the same response shape.</li>
    <li><strong>Enhanced error handling</strong> — custom error types with suggestions.</li>
    <li><strong>Amount in kobo</strong> — always specify the lowest denomination.</li>
    <li><strong>Reference required</strong> — a unique transaction reference is mandatory.</li>
  </ol>
  </section>
  `
};

/* ---------------- TYPES ---------------- */
PAGES["types"] = {
  kicker: "Reference", title: "Type Reference",
  lede: "The full TypeScript surface — provider unions, config shapes, and the standardized response.",
  html: `
  <section>
  <h2 id="provider">PaymentProvider</h2>
  ${code('typescript','', `type PaymentProvider = "paystack" | "flutterwave" | "monnify" | "remita";`)}
  <h2 id="status">PaymentStatus</h2>
  ${code('typescript','', `type PaymentStatus = "pending" | "success" | "failed" | "cancelled";`)}
  </section>

  <section>
  <h2 id="user-config">UserConfig</h2>
  ${code('typescript','', `interface UserConfig {
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phonenumber?: string;
  phone?: string;
}`)}
  </section>

  <section>
  <h2 id="base-config">BaseConfig</h2>
  ${code('typescript','', `interface BaseConfig {
  amount: number; // In lowest denomination (kobo/cents)
  currency: "NGN" | "USD" | "GHS" | "KES";
  reference: string;
  publicKey: string;
  user: UserConfig;
  metadata?: Record<string, any>;
  onSuccess?: (response: PaymentResponse) => void;
  onClose?: () => void;
  onError?: (error: PaymentError) => void;
  adapter?: AdapterInterface;
  testMode?: boolean;
}`)}
  </section>

  <section>
  <h2 id="provider-configs">Provider configs</h2>
  ${code('typescript','', `interface PaystackConfig extends BaseConfig {
  provider: "paystack";
  channels?: string[];
}

interface FlutterwaveConfig extends BaseConfig {
  provider: "flutterwave";
  payment_options?: string;
}

interface MonnifyConfig extends BaseConfig {
  provider: "monnify";
  contractCode: string;
  user: UserConfig & { name: string };
}

interface RemitaConfig extends BaseConfig {
  provider: "remita";
  merchantId: string;
  serviceTypeId: string;
  user: UserConfig & { name: string };
}

type InitializePaymentProps =
  | PaystackConfig
  | FlutterwaveConfig
  | MonnifyConfig
  | RemitaConfig;`)}
  </section>

  <section>
  <h2 id="response">PaymentResponse</h2>
  ${code('typescript','', `interface PaymentResponse {
  status: PaymentStatus;
  message: string;
  reference: string;
  transactionId?: string;
  amount: number;
  currency: string;
  paidAt?: string; // ISO 8601 timestamp
  customer: {
    email: string;
    name?: string;
    phone?: string;
  };
  provider: PaymentProvider;
  metadata?: Record<string, any>;
  raw: unknown;
}`)}
  </section>
  `
};

/* ---------------- FAQ ---------------- */
PAGES["faq"] = {
  kicker: "Reference", title: "FAQ",
  lede: "",
  html: `
  <div class="faq-list">
    ${faqItem("Which payment provider should I use?", `<p>It depends on your footprint:</p>
      <ul>
        <li><strong>Paystack</strong> — Nigeria, Ghana, Kenya; strong documentation and reliability.</li>
        <li><strong>Flutterwave</strong> — 30+ African countries; best for pan-African coverage.</li>
        <li><strong>Monnify</strong> — Nigeria-focused, strong bank transfer support.</li>
        <li><strong>Remita</strong> — Nigeria-focused, common for government and enterprise payments.</li>
      </ul>
      <p>Use <a href="#/api-analytics">usePaymentAnalytics</a> to track which one actually performs best for your users.</p>`)}
    ${faqItem("Can I use multiple providers at once?", `<p>Yes — see <a href="#/advanced">Multi-Provider Strategy</a> for routing payments based on analytics or user preference.</p>`)}
    ${faqItem("Is this library free to use?", `<p>Yes, it's open-source and free (MIT). Each provider still charges its own transaction fees directly.</p>`)}
    ${faqItem("Why is amount required in kobo?", `<p>To avoid floating-point rounding errors, following standard payment-industry practice. Multiply your Naira amount by 100 before passing it to the library.</p>`)}
    ${faqItem("How do I handle test vs. live mode?", `<p>Use the <code>testMode</code> parameter — <code>true</code> (default) for sandbox, <code>false</code> for live. This is especially crucial for Remita, which requires it explicitly.</p>`)}
    ${faqItem("Can I use this with Next.js?", `<p>Yes — use <code>@use-africa-pay/next</code> alongside core. Call the hook from a Client Component, store public keys in environment variables, and verify payments server-side.</p>`)}
    ${faqItem("How do I get the underlying provider instance?", `${code('tsx','', `const { getProviderInstance } = useAfricaPay();\nconst provider = getProviderInstance();`)}`)}
    ${faqItem("Is it safe to use public keys in client-side code?", `<p>Yes — public keys are designed for client-side use. Secret keys never belong in the browser; always verify payments server-side with your secret key.</p>`)}
  </div>
  `
};
function faqItem(q,a){
  return `<div class="faq-item">
    <button class="faq-q"><span>${q}</span><span class="chev">+</span></button>
    <div class="faq-a"><div class="faq-a-inner">${a}</div></div>
  </div>`;
}

/* ---------------- TROUBLESHOOTING ---------------- */
PAGES["troubleshooting"] = {
  kicker: "Reference", title: "Troubleshooting",
  lede: "Common errors and how to resolve them.",
  html: `
  <section>
  <h2 id="script-load">Script loading failed</h2>
  <p><code>"Failed to load [provider] payment script"</code></p>
  <ul>
    <li>Check your internet connection.</li>
    <li>Verify you're not blocking the provider's CDN.</li>
    <li>Check whether the provider's CDN is down.</li>
    <li>Try a different provider temporarily.</li>
  </ul>
  </section>
  <section>
  <h2 id="invalid-key">Invalid public key</h2>
  <p><code>"Public key is required"</code> or <code>"Invalid public key"</code></p>
  <ul>
    <li>Verify you're using the public key, not the secret key.</li>
    <li>Ensure the key matches the environment (test vs. live).</li>
    <li>Check for typos.</li>
  </ul>
  </section>
  <section>
  <h2 id="amount-error">Amount validation error</h2>
  <p><code>"Amount must be greater than 0"</code></p>
  <ul>
    <li>Amount must be in kobo (Naira × 100).</li>
    <li>Amount must be a number, not a string.</li>
    <li>Amount can't be 0 or negative.</li>
  </ul>
  </section>
  <section>
  <h2 id="phone-required">Phone number required</h2>
  <p><code>"Phone number is required for Flutterwave"</code></p>
  <ul>
    <li>Provide <code>user.phonenumber</code> or <code>user.phone</code>.</li>
    <li>Ensure it's 10–15 digits.</li>
    <li>Include a country code where needed (e.g. +234).</li>
  </ul>
  </section>
  <section>
  <h2 id="name-required">Name required</h2>
  <p><code>"Customer name is required for Monnify/Remita"</code></p>
  <ul>
    <li>Provide <code>user.name</code> for Monnify and Remita.</li>
    <li>For Remita, <code>firstName</code>/<code>lastName</code> also work.</li>
    <li>Name can't be empty.</li>
  </ul>
  </section>
  <section>
  <h2 id="remita-mode">Remita works in test but not production</h2>
  <ul>
    <li>Explicitly set <code>testMode: false</code> for live payments.</li>
    <li>Confirm you're using the live merchant ID and service type ID.</li>
    <li>Check account status on the Remita dashboard.</li>
  </ul>
  </section>
  <section>
  <h2 id="debug-mode">Debug logging</h2>
  ${code('tsx','', `if (process.env.NODE_ENV === 'development') {
  console.log('[use-africa-pay] Debug mode enabled');
}

initializePayment({
  // ... config
  onError: (error) => {
    console.error('[use-africa-pay] Error details:', {
      code: error.code,
      provider: error.provider,
      message: error.message,
      suggestion: error.suggestion,
      raw: error.rawError,
    });
  },
});`)}
  </section>
  <section>
  <h2 id="get-help">Getting help</h2>
  <ul>
    <li>Check <a href="https://github.com/idyWilliams/use-africa-pay/issues" target="_blank" rel="noopener">GitHub Issues</a></li>
    <li>Review provider-specific documentation</li>
    <li>Enable debug logging and check the console</li>
    <li>Contact provider support for provider-specific issues</li>
  </ul>
  </section>
  `
};

/* ---------------- COMMUNITY & STATS ---------------- */
PAGES["community"] = {
  kicker: "Project", title: "Community & Stats",
  lede: "Live numbers from GitHub and npm, plus real mentions from around the web — no invented testimonials.",
  html: `
  <section>
  <h2 id="stats">Live stats</h2>
  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-label">GitHub stars</div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rail)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <img src="https://img.shields.io/github/stars/idyWilliams/use-africa-pay?style=flat-square&color=2D5A27&label=" alt="GitHub stars badge">
    </div>
    <div class="stat-card">
      <div class="stat-label">Forks</div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rail)"><path d="M6 2C4.9 2 4 2.9 4 4v7c0 1.1.9 2 2 2h1v4l2.5-2.5L12 17v-4h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6zm10 7H8V4h8v5z"/></svg>
      <img src="https://img.shields.io/github/forks/idyWilliams/use-africa-pay?style=flat-square&color=2D5A27&label=" alt="GitHub forks badge">
    </div>
    <div class="stat-card">
      <div class="stat-label">npm weekly downloads</div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rail)"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z"/></svg>
      <img src="https://img.shields.io/npm/dw/@use-africa-pay/core?style=flat-square&color=E8A23D&label=" alt="npm weekly downloads badge">
    </div>
    <div class="stat-card">
      <div class="stat-label">npm total downloads</div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rail)"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
      <img src="https://img.shields.io/npm/dt/@use-africa-pay/core?style=flat-square&color=E8A23D&label=" alt="npm total downloads badge">
    </div>
    <div class="stat-card">
      <div class="stat-label">Latest version</div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rail)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      <img src="https://img.shields.io/npm/v/@use-africa-pay/core?style=flat-square&color=2D5A27&label=" alt="npm version badge">
    </div>
    <div class="stat-card">
      <div class="stat-label">License</div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--rail)"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
      <img src="https://img.shields.io/github/license/idyWilliams/use-africa-pay?style=flat-square&color=6B7078&label=" alt="license badge">
    </div>
  </div>
  <div class="callout">
    <span class="callout-title">Why badges instead of a static number</span>
    <p>These are live shields.io badges pulling directly from the GitHub and npm registry APIs, so this page never goes stale. As of this write-up: 69 stars, 9 forks, and versions <code>core@2.1.0</code>, <code>next@0.3.0</code>, and <code>react-native@0.1.2</code> — all published and installable.</p>
  </div>
  </section>

  <section>
  <h2 id="packages">Package versions</h2>
  <div class="table-wrap"><table>
    <tr><th>Package</th><th>Version</th><th>npm</th></tr>
    <tr><td><code>@use-africa-pay/core</code></td><td>2.1.0</td><td><a href="https://www.npmjs.com/package/@use-africa-pay/core" target="_blank" rel="noopener">view →</a></td></tr>
    <tr><td><code>@use-africa-pay/next</code></td><td>0.3.0</td><td><a href="https://www.npmjs.com/package/@use-africa-pay/next" target="_blank" rel="noopener">view →</a></td></tr>
    <tr><td><code>@use-africa-pay/react-native</code></td><td>0.1.2</td><td><a href="https://www.npmjs.com/package/@use-africa-pay/react-native" target="_blank" rel="noopener">view →</a></td></tr>
  </table></div>
  </section>

  <section>
  <h2 id="contributors">Contributors</h2>
  <div class="callout">
    <span class="callout-title">Join our contributors</span>
    <p>This project is open to contributions from developers across Africa and beyond. Whether you're fixing bugs, adding features, improving documentation, or spreading the word — your help matters.</p>
  </div>
  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-label">Core Maintainer</div>
      <div style="font-weight:600; color:var(--ink); margin-top:8px;">Idorenyin Williams</div>
      <div style="font-size:12px; color:var(--muted); margin-top:4px;">Creator & Lead Developer</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Become a Contributor</div>
      <div style="margin-top:8px;">
        <a href="https://github.com/idyWilliams/use-africa-pay" target="_blank" rel="noopener" style="color:var(--rail); text-decoration:none; font-weight:500;">View on GitHub →</a>
      </div>
    </div>
  </div>
  </section>

  <section>
  <h2 id="around-the-web">Around the web</h2>
  <p>Real mentions and articles about use-africa-pay from developer communities and tech publications.</p>

  <div class="community-post">
    <div class="cp-head"><span class="cp-source">DEV Community — by Idorenyin Williams</span><span class="cp-date">dev.to</span></div>
    <p>The origin story behind the library: switching a project from Paystack to Flutterwave mid-build turned into a full refactor — inconsistent amount units, mismatched prop names, different response shapes — which is what use-africa-pay was built to prevent.</p>
    <p style="margin-top:8px"><a href="https://dev.to/idywilliams/i-got-tired-of-rewriting-payment-code-so-i-built-a-unified-sdk-for-africa-2e33" target="_blank" rel="noopener">Read the full post →</a></p>
  </div>

  <div class="community-post">
    <div class="cp-head"><span class="cp-source">HackerNoon — Proof of Usefulness</span><span class="cp-date">5049 POU Score</span></div>
    <p>use-africapay/core earns a 5049 Proof of Usefulness score by building a unified, type-safe payment SDK for Africa. This recognition highlights the practical impact and utility of the library in the African developer ecosystem.</p>
    <p style="margin-top:8px"><a href="https://hackernoon.com/useafricapaycore-earns-a-5049-proof-of-usefulness-score-by-building-a-unified-type-safe-payment-sdk-for-africa" target="_blank" rel="noopener">Read the HackerNoon article →</a></p>
  </div>
  </section>

  <section>
  <h2 id="contribute">Contribute</h2>
  <p>Issues and pull requests are welcome on <a href="https://github.com/idyWilliams/use-africa-pay" target="_blank" rel="noopener">GitHub</a>. See <code>CONTRIBUTING.md</code> in the repository for guidelines.</p>
  </section>
  `
};
