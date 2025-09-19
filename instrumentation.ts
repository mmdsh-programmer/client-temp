import { getClient as getClusterClient } from "./cacheHandler.mjs";
import { getClient as getStackClient } from "./cacheHandler.develop.mjs";

export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        try {
            if(process.env.NODE_ENV === "production"){
                await getClusterClient();
            } else {
                await getStackClient();
            }
        } catch (error) {
            console.log("Error in instrumentation", error);
        }
    }
}