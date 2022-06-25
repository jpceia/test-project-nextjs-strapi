import { NextPage } from "next";
import { useAuth } from "../common/auth";
import CourseCard from "../common/components/CourseCard";
import PrivateLayout from "../common/components/PrivateLayout";
import { ICourse } from "../common/types";
import styles from "../styles/AvailableCourses.module.css"


const AvailableCourses: NextPage = () => {
  const { courses } = useAuth();
  
  return (
    <PrivateLayout>
      <h1>Cursos disponíveis</h1>
      <div className={styles.grid}>
      {
        courses === undefined ? (
          <h2>Não existem cursos disponiveis</h2>
        ) : (
          courses.map((course: ICourse) => {
            const { id } = course;
            return <CourseCard key={id} course={course} />
          })
        )
      }
      </div>
    </PrivateLayout>
  );
};

export default AvailableCourses;
