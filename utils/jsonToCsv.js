const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

/**
 * Converts JSON data to CSV format
 * @param {Object|Array} jsonData - The JSON data to convert
 * @param {Array} fields - Optional array of field names to include in the CSV
 * @returns {string} - The CSV string
 */
function convertJsonToCsv(jsonData, fields = null) {
  try {
    // If jsonData is an object but not an array, wrap it in an array
    const data = Array.isArray(jsonData) ? jsonData : [jsonData];
    
    // If no fields are provided, automatically determine them from the data
    const opts = {};
    if (fields) {
      opts.fields = fields;
    }
    
    // Create a new parser with the options
    const parser = new Parser(opts);
    
    // Parse the JSON data to CSV
    const csv = parser.parse(data);
    return csv;
  } catch (error) {
    console.error('Error converting JSON to CSV:', error.message);
    throw error;
  }
}

/**
 * Saves JSON data as a CSV file
 * @param {Object|Array} jsonData - The JSON data to convert and save
 * @param {string} filename - The name of the file to save
 * @param {string} directory - The directory to save the file in
 * @param {Array} fields - Optional array of field names to include in the CSV
 * @returns {string} - The path to the saved CSV file
 */
function saveJsonAsCsv(jsonData, filename, directory, fields = null) {
  try {
    const csv = convertJsonToCsv(jsonData, fields);
    
    // Ensure the directory exists
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    
    // Create the file path
    const filePath = path.join(directory, filename);
    
    // Write the CSV to the file
    fs.writeFileSync(filePath, csv);
    
    console.log(`CSV saved to ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Error saving JSON as CSV:', error.message);
    throw error;
  }
}

module.exports = {
  convertJsonToCsv,
  saveJsonAsCsv
};
