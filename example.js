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