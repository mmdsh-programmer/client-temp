export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        try {
            if(process.env.NODE_ENV === "production"){
                console.log(JSON.stringify({
                    action: "register",
                    event: "All functions registered",
                    message: "Start up function called in production environment",
                }));
            } else {
                console.log(JSON.stringify({
                    action: "register",
                    event: "All functions registered",
                    message: "Start up function called in development environment",
                }));
            }
        } catch (error) {
            console.log("Error in instrumentation", error);
        }
    }
}