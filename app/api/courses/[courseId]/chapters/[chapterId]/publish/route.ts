import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthourised", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthourised", { status: 401 });
    }

    const chapter = await db.chapters.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });

    if (
      !chapter ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl ||
      !muxData
    ) {
      return new NextResponse("Missing Required Field", { status: 401 });
    }

    const publishedChapter = await db.chapters.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPubished: true,
      },
    });

    return NextResponse.json(publishedChapter);
  } catch (err) {
    console.log("Chapter Publish", err);
    return new NextResponse("Internal Error", { status: 501 });
  }
}
