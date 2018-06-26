

// Object container for exporting all the environments
let environments = {};


// Staging (default) environment
environments.staging = {
    'port' : 8080,
    'envName' : 'staging'
};

// Production environment
environments.production = {
    'port' : 3000,
    'envName' : 'production'
};

// Determine which environments was passed as a cli argument
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if current environment is set to one of the keys on the environment object
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


// Export the module
module.exports = environmentToExport;