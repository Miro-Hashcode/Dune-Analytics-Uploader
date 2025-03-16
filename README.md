# WayFi Dune Analytics Integration

This project automatically fetches WayFi data from Metabase JSON endpoints, converts it to CSV format, and uploads it to Dune Analytics via their CSV Upload API on a daily basis.

## Features

- Fetches data from multiple Metabase JSON endpoints
- Converts JSON data to CSV format
- Uploads CSV data to Dune Analytics datasets via the CSV Upload API
- Runs automatically every 24 hours
- Logs all operations for monitoring and debugging
- Stores local copies of fetched data (both JSON and CSV) for backup

## Data Sources

The following data is collected from Metabase:

1. Total GB Offloaded
2. Total Users Served
3. Total Unique Sessions
4. Identity Providers Offloading
5. Active Locations in the Last 30 Days
6. Radius Serving

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Dune Analytics API key (from [dune.com/settings/api](https://dune.com/settings/api))

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/wayfi-dune-analytics.git
   cd wayfi-dune-analytics
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the setup script:
   ```
   npm run setup
   ```
   
   This script will:
   - Create necessary directories
   - Guide you through creating a `.env` file
   - Prompt for your Dune Analytics API key

Alternatively, you can manually:
   - Copy `.env.example` to `.env`
   - Edit the `.env` file to add your Dune Analytics API key

## Usage

### Run the process once

To run the data fetch and upload process once without scheduling:

```
npm start -- --run-now --no-schedule
```

### Run as a scheduled service

To start the service with the scheduled job (runs at midnight every day):

```
npm start
```

The process will run in the background. Press Ctrl+C to exit.

### GitHub Actions Automation

This project includes a GitHub Actions workflow that:

1. Runs every 24 hours at midnight UTC
2. Runs whenever changes are pushed to the main branch
3. Can be triggered manually from the GitHub Actions tab

To set up the GitHub Actions workflow:

1. Push this repository to GitHub
2. Go to your repository's Settings > Secrets and variables > Actions
3. Add a new repository secret named `DUNE_API_KEY` with your Dune Analytics API key
4. The workflow will now run automatically according to the schedule

The workflow logs are archived as artifacts and can be downloaded from the GitHub Actions tab.

### Configuration

You can modify the `config.js` file to:

- Change the data endpoints
- Adjust the schedule frequency
- Update Dune dataset names

## Project Structure

```
├── config.js                    # Configuration settings
├── index.js                     # Main application file
├── package.json                 # Project dependencies
├── setup.js                     # Setup script
├── dune_queries.sql             # Example SQL queries for Dune Analytics
├── dune_visualization_guide.md  # Guide for creating visualizations in Dune
├── .env.example                 # Example environment variables
├── .env                         # Environment variables (create from .env.example)
├── .gitignore                   # Git ignore configuration
├── LICENSE                      # MIT license
├── README.md                    # Project documentation
├── data/                        # Directory for storing fetched data (JSON and CSV)
│   └── .gitkeep
├── logs/                        # Directory for storing operation logs
│   └── .gitkeep
├── .github/
│   └── workflows/
│       └── data-sync.yml        # GitHub Actions workflow
└── utils/
    ├── dataFetcher.js           # Utility for fetching data from endpoints
    ├── jsonToCsv.js             # Utility for converting JSON to CSV
    └── duneUploader.js          # Utility for uploading data to Dune
```

## Logs

All operations are logged in the `logs` directory:

- `summary_*.json`: Summary of each complete process run
- `upload_*.json`: Details of each upload operation
- `error_*.json`: Details of any errors that occur

## Dune Analytics Queries and Visualization

Example SQL queries for visualizing the data in Dune Analytics are provided in the `dune_queries.sql` file. These queries include:

- Basic queries to retrieve the latest data for each dataset
- Trend analysis queries to show data changes over time
- Percentage breakdown queries for categorical data
- Combined queries that join multiple datasets for comprehensive analysis
- Dashboard queries for key metrics

A detailed guide on how to use these queries to create visualizations and dashboards in Dune Analytics is provided in the `dune_visualization_guide.md` file. This guide includes:

- Step-by-step instructions for creating visualizations
- Recommended visualization types for each query
- Guidelines for creating a comprehensive dashboard
- Tips for effective data visualization
- Troubleshooting advice

## Troubleshooting

If you encounter issues:

1. Check the error logs in the `logs` directory
2. Verify your Dune API key is correct
3. Ensure all endpoints are accessible
4. Check your internet connection

## License

[MIT](LICENSE)
