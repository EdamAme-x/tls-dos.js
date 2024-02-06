import { gotScraping } from 'npm:got-scraping';
import { createSpoof } from './createSpoof/index.ts';

const url = Deno.args[0];

if (!url) {
    console.error('required: <url>');
    Deno.exit(1);
}

const response = await gotScraping({
    url: url,
    headers: createSpoof()
});

console.log(response.body.toString())