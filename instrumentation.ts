export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        try {
            if(process.env.NODE_ENV === "production"){
                const { getClient: getClusterClient } = await import("./cacheHandler.mjs");
                await getClusterClient();
            } else {
                const { getClient: getStackClient } = await import("./cacheHandler.develop.mjs");
                await getStackClient();
            }
        } catch (error) {
            console.log("Error in instrumentation", error);
        }
    }
}