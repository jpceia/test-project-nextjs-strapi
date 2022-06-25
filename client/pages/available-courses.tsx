import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuth } from "../common/auth";
import CourseCard from "../common/components/CourseCard";
import PrivateLayout from "../common/components/PrivateLayout";
import { ICourse } from "../common/types";
import styles from "../styles/AvailableCourses.module.css"


const AvailableCourses: NextPage = () => {
  const { courses, userCourses } = useAuth();
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
    <PrivateLayout>
      <h1>Cursos disponíveis</h1>
      <div className={styles.grid}>
      {
        availCourses && availCourses.length ? (
          availCourses.map((course: ICourse) => {
            const { id } = course;
            return <CourseCard key={id} course={course} />
          })
        ) : (
          <h2>Não existem cursos disponiveis</h2>
        )
      }
      </div>
    </PrivateLayout>
  );
};

export default AvailableCourses;
