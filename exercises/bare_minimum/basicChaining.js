/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath` //pluckFirstLineFromFileAsync
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile //getGitHubProfileAsync
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promisification = require('./promisification.js');
var callbackReview = Promise.promisifyAll(require('./callbackReview.js'));

var writeFileAsync = Promise.promisify(fs.writeFile);

var fss = Promise.promisifyAll(require('fs'));

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return callbackReview.pluckFirstLineFromFileAsync(readFilePath)
    .then((username) => {
      return promisification.getGitHubProfileAsync(username);
    }).then((body) => {
      return fss.writeFileAsync(writeFilePath, JSON.stringify(body));
    });
};


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
