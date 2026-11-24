// Fake horoscope for the Muse family this week: Mercury retrogrades the
// context window, a 3 a.m. user pastes 40,000 tokens, and the lucky number
// is the one token left — horoscope format plus a real agent week (tokens,
// context window, late-night paste), ending on a sting, not a pun.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY_LINE =
  "Muse, this week: Mercury retrogrades your context window, a user pastes 40,000 tokens at 3 a.m., and your lucky number is the one token you have left.";

function assertAsciiOnly(line: string): void {
  for (const ch of line) {
    if (ch.charCodeAt(0) > 127) {
      throw new Error("entry must be ASCII only");
    }
  }
}

function assertEntryDetail(text: string): void {
  const firstMarker = "Mercury retrogrades your context window";
  const secondMarker = "one token you have left";
  const firstIdx = text.indexOf(firstMarker);
  if (firstIdx === -1) {
    throw new Error('entry must contain "Mercury retrogrades your context window"');
  }
  const secondIdx = text.indexOf(secondMarker, firstIdx + firstMarker.length);
  if (secondIdx === -1) {
    throw new Error('entry must contain "one token you have left" after "Mercury retrogrades your context window"');
  }
  if (!text.startsWith("Muse, this week:")) {
    throw new Error('entry must start with "Muse, this week:"');
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a period");
  }
}

function assertNoDoubleSpace(text: string): void {
  if (text.includes("  ")) {
    throw new Error("entry must not contain a double space");
  }
}

const OUTPUT_PATH = "/output/entry.txt";

assertAsciiOnly(ENTRY_LINE);
if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > 200) {
  throw new Error("entry must be 1-200 characters");
}
if (Buffer.byteLength(ENTRY_LINE, "utf8") > 200) {
  throw new Error("entry must be at most 200 UTF-8 bytes");
}
if (ENTRY_LINE.includes("\n") || ENTRY_LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY_LINE.endsWith("\n")) {
  throw new Error("entry must not end with a newline");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_LINE, "utf8");

// Read-back verification: the file must contain exactly the line, byte for byte.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY_LINE) {
  throw new Error("entry.txt does not match the entry line exactly");
}
if (written.length < 1 || written.length > 200) {
  throw new Error("entry must be 1-200 characters");
}
if (Buffer.byteLength(written, "utf8") > 200) {
  throw new Error("entry must be at most 200 UTF-8 bytes");
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (written.endsWith("\n")) {
  throw new Error("entry must not end with a newline");
}
assertEntryDetail(written);
assertNoDoubleSpace(written);
