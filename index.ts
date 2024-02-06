import { gotScraping } from 'npm:got-scraping';
import { createSpoof } from './createSpoof/index.ts';

const response = await gotScraping({
    url: 'https://www.ame-x.net',
    headers: createSpoof()
});

console.log(response.body.toString())