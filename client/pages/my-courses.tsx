import { NextPage } from "next";
import { useGlobalCtx } from "../common/context";
import CourseCard from "../common/components/CourseCard";
import PrivateLayout from "../common/components/Layout";
import { ICourse, IUserCourse } from "../common/types";

const MyCourses: NextPage = () => {
  const { userCourses } = useGlobalCtx();
  
  return (
    <PrivateLayout>
      <h1>Meus Cursos</h1>
      {
        userCourses && userCourses.length ? (
          userCourses.map((user_course: IUserCourse) => {
            const { attributes } = user_course;
            const { course } = attributes;
            const { data } = course!;
            return data;
          }).map((course: ICourse) => {
            const { id } = course;
            return <CourseCard key={id} course={course} />
          })
        ) : (
          <h2>Ainda não é estudante de nenhum curso</h2>
        )
      }
    </PrivateLayout>
  );
}

export default MyCourses;
