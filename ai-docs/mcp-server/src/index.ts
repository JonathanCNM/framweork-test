#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to component documentation
const DOCS_PATH = join(__dirname, "../../../components");

interface ComponentDoc {
  name: string;
  description: string;
  category: string;
  version: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
  usage: {
    import: string;
    basic: string;
    advanced?: Array<{
      title: string;
      code: string;
      description: string;
    }>;
  };
  dependencies?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styling?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessibility?: any;
  notes?: string[];
  related?: string[];
}

class LolaFrameworkMCPServer {
  private server: Server;
  private componentDocs: Map<string, ComponentDoc>;

  constructor() {
    this.server = new Server(
      {
        name: "lola-framework-ui",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.componentDocs = new Map();
    this.loadComponentDocs();
    this.setupHandlers();
  }

  private loadComponentDocs(): void {
    if (!existsSync(DOCS_PATH)) {
      console.error(`Documentation path not found: ${DOCS_PATH}`);
      return;
    }

    const files = readdirSync(DOCS_PATH).filter((f) => f.endsWith(".json"));

    for (const file of files) {
      try {
        const content = readFileSync(join(DOCS_PATH, file), "utf-8");
        const doc: ComponentDoc = JSON.parse(content);
        this.componentDocs.set(doc.name.toLowerCase(), doc);
      } catch (error) {
        console.error(`Error loading ${file}:`, error);
      }
    }

    console.error(`Loaded ${this.componentDocs.size} component documentations`);
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "get_component",
          description:
            "Get complete documentation for a specific Lola Framework UI component including props, usage examples, and styling information",
          inputSchema: {
            type: "object",
            properties: {
              component_name: {
                type: "string",
                description:
                  "Name of the component (e.g., 'Button', 'InputField', 'Select')",
              },
            },
            required: ["component_name"],
          },
        },
        {
          name: "list_components",
          description:
            "List all available Lola Framework UI components with brief descriptions",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description:
                  "Optional: Filter by category (e.g., 'form', 'layout', 'display')",
              },
            },
          },
        },
        {
          name: "search_components",
          description:
            "Search for components by keyword in name, description, or props",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query",
              },
            },
            required: ["query"],
          },
        },
        {
          name: "get_component_usage",
          description:
            "Get usage examples for a specific component with code snippets",
          inputSchema: {
            type: "object",
            properties: {
              component_name: {
                type: "string",
                description: "Name of the component",
              },
              example_type: {
                type: "string",
                description: "Type of example: 'basic' or 'advanced'",
                enum: ["basic", "advanced"],
              },
            },
            required: ["component_name"],
          },
        },
        {
          name: "get_component_props",
          description:
            "Get detailed information about a component's props/properties",
          inputSchema: {
            type: "object",
            properties: {
              component_name: {
                type: "string",
                description: "Name of the component",
              },
            },
            required: ["component_name"],
          },
        },
        {
          name: "get_view_implementation_guide",
          description:
            "Get the complete view-based implementation guide for Lola Framework UI. This shows how to properly structure views using AuraLayout, colorConfig, themes, and the correct layout pattern with Header/Content/Footer. Use this when implementing full views or pages, not just individual components.",
          inputSchema: {
            type: "object",
            properties: {
              view_type: {
                type: "string",
                description:
                  "Optional: Specific view type to get info about (e.g., 'primaryMeshGradientView', 'specialView', 'dataView', 'whiteView', 'errorView')",
                enum: [
                  "primaryMeshGradientView",
                  "specialView",
                  "dataView",
                  "whiteView",
                  "errorView",
                  "all",
                ],
              },
            },
          },
        },
      ],
    }));

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: Array.from(this.componentDocs.values()).map((doc) => ({
        uri: `lola://component/${doc.name.toLowerCase()}`,
        name: doc.name,
        description: doc.description,
        mimeType: "application/json",
      })),
    }));

    // Read a specific resource
    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        const uri = request.params.uri;
        const match = uri.match(/^lola:\/\/component\/(.+)$/);

        if (!match) {
          throw new Error(`Invalid URI format: ${uri}`);
        }

        const componentName = match[1].toLowerCase();
        const doc = this.componentDocs.get(componentName);

        if (!doc) {
          throw new Error(`Component not found: ${componentName}`);
        }

        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(doc, null, 2),
            },
          ],
        };
      }
    );

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (!args) {
        throw new Error(`No arguments provided for tool: ${name}`);
      }

      switch (name) {
        case "get_component":
          return this.getComponent(args.component_name as string);

        case "list_components":
          return this.listComponents(args.category as string | undefined);

        case "search_components":
          return this.searchComponents(args.query as string);

        case "get_component_usage":
          return this.getComponentUsage(
            args.component_name as string,
            args.example_type as "basic" | "advanced" | undefined
          );

        case "get_component_props":
          return this.getComponentProps(args.component_name as string);

        case "get_view_implementation_guide":
          return this.getViewImplementationGuide(
            args.view_type as string | undefined
          );

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private getComponent(componentName: string) {
    const doc = this.componentDocs.get(componentName.toLowerCase());

    if (!doc) {
      return {
        content: [
          {
            type: "text",
            text: `Component "${componentName}" not found. Available components: ${Array.from(
              this.componentDocs.keys()
            ).join(", ")}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(doc, null, 2),
        },
      ],
    };
  }

  private listComponents(category?: string) {
    let components = Array.from(this.componentDocs.values());

    if (category) {
      components = components.filter(
        (c) => c.category.toLowerCase() === category.toLowerCase()
      );
    }

    const list = components.map((c) => ({
      name: c.name,
      description: c.description,
      category: c.category,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(list, null, 2),
        },
      ],
    };
  }

  private searchComponents(query: string) {
    const lowerQuery = query.toLowerCase();
    const results = Array.from(this.componentDocs.values()).filter((doc) => {
      // Search in name
      if (doc.name.toLowerCase().includes(lowerQuery)) return true;

      // Search in description
      if (doc.description.toLowerCase().includes(lowerQuery)) return true;

      // Search in prop names and descriptions
      for (const [propName, propInfo] of Object.entries(doc.props)) {
        if (propName.toLowerCase().includes(lowerQuery)) return true;
        if (
          propInfo.description &&
          propInfo.description.toLowerCase().includes(lowerQuery)
        )
          return true;
      }

      return false;
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            results.map((r) => ({
              name: r.name,
              description: r.description,
              category: r.category,
            })),
            null,
            2
          ),
        },
      ],
    };
  }

  private getComponentUsage(
    componentName: string,
    exampleType?: "basic" | "advanced"
  ) {
    const doc = this.componentDocs.get(componentName.toLowerCase());

    if (!doc) {
      return {
        content: [
          {
            type: "text",
            text: `Component "${componentName}" not found`,
          },
        ],
      };
    }

    const result = {
      import: doc.usage.import,
      basic: doc.usage.basic,
      advanced: exampleType === "advanced" ? doc.usage.advanced : undefined,
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  private getComponentProps(componentName: string) {
    const doc = this.componentDocs.get(componentName.toLowerCase());

    if (!doc) {
      return {
        content: [
          {
            type: "text",
            text: `Component "${componentName}" not found`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              component: doc.name,
              props: doc.props,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private getViewImplementationGuide(viewType?: string) {
    try {
      const guidePath = join(DOCS_PATH, "ViewBasedImplementation.json");

      if (!existsSync(guidePath)) {
        return {
          content: [
            {
              type: "text",
              text: "View implementation guide not found. Please ensure ViewBasedImplementation.json exists in the components directory.",
            },
          ],
        };
      }

      const content = readFileSync(guidePath, "utf-8");
      const guide = JSON.parse(content);

      if (viewType && viewType !== "all") {
        // Return specific view type information
        const viewInfo = guide.sections?.contentPatterns?.[viewType];
        if (viewInfo) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    viewType,
                    ...viewInfo,
                    colorConfig: guide.sections.colorConfig,
                    layoutStructure: guide.sections.layoutStructure,
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }
      }

      // Return complete guide
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(guide, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error loading view implementation guide: ${error}`,
          },
        ],
      };
    }
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Lola Framework MCP Server running on stdio");
  }
}

// Start the server
const server = new LolaFrameworkMCPServer();
server.run().catch(console.error);
