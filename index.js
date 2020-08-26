const puppeteer = require('puppeteer')

let browser

const HEADLESS = false

async function main() {
  browser = await puppeteer.launch({ headless: HEADLESS })

  const page = await browser.newPage()

  const search = 'bord'

  const lat = 39.739235
  const lng = -104.990250

  const url = `http://www.facebook.com/marketplace/112879158725932/search/?query=${search}&latitude=${lat}&longitude=${lng}&vertical=C2C&sort=BEST_MATCH`
  await page.goto(url)

  await page.waitFor("div[data-testid='marketplace_search_feed_content']")

  const items = await page.evaluate(() => {
    const products = Array.from(document.querySelectorAll("div[data-testid='marketplace_search_feed_content'] > div > div:first-child > div")).map(
      product => {
        return {
          title: product.querySelector("p") ? product.querySelector("p").innerText : ""
        }
      }
    )

    return products
  })

  console.log(items)
}

main()
