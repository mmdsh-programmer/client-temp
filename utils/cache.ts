export const generateCachePageTag = async (tag: string[], revalidate = 24 * 3600) => {
  try {
    await fetch(`${process.env.BACKEND_URL}`, {
      next: {
        tags: tag,
        revalidate,
      },
    });
  } catch (error) {
    console.error("Error generating cache page tag:", error);
  }
};