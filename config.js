module.exports = {
  // JSON endpoints
  endpoints: {
    totalGbOffloaded: 'https://metabase.wayfiwireless.com/public/question/a0db2e0d-2cd5-466f-9375-0784bd08289b.json',
    totalUsersServed: 'https://metabase.wayfiwireless.com/public/question/2488d58c-0430-4fe2-85b2-4f68517282b8.json',
    totalUniqueSessions: 'https://metabase.wayfiwireless.com/public/question/de0a760f-0b18-465e-a049-2ea625e98975.json',
    identityProvidersOffloading: 'https://metabase.wayfiwireless.com/public/question/3a5bb1fd-1d88-4fdd-8678-92fa562fd09c.json',
    activeLocations30Days: 'https://metabase.wayfiwireless.com/public/question/7769d979-db8e-4448-a329-80394a43826d.json',
    radiusServing: 'https://metabase.wayfiwireless.com/public/question/a294521c-aece-4c85-96f0-be20e61ab99c.json'
  },
  
  // Schedule settings (cron format)
  schedule: {
    frequency: '0 0 * * *' // Run at midnight every day (24 hours)
  },
  
  // Dune Analytics settings
  dune: {
    // These should be set in .env file
    apiKey: process.env.DUNE_API_KEY,
    // Add any other Dune-specific settings here
    datasets: {
      totalGbOffloaded: 'wayfi_total_gb_offloaded',
      totalUsersServed: 'wayfi_total_users_served',
      totalUniqueSessions: 'wayfi_total_unique_sessions',
      identityProvidersOffloading: 'wayfi_identity_providers_offloading',
      activeLocations30Days: 'wayfi_active_locations_30days',
      radiusServing: 'wayfi_radius_serving'
    }
  }
};
