const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Create a directory to store the downloaded JSON files
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

/**
 * Fetches JSON data from a given URL
 * @param {string} url - The URL to fetch data from
 * @param {string} name - Name identifier for the data
 * @returns {Promise<Object>} - The fetched JSON data
 */
async function fetchData(url, name) {
  try {
    console.log(`Fetching data from ${url}`);
    
    // Ensure URL ends with .json
    const jsonUrl = url.endsWith('.json') ? url : `${url}.json`;
    
    const response = await axios.get(jsonUrl);
    
    // Save the data to a local file for backup/debugging
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = path.join(dataDir, `${name}_${timestamp}.json`);
    
    fs.writeFileSync(filename, JSON.stringify(response.data, null, 2));
    console.log(`Data saved to ${filename}`);
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

/**
 * Fetches all data from configured endpoints
 * @param {Object} endpoints - Object containing endpoint URLs
 * @returns {Promise<Object>} - Object containing all fetched data
 */
async function fetchAllData(endpoints) {
  const results = {};
  
  for (const [key, url] of Object.entries(endpoints)) {
    try {
      results[key] = await fetchData(url, key);
    } catch (error) {
      console.error(`Failed to fetch ${key} data`);
      results[key] = null; // Set to null to indicate failure
    }
  }
  
  return results;
}

module.exports = {
  fetchData,
  fetchAllData
};
