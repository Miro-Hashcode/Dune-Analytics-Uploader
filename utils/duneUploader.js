const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { convertJsonToCsv, saveJsonAsCsv } = require('./jsonToCsv');

// Create directories to store data and logs
const dataDir = path.join(__dirname, '..', 'data');
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Converts JSON data to CSV and uploads it to Dune Analytics
 * @param {Object} data - The data to upload
 * @param {string} datasetName - The name of the dataset
 * @param {string} apiKey - Dune API key
 * @returns {Promise<Object>} - Upload result
 */
async function uploadDuneData(data, datasetName, apiKey) {
  if (!apiKey) {
    throw new Error('Dune API key is required for uploading data');
  }

  try {
    console.log(`Preparing data for upload to Dune dataset: ${datasetName}`);
    
    // Convert JSON to CSV
    const csv = convertJsonToCsv(data);
    
    // Save CSV locally for backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const csvFilename = `${datasetName}_${timestamp}.csv`;
    const csvFilePath = saveJsonAsCsv(data, csvFilename, dataDir);
    
    // Also save the original JSON for reference
    const jsonFilename = path.join(dataDir, `${datasetName}_${timestamp}.json`);
    fs.writeFileSync(jsonFilename, JSON.stringify(data, null, 2));
    
    console.log(`Uploading CSV data to Dune for dataset: ${datasetName}`);
    
    // Upload to Dune using the CSV Upload API
    const response = await axios.post(
      'https://api.dune.com/api/v1/table/upload/csv',
      {
        table_name: `dataset_${datasetName}`,
        description: `WayFi data for ${datasetName} uploaded at ${new Date().toISOString()}`,
        data: csv
      },
      {
        headers: {
          'X-Dune-Api-Key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Log the upload operation
    const logFilename = path.join(logsDir, `upload_${datasetName}_${timestamp}.json`);
    
    const result = {
      status: response.status === 200 ? 'success' : 'error',
      message: response.status === 200 ? 'Data successfully uploaded to Dune Analytics' : 'Upload failed',
      localCsvFile: csvFilePath,
      localJsonFile: jsonFilename,
      duneResponse: response.data,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync(logFilename, JSON.stringify({
      timestamp: new Date().toISOString(),
      dataset: datasetName,
      result: result,
      dataPreview: JSON.stringify(data).substring(0, 500) + '...' // Preview of the data
    }, null, 2));
    
    console.log(`Data for ${datasetName} uploaded to Dune. Log saved to ${logFilename}`);
    
    return result;
  } catch (error) {
    console.error(`Error uploading data for dataset ${datasetName}:`, error.message);
    
    // Log the error
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const errorLogFilename = path.join(logsDir, `error_${datasetName}_${timestamp}.json`);
    
    fs.writeFileSync(errorLogFilename, JSON.stringify({
      timestamp: new Date().toISOString(),
      dataset: datasetName,
      error: {
        message: error.message,
        stack: error.stack,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : null
      },
      dataPreview: data ? JSON.stringify(data).substring(0, 500) + '...' : 'No data'
    }, null, 2));
    
    console.error(`Error log saved to ${errorLogFilename}`);
    throw error;
  }
}

/**
 * Processes all data and uploads it to Dune
 * @param {Object} allData - Object containing all data to process
 * @param {Object} datasetMap - Mapping of data keys to dataset names
 * @param {string} apiKey - Dune API key
 * @returns {Promise<Object>} - Object containing all processing results
 */
async function processAllData(allData, datasetMap, apiKey) {
  const results = {};
  
  for (const [key, data] of Object.entries(allData)) {
    if (!data) {
      console.warn(`Skipping processing for ${key} due to missing data`);
      continue;
    }
    
    const datasetName = datasetMap[key];
    if (!datasetName) {
      console.warn(`No dataset mapping found for ${key}`);
      continue;
    }
    
    try {
      results[key] = await uploadDuneData(data, datasetName, apiKey);
    } catch (error) {
      console.error(`Failed to process ${key} data`);
      results[key] = { error: error.message };
    }
  }
  
  return results;
}

module.exports = {
  uploadDuneData,
  processAllData
};
