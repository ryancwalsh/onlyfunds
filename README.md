# OnlyFunds
A NEARcon 2022 Project  

App is live: [https://near-onlyfunds.web.app/](https://near-onlyfunds.web.app/)  
NOTE: because of ethers references you may need a browser with somthing like metamask extension installed


## Judging Info

### NEARcon Track
Future of Finance – DeFi apps and features

### NEARcon Bounties

#### Covalent

We used the Covalent API to read on-chain data into our front-end.

#### Armored Kingdom 

[Click here for our Armored Kingdom Story](https://docs.google.com/document/d/1-0JfgCBGhAEtwN25vWzzeFXj768MXsc52xkCA8rYAwY/edit?usp=sharing)


## OnlyFunds App Overview

### What our App Does
Our crowdfunding platform gives backers the power of DAO governance to control the release of funds raised and hold the founding team accountable. A vote at each milestone either releases the remaining funds or returns them to the backers.

## OnlyFunds Project Background 
 
### Inspiration
In the web2 crowdfunding model backers have no mechanism to influence the development of the project, such as when the founding team disappears or creates something very different from what was promised.

### How We Built It

We used React, Firestore, and Solidity as our backbone. We added custom functionality on top of the ERC-20 standard that gives backers DAO-based governance control over the release of the funds raised through a voting mechanism.

### Challenges We Ran Into
Deciding the scope of the backers' control was a challenging design space because of the many options that exist between donation and investment. We would love to talk to more founders to learn whether they would prefer to have the governance tokens persist, end, or have the option to choose.

### Accomplishments That We're Proud Of
We're proud that we have an MVP on-chain and working front- and back-ends deployed to a working webapp.  We are especially happy considering that we didn't know each other before Sunday, and for 5 of the 6 teammates this is our first ever hackathon!  

### What We Learned
We learned how to use **Aurora** to compile Solidity for NEAR, how to use **Covalent** to read on-chain data, and many of our team members learned how to utilize new languages from each other.

## OnlyFunds Team

The OnlyFunds hack team was assembled for NEARcon 2022.  We are from California, Colorado, Germany and Spain.  Most of us did not know each other before the conference and only came together to hack at this event.  With exception of one team member, none of us have participated in a hackathon before.

## What's Next for OnlyFunds
- A few very minor updates to various things that we weren't able to incorporate during the hackathon (e.g., anything that doesn't seem to work quite the way you expect it to)
- Options to contribute using funds from multiple sources
- Better UI/UX for project tracking and voting
- Research parameters founders want in the fundraising contract
- Move back-end to IPFS
- Make smart contracts gas-efficient and upgradable


# Info For Developers

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  The backend references [Firebase](https://firebase.google.com/docs) which is also what we used for hosting.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

NOTE: upon committing the `/build` folder the app will automatically be deployed to production:
[https://near-onlyfunds.web.app/](https://near-onlyfunds.web.app/)

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More About the React App

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Learn More About Deploying on Firebase

https://firebase.google.com/docs/hosting/quickstart

As part of the setup process is the option to setup GitHub Actions to deploy the project, which is how we are deploying the app.  The production folder is `/build` 

...assuming you have setup firebase and have project access

### `firebase serve`

Performs a local deployment, similar to `npm start`

### `firebase deploy`

Deploys to production.  Not necessary because GitHub Actions will automatically deploy the app upon commit.

