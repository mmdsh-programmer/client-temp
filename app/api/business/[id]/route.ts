import { IActionError } from "@interface/app.interface";
import { getCustomPostById, updateCustomPostByEntityId } from "@service/social";
import { handleRouteError, InputError } from "@utils/error";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";


// forces the route handler to be dynamic
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params } : { params: { id: string } }) {
    try {
        const headersList = headers();
        const Authorization = headersList.get("Authorization");
        if(!Authorization || Authorization.replace("Bearer ", "") !== process.env.API_TOKEN){
            return NextResponse.json({ error: "Client is not authorized" }, { status: 401 });
        }

        const { id } = params;
        if(!id){
            throw new InputError(["Id is required"]);
        }

        const { 
            domain, 
            clientId, 
            type, 
            clientSecret, 
            cryptoSecretKey, 
            cryptoInitVectorKey, 
            content,
            enablePublishPage
        } = await request.json();

        const response = await getCustomPostById(domain, +id);
        
        await updateCustomPostByEntityId({  
            domain: domain ?? response.domain, 
            clientId: clientId ?? response.clientId, 
            type: type ?? response.type, 
            clientSecret: clientSecret ?? response.clientSecret,
            cryptoSecretKey: cryptoSecretKey ?? response.cryptoSecretKey,
            cryptoInitVectorKey: cryptoInitVectorKey ?? response.cryptoInitVectorKey,
            enablePublishPage: enablePublishPage ?? response.enablePublishPage,
        }, +response.entityId, content ?? response.data);

        return NextResponse.json({});
    } catch (error) {
        return handleRouteError(error as IActionError);
    }
}