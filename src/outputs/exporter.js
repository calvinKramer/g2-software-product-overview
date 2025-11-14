import fs from "fs";

export function exportData(data, outputPath) {
try {
const json = JSON.stringify(data, null, 2);
fs.writeFileSync(outputPath, json, "utf-8");
console.log(`Exported to ${outputPath}`);
} catch (err) {
console.error("Export error:", err);
}
}