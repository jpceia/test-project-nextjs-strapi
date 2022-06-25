import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import CourseCard from "../common/components/CourseCard";
import PrivateLayout from "../common/components/PrivateLayout";
import { ICoursesResponse, ICourse } from "../common/types";
import styles from "../styles/AvailableCourses.module.css"

const api_key = "d432de8d8264489a4de74bb45daddb17b84a11c28283881d75bbda2a35b046596483c8592b7d0dfeb05c1986af2e1757dc037ea8591ce95cfefa254c5447f17e363024dc42c8675205bff8f909c74e48d8a3d5810485e1f5f26e05ee494b2cc039baa9cd7b4705240fea392faaf20b37a3720f0ebd3af6f4be0eee9762e77031"


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
      <h1>Available Courses</h1>
      <div className={styles.grid}>
      {
        courses === undefined ? (
          <h2>No courses available yet</h2>
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
