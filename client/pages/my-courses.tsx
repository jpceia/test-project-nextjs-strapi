import { NextPage } from "next";
import { useGlobalCtx } from "../common/context";
import CourseCard from "../common/components/CourseCard";
import { ICourse, IUserCourse } from "../common/types";
import Guard from "../common/components/Guard";
import styles from "../styles/MyCourses.module.css"


const MyCourses: NextPage = () => {
  const { user, userCourses } = useGlobalCtx();
  
  return (
    <Guard condition={!!user}>
      <h1>Meus Cursos</h1>
      <div className={styles.grid}>
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
      </div>
    </Guard>
  );
}

export default MyCourses;
