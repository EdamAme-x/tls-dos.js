export async function createThread(
    thread: () => Promise<void>,
    numberOfThreads = 5
) {
    for (;;) {
        Array.from({ length: numberOfThreads }).forEach(() => thread());
        await new Promise(resolve => setTimeout(resolve, 5));
        console.log("\x1b[32m[@]\x1b[0m Thread spawned");
    }
}