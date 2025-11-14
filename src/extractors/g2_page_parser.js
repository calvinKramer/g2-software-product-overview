import axios from "axios";
import cheerio from "cheerio";
import { cleanText } from "./utils_data.js";

export async function parseG2Page(url) {
try {
const { data: html } = await axios.get(url, {
headers: {
"User-Agent":
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"
}
});

const $ = cheerio.load(html);

const productName = cleanText($("h1[itemprop='name']").text());
const rating = cleanText($("span[itemprop='ratingValue']").text());
const description = cleanText($("div[itemprop='description']").text());

const categories = [];
$("a.category-link").each((_, el) => {
categories.push(cleanText($(el).text()));
});

const pricePlans = [];
$("div.pricingPlan").each((_, el) => {
const plan = cleanText($(el).find(".planName").text());
const price = cleanText($(el).find(".planPrice").text());
if (plan) pricePlans.push({ package: plan, price });
});

return {
product_name: productName || null,
rating: rating || null,
description: description || null,
categories,
pricing: pricePlans,
timestamp: new Date().toISOString()
};
} catch (err) {
console.error("Parse Error:", err);
return { error: "Failed to parse page", url };
}
}