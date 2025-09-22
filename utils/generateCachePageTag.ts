"use server";

import { revalidateTag } from "next/cache";

export const generateCachePageTag = async (tag: string[], revalidate = 24 * 3600) => {
  try {
    console.log(JSON.stringify({type: "redis", action: "invalidate", event: "tag_invalidation_start", tags: tag, revalidate}));
    // استفاده از revalidateTag برای invalidation on-demand
    tag.forEach((tagName) => {
      revalidateTag(tagName);
      console.log(JSON.stringify({type: "redis", action: "invalidate", event: "tag_invalidated", tag: tagName}));
    });

    console.log(JSON.stringify({type: "redis", action: "success", event: "tag_invalidation_complete", tags: tag, revalidate}));
  } catch (error) {
    console.log(JSON.stringify({type: "redis", action: "error", event: "tag_invalidation_failed", tags: tag, error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined}));
  }
};