const { CheerioCrawler } = require('crawlee');
const Apify = require('apify');

Apify.main(async () => {
    const startUrls = ['https://tamayoandsonsautosales.com/inventory'];

    const crawler = new CheerioCrawler({
        requestHandler: async ({ request, $, log }) => {
            log.info(`Scraping: ${request.url}`);

            const cars = $('.vc-card');

            for (const car of cars.toArray()) {
                const element = $(car);

                const title = element.find('.vc-title').text().trim();
                const price = element.find('.vc-price').text().trim();
                const stock = element.find('.vc-stock-num').text().trim();
                const detailUrl = element.find('a.vc-link').attr('href');
                let imageUrl = element.find('img.vc-image').attr('data-src') || element.find('img.vc-image').attr('src');

                // Ensure full URL for image and detail link
                if (detailUrl && !detailUrl.startsWith('http')) {
                    imageUrl = `https://tamayoandsonsautosales.com${imageUrl}`;
                }

                await Apify.pushData({
                    title,
                    price,
                    stock,
                    detailUrl: detailUrl ? `https://tamayoandsonsautosales.com${detailUrl}` : null,
                    imageUrl,
                });
            }
        },
    });

    await crawler.run(startUrls);
});
