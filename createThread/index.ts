export async function createThread(
    thread: () => Promise<void>,
    numberOfThreads = 5
) {
    for (;;) {
        Array.from({ length: numberOfThreads }).forEach(() => thread());
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}