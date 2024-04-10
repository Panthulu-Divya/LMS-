import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";

const CourseIdPage = async({
    params
}: {
    params: {courseId : string}
}) => {

    const { userId } = auth();

    if(!userId){
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where:{
            id:params.courseId
        }
    })

    if(!course){
        return redirect('/');
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]

    const totalFileds = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length; 
    const completionText = `(${completedFields}/${totalFileds})`;
   


    return ( 
        <div className="p-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-2">
                    <div className="text-2xl font-medium">
                        Course setup
                    </div>
                    <span className="text-sm text-slate">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard}/>
                        <div className="text-xl">
                            Coustmize your course
                        </div>
                    </div>
                    <TitleForm 
                        initialData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm 
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageForm 
                        initialData={course}
                        courseId={course.id}
                    />
                    <CategoryForm 
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
            </div>
        </div>
     );
}
 
export default CourseIdPage;