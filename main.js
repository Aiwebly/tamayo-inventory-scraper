echo const { CheerioCrawler } = require('crawlee'); > main.js
echo const Apify = require('apify'); >> main.js
echo. >> main.js
echo Apify.main(async () => { >> main.js
echo     const startUrls = ['https://tamayoandsonsautosales.com/inventory']; >> main.js
echo. >> main.js
echo     const crawler = new CheerioCrawler({ >> main.js
echo         requestHandler: async ({ request, $, log }) => { >> main.js
echo             log.info(`Scraping: ${request.url}`); >> main.js
echo. >> main.js
echo             const vehicles = $('.vc-card'); >> main.js
echo. >> main.js
echo             for (const vehicle of vehicles.toArray()) { >> main.js
echo                 const el = $(vehicle); >> main.js
echo                 const title = el.find('.vc-title').text().trim(); >> main.js
echo                 const price = el.find('.vc-price').text().trim(); >> main.js
echo                 const stock = el.find('.vc-stock-num').text().trim(); >> main.js
echo. >> main.js
echo                 let detailUrl = el.find('a.vc-link').attr('href'); >> main.js
echo                 if (detailUrl && !detailUrl.startsWith('http')) { >> main.js
echo                     detailUrl = `https://tamayoandsonsautosales.com${detailUrl}`; >> main.js
echo                 } >> main.js
echo. >> main.js
echo                 let imageUrl = el.find('img.vc-image').attr('data-src') || el.find('img.vc-image').attr('src'); >> main.js
echo                 if (imageUrl && !imageUrl.startsWith('http')) { >> main.js
echo                     imageUrl = `https://tamayoandsonsautosales.com${imageUrl}`; >> main.js
echo                 } >> main.js
echo. >> main.js
echo                 await Apify.pushData({ title, price, stock, detailUrl, imageUrl }); >> main.js
echo             } >> main.js
echo         }, >> main.js
echo     }); >> main.js
echo. >> main.js
echo     await crawler.run(startUrls); >> main.js
echo }); >> main.js
