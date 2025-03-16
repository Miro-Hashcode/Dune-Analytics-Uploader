require('dotenv').config();
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const { fetchAllData } = require('./utils/dataFetcher');
const { processAllData } = require('./utils/duneUploader');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Main function to fetch data and process it
 */
async function fetchAndProcessData() {
  console.log('Starting data fetch and processing...');
  const startTime = new Date();
  
  try {
    // Fetch all data from configured endpoints
    const allData = await fetchAllData(config.endpoints);
    
    // Check if we have any data to upload
    const hasData = Object.values(allData).some(data => data !== null);
    if (!hasData) {
      throw new Error('No data was successfully fetched from any endpoint');
    }
    
    // Process all data and save locally
    const processResults = await processAllData(
      allData, 
      config.dune.datasets, 
      config.dune.apiKey
    );
    
    // Log the overall results
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000; // in seconds
    
    const summaryLog = {
      timestamp: new Date().toISOString(),
      duration: `${duration} seconds`,
      fetchResults: Object.fromEntries(
        Object.entries(allData).map(([key, data]) => [
          key, 
          data ? 'Success' : 'Failed'
        ])
      ),
      processResults: Object.fromEntries(
        Object.entries(processResults).map(([key, result]) => [
          key, 
          result.error ? `Failed: ${result.error}` : 'Success'
        ])
      )
    };
    
    const logFilename = path.join(
      logsDir, 
      `summary_${startTime.toISOString().replace(/[:.]/g, '-')}.json`
    );
    
    fs.writeFileSync(logFilename, JSON.stringify(summaryLog, null, 2));
    console.log(`Process completed in ${duration} seconds. Summary log saved to ${logFilename}`);
    
    return { success: true, summaryLog };
  } catch (error) {
    console.error('Error in fetch and upload process:', error.message);
    
    // Log the error
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        stack: error.stack
      }
    };
    
    const errorLogFilename = path.join(
      logsDir, 
      `error_${startTime.toISOString().replace(/[:.]/g, '-')}.json`
    );
    
    fs.writeFileSync(errorLogFilename, JSON.stringify(errorLog, null, 2));
    console.error(`Error log saved to ${errorLogFilename}`);
    
    return { success: false, error: error.message };
  }
}

/**
 * Run the process immediately if requested
 */
if (process.argv.includes('--run-now')) {
  console.log('Running process immediately...');
  fetchAndProcessData()
    .then(result => {
      if (result.success) {
        console.log('Process completed successfully');
      } else {
        console.error('Process failed:', result.error);
      }
    })
    .catch(error => {
      console.error('Unhandled error:', error);
    });
}

/**
 * Schedule the job to run at the configured frequency
 */
if (!process.argv.includes('--no-schedule')) {
  console.log(`Scheduling job to run at: ${config.schedule.frequency}`);
  
  cron.schedule(config.schedule.frequency, () => {
    console.log(`Running scheduled job at ${new Date().toISOString()}`);
    fetchAndProcessData()
      .then(result => {
        if (result.success) {
          console.log('Scheduled job completed successfully');
        } else {
          console.error('Scheduled job failed:', result.error);
        }
      })
      .catch(error => {
        console.error('Unhandled error in scheduled job:', error);
      });
  });
  
  console.log('Job scheduled. Process will run in the background.');
  console.log('Press Ctrl+C to exit.');
}

// Export the main function for testing or manual execution
module.exports = {
  fetchAndProcessData
};
