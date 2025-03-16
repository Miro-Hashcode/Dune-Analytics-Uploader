# Dune Analytics Visualization Guide

This guide explains how to use the SQL queries in `dune_queries.sql` to create visualizations and dashboards in Dune Analytics.

## Getting Started

1. Log in to your Dune Analytics account at [dune.com](https://dune.com)
2. Navigate to the "Queries" section
3. Click "New Query" to create a new query
4. Copy and paste a query from `dune_queries.sql` into the query editor
5. Click "Run" to execute the query
6. Use the visualization options to create charts and graphs

## Creating Visualizations

After running a query, you can create visualizations by:

1. Click on the "Visualize" tab
2. Select the visualization type (e.g., Bar Chart, Line Chart, Pie Chart)
3. Configure the visualization settings
4. Click "Save" to save the visualization

### Recommended Visualizations for Each Query Type

#### Total GB Offloaded
- **Latest Value**: Counter visualization

#### Total Users Served
- **Latest Value**: Counter visualization

#### Total Unique Sessions
- **Latest Value**: Counter visualization

#### Identity Providers Offloading
- **Breakdown**: Bar chart with identity_provider on x-axis and users_count on y-axis

#### Active Locations in the Last 30 Days
- **Latest Value**: Counter visualization

#### Radios Serving
- **Breakdown**: Bar chart with radius_server on x-axis and requests_count on y-axis

## Creating a Dashboard

To create a comprehensive dashboard:

1. Create individual visualizations for each query
2. Navigate to the "Dashboards" section
3. Click "New Dashboard"
4. Give your dashboard a name and description
5. Click "Add Visualization" to add your saved visualizations
6. Arrange the visualizations on the dashboard
7. Click "Save" to save the dashboard

## Recommended Dashboard Layout

Here's a suggested layout for a comprehensive WayFi dashboard:

### Top Row: Key Metrics (Counter Visualizations)
- Total GB Offloaded
- Total Users Served
- Total Unique Sessions
- Active Locations
- Average MB Per User
- Average Sessions Per User

### Middle Row: Trend Analysis (Line Charts)
- GB Offloaded Over Time
- Users Served Over Time
- Unique Sessions Over Time
- Active Locations Over Time

### Bottom Row: Breakdowns (Bar/Pie Charts)
- Identity Providers Breakdown
- Radius Servers Breakdown
- Average Data Usage Per User Over Time
- Average Sessions Per User Over Time

## Sharing Your Dashboard

To share your dashboard with others:

1. Navigate to your dashboard
2. Click the "Share" button
3. Choose whether to make it public or share with specific users
4. Copy the link and share it with your team

## Scheduling Refreshes

Dune Analytics allows you to schedule automatic refreshes of your queries:

1. Open a query
2. Click on the "Schedule" button
3. Select the refresh frequency
4. Click "Save"

This ensures your visualizations always display the most recent data uploaded by the WayFi Dune Analytics Integration.

## Tips for Effective Visualizations

1. **Use appropriate chart types**: Line charts for trends over time, bar charts for comparisons, pie charts for proportions
2. **Label your axes**: Make sure your visualizations have clear labels
3. **Use consistent colors**: Maintain a consistent color scheme across your dashboard
4. **Add context**: Include titles and descriptions to explain what each visualization represents
5. **Filter data**: Use date filters to focus on specific time periods
6. **Compare metrics**: Create visualizations that compare related metrics to identify patterns

## Troubleshooting

If your queries don't return the expected results:

1. Check that the table names match your Dune Analytics setup
   - The actual dataset names in Dune Analytics are:
     - dune.wayfiwireless.dataset_wayfi_active_locations_30days
     - dune.wayfiwireless.dataset_wayfi_identity_providers_offloading
     - dune.wayfiwireless.dataset_wayfi_radius_serving
     - dune.wayfiwireless.dataset_wayfi_total_gb_offloaded
     - dune.wayfiwireless.dataset_wayfi_total_unique_sessions
     - dune.wayfiwireless.dataset_wayfi_total_users_served
2. Verify that the column names match the CSV data structure
3. Ensure that the data has been successfully uploaded to Dune Analytics
4. Check the logs in the `logs` directory for any upload errors
