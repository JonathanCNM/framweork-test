import type { IViewConfig } from "../../hooks/useTheme";

export const DEMO_FLOW_SLUGS = ["remesas", "send", "m2m", "cashi"] as const;

export type DemoFlowSlug = (typeof DEMO_FLOW_SLUGS)[number];

export interface DemoFlowProps {
  theme: IViewConfig;
  slug?: DemoFlowSlug;
}

export const DEFAULT_DEMO_FLOW: DemoFlowSlug = "remesas";

export const isDemoFlowSlug = (value: string | undefined): value is DemoFlowSlug =>
  Boolean(value && (DEMO_FLOW_SLUGS as readonly string[]).includes(value));
