import { IActionError, ICustomPostData } from "@interface/app.interface";
import { getCustomPostById, updateCustomPost } from "@service/social";
import { handleRouteError, InputError, NotFoundError } from "@utils/error";
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
            throw new InputError(["فیلد شناسه اجباری می باشد."]);
        }

        const { 
            domain, 
            clientId, 
            type, 
            clientSecret, 
            cryptoSecretKey, 
            cryptoInitVectorKey, 
            content,
        } = await request.json();

        const response = await getCustomPostById(+id);
        if(response.id !== +id){
          throw new NotFoundError(["دامنه مورد نظر پیدا نشد."]);
        }

        const domainContent = JSON.parse(response.data ?? "{}") as ICustomPostData;
        const updateContent = {...domainContent, ...(content ?? {})};
        
        await updateCustomPost({  
            domain: domain ?? response.domain, 
            clientId: clientId ?? response.clientId, 
            type: type ?? response.type, 
            clientSecret: clientSecret ?? response.clientSecret,
            cryptoSecretKey: cryptoSecretKey ?? response.cryptoSecretKey,
            cryptoInitVectorKey: cryptoInitVectorKey ?? response.cryptoInitVectorKey,
        }, +response.entityId, JSON.stringify(updateContent));
       
        return NextResponse.json({});
    } catch (error) {
        return handleRouteError(error as IActionError);
    }
}