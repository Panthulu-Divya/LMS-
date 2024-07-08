import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const hasPublishedChapter = ownCourse.chapters.some(
      (chapter) => chapter.isPubished,
    );

    if (
      !ownCourse.title ||
      !ownCourse.description ||
      !ownCourse.price ||
      !ownCourse.imageUrl ||
      !hasPublishedChapter ||
      !ownCourse.categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublishes: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (err) {
    console.log("Course Publish", err);
    return new NextResponse("Something wen't wrong", { status: 500 });
  }
}
