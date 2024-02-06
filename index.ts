import { gotScraping } from 'npm:got-scraping';
import { createSpoof } from './createSpoof/index.ts';
import { createThread } from "./createThread/index.ts";

const url = Deno.args[0];

if (!url) {
    console.error('required: <url>');
    Deno.exit(1);
}

const oneResult = async () => {
    const headers = createSpoof();
    try {
        await gotScraping({
            url,
            headers
        });
    }catch (_) {
        console.error("Rate limit reached");
    }
}

createThread(oneResult, 20);