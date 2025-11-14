import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseG2Page } from "./extractors/g2_page_parser.js";
import { exportData } from "./outputs/exporter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
try {
const inputPath = path.join(__dirname, "../data/input.sample.json");
const raw = fs.readFileSync(inputPath, "utf-8");
const { urls } = JSON.parse(raw);

const results = [];

for (const url of urls) {
console.log(`Processing: ${url}`);
const data = await parseG2Page(url);
results.push(data);
}

const outputPath = path.join(__dirname, "../data/sample_output.json");
exportData(results, outputPath);

console.log("Scraping complete. Output saved.");
} catch (err) {
console.error("Runner error:", err);
}
}

main();