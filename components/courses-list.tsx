import { CourseWithProgressWithCategory } from "@/actions/get-courses";
import { CourseCard } from "./course-card";

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id}>
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageurl={item.imageUrl!}
              chapterslength={item.chapters.length}
              price={item.price!}
              progress={item.progress}
              category={item?.category?.name!}
            />
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
