import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuth } from "../common/auth";
import CourseCard from "../common/components/CourseCard";
import PrivateLayout from "../common/components/PrivateLayout";
import { ICourse } from "../common/types";

const MyCourses: NextPage = () => {
  const [myCourses, setMyCourses] = useState<ICourse[]>([]);
  const { user } = useAuth(); 

  // {{ _.baseUrl }}/api/user-courses?populate=*&filters[user][id][$eq]=2

  useEffect(() => {

    // https://devtrium.com/posts/async-functions-useeffect
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-courses?populate=*&filters[user][id][$eq]=${user?.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SERVER_API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(response => {
        const { data } = response;
        setMyCourses(data.map((entry: any) => {
          const { attributes } = entry;
          const { course } = attributes;
          const { data } = course;
          return data;
        }));
      })
      .catch(error => console.log(error));
  }, [user]);
  
  return (
    <PrivateLayout>
      <h1>Meus Cursos</h1>
      {
        myCourses && myCourses.length ? (
          myCourses.map((course: ICourse) => {
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
