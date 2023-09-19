# Library <a href="https://genlogin.com" target="_blank">Genlogin API</a>
# Official Package

## Getting Started

Genlogin supports MacOS and Windows platforms.

### Installation

`npm i genlogin`

for running example.js install puppeteer

`npm i puppeteer`

### Example

```js
const Genlogin = require('./Genlogin');
const puppeteer = require('puppeteer');

(async () => {
    const genlogin = new Genlogin("");
    const profile = (await genlogin.getProfiles(0, 1)).profiles[0];
    const  {wsEndpoint} = await genlogin.runProfile(profile.id)

    const browser =await puppeteer.connect({
        browserWSEndpoint: wsEndpoint,
        ignoreHTTPSErrors: true,
        defaultViewport: false
    });


    const page = await browser.newPage();
    await page.goto('https://genlogin.com');

    // await browser.close(); 
})();
```

### Running example:
`node example.js`
### Methods:
LOCAL_URL = "http://localhost:55550/profiles"

- ### getProfiles(limit=1000,offset=0)
  - return { profiles :[...],pagination: [...]}
- ### getProfiles(id)
  - return { id: ..., user_id: ...,profile_data:{...},...}
- ### getWsEndpoint(id)
  - return { success: true, data: { wsEndpoint: 'xxx' } }
- ### runProfile(id)
  - return {success: true, wsEndpoint: 'xxx'}
- ### stopProfile(id)
  - return { success: true }
- ### getProfilesRunning()
  - return { success: true, data: [...] }

