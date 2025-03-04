# Financial Datasets MCP Server

A [Model Context Protocol (MCP)](https://github.com/anthropics/model-context-protocol) server for accessing financial data via the Financial Datasets API.

## Overview

This MCP server provides AI models with the ability to retrieve financial data for publicly traded companies, including:

- Income statements
- Balance sheets
- Cash flow statements
- Price snapshots
- Company facts and information
- Financial metrics and ratios

Built using the [@modelcontextprotocol/sdk](https://github.com/anthropics/model-context-protocol) and designed to work with financial API services.

## Features

- **Real-time Financial Data**: Access up-to-date financial information for thousands of public companies
- **Comprehensive Financial Statements**: Retrieve income statements, balance sheets, and cash flow statements
- **Multiple Time Periods**: Support for annual, quarterly, and trailing twelve months (TTM) data
- **MCP Integration**: Seamlessly works with Claude and other MCP-compatible AI models

## Installation

```bash
# Install dependencies
bun install

# Build the project
bun run build
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) runtime
- Financial Datasets API key

### Getting an API Key

You can obtain a free API key by following these steps:

1. Visit [https://www.financialdatasets.ai/](https://www.financialdatasets.ai/)
2. Sign up for an account
3. Navigate to the API section to generate your API key

The free tier provides access to a limited number of API calls per month, which is sufficient for testing and personal use.

### Configuration

Set your API key as an environment variable:

```bash
export FINANCIAL_DATASETS_API_KEY="your-api-key-here"
```

## Usage

### Running the Server

```bash
bun run index.ts
```

### Integration with Claude or Other MCP-Compatible Models

To use this server with Claude or other MCP-compatible models, add it to your MCP client configuration file. Here's an example configuration:

```json
{
  "mcpServers": {
    "financialdatasets": {
      "command": "node",
      "args": ["/path/to/financial-datasets-mcp-server/build/index.js"],
      "env": {
        "FINANCIAL_DATASETS_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Place this configuration file in the appropriate location for your MCP client.

## Available Tools

The server provides the following financial data tools:

| Tool Name                     | Description                       | Required Parameters |
| ----------------------------- | --------------------------------- | ------------------- |
| `getIncomeStatements`         | Retrieve income statements        | ticker, period      |
| `getBalanceSheets`            | Retrieve balance sheets           | ticker, period      |
| `getCashFlowStatements`       | Retrieve cash flow statements     | ticker, period      |
| `getAllFinancialStatements`   | Retrieve all financial statements | ticker, period      |
| `getPriceSnapshot`            | Get real-time price data          | ticker              |
| `getCompanyFacts`             | Get company information           | ticker              |
| `getFinancialMetricsSnapshot` | Get financial metrics and ratios  | ticker              |

### Parameter Details

- `ticker`: Stock symbol (e.g., AAPL, MSFT, GOOGL)
- `period`: Time period - "annual", "quarterly", or "ttm" (trailing twelve months)
- `limit` (optional): Maximum number of results to return
- `cik` (optional): Central Index Key (CIK) of the company

## Development

```bash
# Run in watch mode during development
bun run watch

# Validate the MCP server implementation
bun run inspector

# Create a binary executable
bun run exec
```

## Project Structure

```
├── src/
│   └── index.ts         # Main server implementation
├── build/               # Compiled JavaScript files
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Troubleshooting

- **API Key Issues**: Ensure your API key is correctly set in the environment variables
- **Connection Problems**: Check that the Financial Datasets API is available and that your network connection is stable
- **Rate Limiting**: The free tier has usage limits; check your API dashboard for current usage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
