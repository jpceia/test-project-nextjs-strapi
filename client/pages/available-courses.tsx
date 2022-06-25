import { NextPage } from "next";
import { useEffect, useState } from "react";
import CourseCard from "../common/components/CourseCard";
import PrivateLayout from "../common/components/PrivateLayout";
import { ICoursesResponse, ICourse } from "../common/types";
import styles from "../styles/AvailableCourses.module.css"


const AvailableCourses: NextPage = () => {
  const [courses, setCourses] = useState<ICoursesResponse | undefined>(undefined);

  useEffect(() => {

    // https://devtrium.com/posts/async-functions-useeffect
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/courses?populate=*`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SERVER_API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(response => setCourses(response))
      .catch(error => console.log(error));
  }, []);
  
  return (
    <PrivateLayout>
      <h1>Cursos disponíveis</h1>
      <div className={styles.grid}>
      {
        courses === undefined ? (
          <h2>Não existem cursos disponiveis</h2>
        ) : (
          courses.data.map((course: ICourse) => {
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
