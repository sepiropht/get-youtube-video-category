const puppeteer = require("puppeteer");

module.exports = async (videoUrl) => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.setUserAgent(
    "/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );
  await page.goto(videoUrl);
  await page.waitForSelector(
    ".more-button.style-scope.ytd-video-secondary-info-renderer"
  )
  await page
    .click(".more-button.style-scope.ytd-video-secondary-info-renderer")
  await page
    .waitForSelector("#content.style-scope.ytd-metadata-row-renderer a")


  const category = await page
    .$eval(
      "#content.style-scope.ytd-metadata-row-renderer a",
      (node) => node.text
    )
  await browser.close();
  return category;
};
