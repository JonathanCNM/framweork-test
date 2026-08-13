import type { ComponentType } from "react";
import { PlaceholderFlow } from "./PlaceholderFlow";
import { RemesasFlow } from "./RemesasFlow";
import type { DemoFlowProps, DemoFlowSlug } from "./types";
import { DEFAULT_DEMO_FLOW, isDemoFlowSlug } from "./types";

type DemoFlowComponent = ComponentType<DemoFlowProps>;

export const DEMO_FLOW_REGISTRY: Record<DemoFlowSlug, DemoFlowComponent> = {
  remesas: RemesasFlow,
  send: PlaceholderFlow,
  m2m: PlaceholderFlow,
  cashi: PlaceholderFlow,
};

export const resolveDemoFlow = (slug?: string): DemoFlowSlug =>
  isDemoFlowSlug(slug) ? slug : DEFAULT_DEMO_FLOW;

export const getDemoFlowComponent = (slug?: string): DemoFlowComponent =>
  DEMO_FLOW_REGISTRY[resolveDemoFlow(slug)];
