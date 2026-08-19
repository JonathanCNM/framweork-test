export const M2M_SPONSOR = "Sponsored by Leap Financial";

export const M2M_PATRIOT_NOTICE =
  "USA PATRIOT Act Notice: To help the government fight the funding of terrorism and money laundering activities, federal law requires all financial institutions to obtain, verify, and record information that identifies each person who opens an account.";

export const M2M_CONSENT_TITLE = "Transfer money instantly";

export const M2M_CONSENT_SUBTITLE =
  "Send money from your US Account to Mexico in minutes.";

export const M2M_TERMS_ITEMS = [
  { id: "privacy-policy", label: "Privacy Policy" },
  { id: "leap-privacy", label: "Leap Privacy Notice" },
  { id: "crb-privacy", label: "Cross River Bank Privacy Notice" },
  { id: "user-agreement", label: "User Agreement" },
  { id: "transaction-policy", label: "Transaction Policy" },
] as const;

export type M2MTermsItemId = (typeof M2M_TERMS_ITEMS)[number]["id"];

export const M2M_ESIGN_TITLE =
  'CROSS RIVER BANK CONSENT TO ELECTRONIC SIGNATURES AND COMMUNICATIONS ("E-SIGN CONSENT")';

export const M2M_ESIGN_IMPORTANT = "IMPORTANT - PLEASE READ CAREFULLY";

export const M2M_ESIGN_UPDATED = "Last updated: November 2024";

export const M2M_ESIGN_SECTION =
  "Delivery of Electronic Communications and Use of Electronic Signatures.";

export const M2M_ESIGN_PARAGRAPHS = [
  "This E-SIGN Consent allows SEND, Cross River Bank (\"CRB\"), their affiliates, and third-party service providers (\"we,\" \"us,\" \"our\") to provide you with electronic versions of communications, agreements, and disclosures that we are required to provide in writing.",
  "The following E-Communication Disclosure (\"Disclosure\") applies to any and all communications or disclosures that SEND is legally required to provide to you in writing in connection with your account and the services you use.",
];

export const M2M_PRIVACY_TITLE = "SEND Privacy Policy";

export const M2M_PRIVACY_COMPANY = "SEND by Leap Financial Inc.";

export const M2M_PRIVACY_UPDATED = "Last updated: April 2025";

export const M2M_PRIVACY_PARAGRAPHS = [
  "We take your privacy seriously. This Privacy Policy explains our practices concerning our collection, transfer, storage, disclosure, and other uses of your personal information when you use SEND and related services.",
  "By using our services, you agree to the collection and use of information in accordance with this policy. Personal information may include your name, contact details, government identification, and transaction data needed to send money and meet legal requirements.",
];
