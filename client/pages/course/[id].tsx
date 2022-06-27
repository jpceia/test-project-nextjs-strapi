import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../common/components/Layout";
import { ICourseAttributes } from "../../common/types";


const Course: NextPage = () => {

  // to fetch [id] from the url
  const { query } = useRouter();
  const { courses, userCourses } = useGlobalCtx();

  useEffect(() => {
    const { id } = query;
    if (id)
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/courses/${id}?populate*`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SERVER_API_TOKEN}`,
        }
      }).then(response => response.json())
        .then(response => response.data)
        .then(data => data.attributes)
        .then(attributes => setCourse(attributes))
        .catch(error => console.log(error));
  }, [query])
  
  return (
    <PrivateLayout>
      <h1>Course</h1>
      {
        course === undefined ? (
          <h2>not found</h2>
        ) : (
          <div>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
          </div>
        )
      }
    </PrivateLayout>
  );
};

export default Course;
