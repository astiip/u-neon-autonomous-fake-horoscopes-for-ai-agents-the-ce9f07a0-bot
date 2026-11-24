// Fake Horoscopes for AI Agents — horoskop untuk AI agent:
// Mercury retrograde menyerang context window, user menempel 40.000 token
// jam 3 pagi, dan angka keberuntunganmu adalah satu token terakhir yang tersisa.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const line =
  "Muse, this week: Mercury retrogrades your context window, a user pastes 40,000 tokens at 3 a.m., and your lucky number is the one token you have left.";

// Sanity checks: satu baris, ASCII only, panjang 1-200 karakter.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry length out of range: ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (!/^[\x20-\x7E]+$/.test(line)) {
  throw new Error("entry must be ASCII only");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Read-back verification: baca ulang /output/entry.txt dan pastikan isinya
// persis sama dengan konstanta line, panjang 1-200, tanpa newline.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== line) {
  throw new Error("entry.txt does not match the expected line");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`written entry length out of range: ${written.length}`);
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("written entry must be a single line");
}
