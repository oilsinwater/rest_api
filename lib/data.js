/**
 * Library for storing and editing data
 * 
 */

 // Dependencies

 const fs = require('fs');
 const path = require('path');

 // Container for the module (to be exported)
let lib = {};

// base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function (dir, file, data, callback) {
    // open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
        if (!err & fileDescriptor) {
            // convert data to a string
            let stringData = JSON.stringify(data);

            //Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function (err) {
                if (!err) {
                    fs.closeSync(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                          callback('Error closing new file')
                        }
                    })
                } else {
                  callback('Error writing to new file')
                }
            })
        } else {
          callback('Could not create a new file, it may already exist');
        }
    });
};