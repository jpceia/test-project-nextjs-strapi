import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useGlobalCtx } from "../common/context";
import Card from "../common/components/course/Card";
import Guard from "../common/components/Guard";
import { ICourse } from "../types";
import styles from "../styles/AvailableCourses.module.css"


const AvailableCourses: NextPage = () => {
  const { user, courses, userCourses } = useGlobalCtx();
  const [ availCourses, setAvailCourses ] = useState<ICourse[]>([]);

  useEffect(() => {
    const userCoursesIds = userCourses.map(user_course => {
      const { attributes } = user_course;
      const { data } = attributes.course!;
      const { id } = data;
      return id;
    });
    setAvailCourses(courses.filter(course => {
      const { id } = course;
      return !userCoursesIds.includes(id);
    }))
  }, [courses, userCourses]);
  
  return (
    <Guard condition={!!user}>
      <h1>Cursos disponíveis</h1>
      <div className={styles.grid}>
      {
        availCourses && availCourses.length ? (
          availCourses.map((course: ICourse) => {
            const { id } = course;
            return <Card key={id} course={course} />
          })
        ) : (
          <h2>Não existem cursos disponiveis</h2>
        )
      }
      </div>
    </Guard>
  );
};

export default AvailableCourses;
