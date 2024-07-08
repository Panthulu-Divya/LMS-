import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string,
): Promise<number> => {
  try {
    const publishedChapter = await db.chapters.findMany({
      where: {
        courseId: courseId,
        isPubished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapter.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const ProgressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;

    return ProgressPercentage;
  } catch (err) {
    console.log("()Get Progress)", err);
    return 0;
  }
};
