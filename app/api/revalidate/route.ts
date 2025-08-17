import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";

type BuildTagsInput = {
  tags?: string[];
  versionId?: number | string;
  documentId?: number | string;
  repositoryId?: number | string;
  domain?: string;
};

function buildTags(input: BuildTagsInput): string[] {
  if (Array.isArray(input.tags) && input.tags.length > 0) {
    return input.tags;
  }
  const tags: string[] = [];
  if (
    input.versionId !== undefined &&
    input.versionId !== null &&
    `${input.versionId}`.length > 0
  ) {
    tags.push(`vr-${input.versionId}`);
  }
  if (
    input.documentId !== undefined &&
    input.documentId !== null &&
    `${input.documentId}`.length > 0
  ) {
    tags.push(`dc-${input.documentId}`);
  }
  if (
    input.repositoryId !== undefined &&
    input.repositoryId !== null &&
    `${input.repositoryId}`.length > 0
  ) {
    tags.push(`rp-ph-${input.repositoryId}`);
  }
  if (input.domain && input.domain.length > 0) {
    tags.push(`i-${input.domain}`);
  }
  return tags;
}

async function authorize() {
  const headersList = headers();
  const authorization = headersList.get("Authorization");
  if (!authorization || authorization.replace("Bearer ", "") !== process.env.API_TOKEN) {
    return NextResponse.json({ message: "Client is not authorized" }, { status: 401 });
  }
  return null;
}

export async function POST(req: Request) {
  const authError = await authorize();
  if (authError) return authError;

  try {
    const body = (await req.json()) as BuildTagsInput;
    const tags = buildTags(body);

    if (!tags || tags.length === 0) {
      return NextResponse.json({ error: "No valid tags or identifiers provided" }, { status: 400 });
    }

    tags.forEach((tag) => {
      return revalidateTag(tag);
    });

    return NextResponse.json({ revalidated: true, tags });
  } catch {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const authError = await authorize();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const tagsParam = searchParams.get("tags");
    const versionId = searchParams.get("versionId") || undefined;
    const documentId = searchParams.get("documentId") || undefined;
    const repositoryId = searchParams.get("repositoryId") || undefined;
    const domain = searchParams.get("domain") || undefined;

    const input: BuildTagsInput = {
      versionId,
      documentId,
      repositoryId,
      domain,
      tags: tagsParam
        ? tagsParam
            .split(",")
            .map((t) => {
              return t.trim();
            })
            .filter(Boolean)
        : undefined,
    };

    const tags = buildTags(input);
    if (!tags || tags.length === 0) {
      return NextResponse.json({ error: "No valid tags or identifiers provided" }, { status: 400 });
    }

    tags.forEach((tag) => {
      return revalidateTag(tag);
    });

    return NextResponse.json({ revalidated: true, tags });
  } catch {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}
