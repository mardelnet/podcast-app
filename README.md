# React Code Challenge

## Introduction

Welcome! This project utilizes the iTunes API to fetch and display information about top podcasts.

## Getting Started

Before running this application, ensure you have Node.js installed on your system. You can download and install Node.js from the [official website](https://nodejs.org/).

To run this application locally, follow these steps:

1. Clone this repository to your local machine.   
2. Navigate to the project directory.
3. Open your terminal and run `npm install` to install the project dependencies.
4. Once the installation is complete, run `npm start` to start the development server.
5. You can now view the application in your browser by visiting [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run test`

Launches the test runner in interactive watch mode.  
This script runs all the tests included in the project. Refer to the [running tests](https://facebook.github.io/create-react-app/docs/running-tests) documentation for more details.

### `npm run build`

Builds the application for production to the `build` folder.  
It optimizes the build for better performance and prepares the application for deployment.  
The build is minified, and the filenames include unique hashes to ensure cache busting.

## Additional Information

This React project is based on a set of components that were grouped in 2 folders: "pages" and "components".

The "pages" folder contains the components that act as the internal pages of the application (Home, Podcast and Episode). To access these pages, React Router is used from the main App.tsx component. The parameters "podcastId" and "episodeId" are dynamic, and are used to render the corresponding information.

The "components" folder contains the remaining components (Header, PodcastData and SearchInput) that are used as children that can be reused by others. PodcastData is the component that props the podcast data and displays it in the sidebar of the Podcast and Episode pages. SearchInput is used in Home to filter search results for podcasts. Finally, the Header component contains the link to the home page and the page loading indicator.

The page loading indicator, as I mentioned before, is located in the Header component but its rendering depends on the logic found in Home, Podcast and Episode (it stops displaying when those components obtain data from the podcasts) . Redux is used to transfer this information between components. The decision to use Redux was only to demonstrate the possibilities of its implementation, given that for something as simple as a loading indicator, a Context Provider could have been used, or even nothing like that and just CSS.

Podcast information is obtained through the "fetchTopPodcasts" and "fetchSinglePodcast" functions, which are invoked through the "useEffect" hook of the Home, Podcast and Episode components. These functions, along with other accessory functions, are located in the "/utils/fetchData.ts" file. Every time one of the aforementioned components tries to obtain the information to be rendered, it first checks that it is not stored in localStorage (using the "getLocalStorageData" function). If the information already exists in localStorage, the external API call is not made. If it does not exist, the data is obtained from the API and stored in localStorage for 24 hours to be consumed from there.

Within the same "utils" folder there are files related to Redux (the store and reducer used) and the "types.ts" file from which some Typescript interfaces are exported that are reused throughout the project.

Finally, it is worth mentioning that unit tests have been created for each of the components using Jest, and also an integration test. Regarding the styles, SASS has been used and a minimum set of variables found in "/styes/vars.scss"
