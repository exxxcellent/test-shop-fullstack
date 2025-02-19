export default async function delayForDemo(promise: Promise<any>) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    return await promise;
}
