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

    const unpublishedChapter = await db.chapters.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPubished: false,
      },
    });

    const publishedChapter = await db.chapters.findMany({
      where: {
        courseId: params.courseId,
        isPubished: true,
      },
    });

    if (!publishedChapter.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublishes: false,
        },
      });
    }

    return NextResponse.json(unpublishedChapter);
  } catch (err) {
    console.log("Chapter unpublish", err);
    return new NextResponse("Internal Error", { status: 501 });
  }
}
