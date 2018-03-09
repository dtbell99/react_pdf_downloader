# react_file_download
This is a sample application which shows how you can protect file downloads using a download server for react.js applications. This provides the benefit of protecting files behind authentication/authorization logic.


## How to run (Requires two terminals)
1. From the command line: git clone https://github.com/dtbell99/react_file_download.git
2. cd into react_file_download
3. npm install
4. Terminal One `node server.js` will start the server.
5. Terminal Two `npm start` will start the client.

## How it works
* Application provides a dropdown menu of which file you wish to download.
* Upon selecting a file in the drop down react stores the file you wish in component state called requestedFile.
* Once you click download the name of the file is posted as JSON to the express.js middleware.
* Express.js middleware reads the file from disk, determins mime type, and returns it over the response. 
* React receives the file and creates a blob which it then hands over to the browser to activate a link which downloads the file. 


### Resources
PDF files came from: http://www.pdffun.com