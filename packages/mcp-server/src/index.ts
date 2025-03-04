// @ts-nocheck
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

// Define financial data API base URL
const FINANCIAL_API_BASE_URL = "https://api.financialdatasets.ai";

// Define financial tools schemas
const financialTools = {
  getIncomeStatements: {
    name: "getIncomeStatements",
    description: "Get income statements for a company ticker",
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "The ticker symbol of the company"
        },
        period: {
          type: "string",
          enum: ["annual", "quarterly", "ttm"],
          description: "The time period of the financial statements"
        },
        limit: {
          type: "number",
          description: "The maximum number of results to return"
        },
        cik: {
          type: "string",
          description: "The Central Index Key (CIK) of the company"
        }
      },
      required: ["ticker", "period"]
    }
  },
  getBalanceSheets: {
    name: "getBalanceSheets",
    description: "Get balance sheets for a company ticker",
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "The ticker symbol of the company"
        },
        period: {
          type: "string",
          enum: ["annual", "quarterly", "ttm"],
          description: "The time period of the financial statements"
        },
        limit: {
          type: "number",
          description: "The maximum number of results to return"
        },
        cik: {
          type: "string",
          description: "The Central Index Key (CIK) of the company"
        }
      },
      required: ["ticker", "period"]
    }
  },
  getCashFlowStatements: {
    name: "getCashFlowStatements",
    description: "Get cash flow statements for a company ticker",
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "The ticker symbol of the company"
        },
        period: {
          type: "string",
          enum: ["annual", "quarterly", "ttm"],
          description: "The time period of the financial statements"
        },
        limit: {
          type: "number",
          description: "The maximum number of results to return"
        },
        cik: {
          type: "string",
          description: "The Central Index Key (CIK) of the company"
        }
      },
      required: ["ticker", "period"]
    }
  },
  getAllFinancialStatements: {
    name: "getAllFinancialStatements",
    description:
      "Get all financial statements (income, balance sheets, cash flow) for a company ticker",
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "The ticker symbol of the company"
        },
        period: {
          type: "string",
          enum: ["annual", "quarterly", "ttm"],
          description: "The time period of the financial statements"
        },
        limit: {
          type: "number",
          description: "The maximum number of results to return"
        },
        cik: {
          type: "string",
          description: "The Central Index Key (CIK) of the company"
        }
      },
      required: ["ticker", "period"]
    }
  },
  getPriceSnapshot: {
    name: "getPriceSnapshot",
    description: "Get the real-time price snapshot for a ticker",
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "The ticker symbol of the company"
        }
      },
      required: ["ticker"]
    }
  },
  getCompanyFacts: {
    name: "getCompanyFacts",
    description: "Get company facts and details for a ticker",
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "The ticker symbol of the company"
        }
      },
      required: ["ticker"]
    }
  },
  getFinancialMetricsSnapshot: {
    name: "getFinancialMetricsSnapshot",
    description:
      "Get a real-time snapshot of key financial metrics and ratios for a ticker",
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "The ticker symbol of the company"
        }
      },
      required: ["ticker"]
    }
  }
};

// Create MCP server with financial tools capabilities
const server = new Server(
  {
    name: "financial-datasets",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: financialTools
    }
  }
);

// Generic error handler for API requests
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code outside of 2xx range
    return {
      error: error.response.data.error || "API Error",
      message: error.response.data.message || error.response.statusText,
      status: error.response.status
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      error: "No Response",
      message: "The API request timed out or received no response"
    };
  } else {
    // Something happened in setting up the request
    return {
      error: "Request Error",
      message: error.message
    };
  }
};

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: Object.values(financialTools)
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const apiKey = process.env.FINANCIAL_DATASETS_API_KEY;
  if (!apiKey) {
    throw new McpError(
      ErrorCode.InvalidRequest,
      "FINANCIAL_DATASETS_API_KEY environment variable is not set"
    );
  }

  // Create axios instance with common config
  const api = axios.create({
    baseURL: FINANCIAL_API_BASE_URL,
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json"
    }
  });

  // Process the request based on the tool name
  const toolName = request.params.name;
  const args = request.params.arguments;

  try {
    let response;

    switch (toolName) {
      case "getIncomeStatements":
        {
          const params = { ticker: args.ticker, period: args.period };
          if (args.limit) params.limit = args.limit;
          if (args.cik) params.cik = args.cik;

          response = await api.get("/financials/income-statements", { params });
        }
        break;

      case "getBalanceSheets":
        {
          const params = { ticker: args.ticker, period: args.period };
          if (args.limit) params.limit = args.limit;
          if (args.cik) params.cik = args.cik;

          response = await api.get("/financials/balance-sheets", { params });
        }
        break;

      case "getCashFlowStatements":
        {
          const params = { ticker: args.ticker, period: args.period };
          if (args.limit) params.limit = args.limit;
          if (args.cik) params.cik = args.cik;

          response = await api.get("/financials/cash-flow-statements", {
            params
          });
        }
        break;

      case "getAllFinancialStatements":
        {
          const params = { ticker: args.ticker, period: args.period };
          if (args.limit) params.limit = args.limit;
          if (args.cik) params.cik = args.cik;

          response = await api.get("/financials", { params });
        }
        break;

      case "getPriceSnapshot":
        {
          const params = { ticker: args.ticker };
          response = await api.get("/prices/snapshot", { params });
        }
        break;

      case "getCompanyFacts":
        {
          const params = { ticker: args.ticker };
          response = await api.get("/company/facts", { params });
        }
        break;

      case "getFinancialMetricsSnapshot":
        {
          const params = { ticker: args.ticker };
          response = await api.get("/financial-metrics/snapshot", { params });
        }
        break;

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Tool '${toolName}' not found`
        );
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2)
        }
      ]
    };
  } catch (error) {
    const errorInfo = handleApiError(error);
    throw new McpError(
      ErrorCode.InternalError,
      `Financial API error: ${errorInfo.message}`
    );
  }
});

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Financial Datasets MCP server running on stdio");
