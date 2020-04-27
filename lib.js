const puppeteer = require("puppeteer");

module.exports = async (videoUrl) => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  let isError = false;

  await page.setUserAgent(
    "/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );
  await page.goto(videoUrl);
  await page.waitForSelector(
    ".more-button.style-scope.ytd-video-secondary-info-renderer"
  ).catch(error => {
      isError = true
      console.log(error)
  });
  if(isError) return ""
  await page
    .click(".more-button.style-scope.ytd-video-secondary-info-renderer")
    .catch((error) => console.log(error, videoUrl));
  await page
    .waitForSelector("#content.style-scope.ytd-metadata-row-renderer a")
    .catch((e) => {
      isError = true;
      console.log(e, videoUrl);
    });

  if (isError) return "";

  const category = await page
    .$eval(
      "#content.style-scope.ytd-metadata-row-renderer a",
      (node) => node.text
    )
    .catch((error) => console.log(error));
  await browser.close();
  return category;
};
