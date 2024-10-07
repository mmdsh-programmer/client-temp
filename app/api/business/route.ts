import { IActionError, IMetaQuery } from "@interface/app.interface";
import { createCustomPost, getCustomPost } from "@service/social";
import { handleRouteError } from "@utils/error";
import { headers } from "next/headers";
import { type NextRequest } from "next/server";


// forces the route handler to be dynamic
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const headersList = headers();
        const Authorization = headersList.get("Authorization");
        if(!Authorization || Authorization.replace("Bearer ", "") !== process.env.API_TOKEN){
            return Response.json({ error: "Client is not authorized" }, { status: 401 });
        }
        const {searchParams} = request.nextUrl;
        const domain = searchParams.get("domain");
        const size = searchParams.get("size");
        const offset = searchParams.get("offset");

        const metaQuery: IMetaQuery = {
            field: "type",
            is: "DOMAIN_BUSINESS"
        };
        if(domain){
            metaQuery.and = [{
                field: "domain",
                is: domain
            }];
        }

        const result = await getCustomPost(metaQuery, size ?? "10", offset ?? "0");

        return Response.json({ result });
    } catch (error) {
        return handleRouteError(error as IActionError);
    }
}

export async function POST(request: Request) {
    try {
        const headersList = headers();
        const Authorization = headersList.get("Authorization");
        if(!Authorization || Authorization.replace("Bearer ", "") !== process.env.API_TOKEN){
            return Response.json({ error: "Client is not authorized" }, { status: 401 });
        }
        const { domain, clientId, type } = await request.json();
        const result = await createCustomPost(JSON.stringify({
            domain,
            CUSTOM_POST_TYPE: "DOMAIN_BUSINESS",
            type,
            clientId
        }), domain);
        return Response.json({ result });
    } catch (error) {
        return handleRouteError(error as IActionError);
    }
}


