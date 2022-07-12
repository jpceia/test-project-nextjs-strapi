import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGlobalCtx } from "../../common/context";
import { ICourse, IUserCourse } from "../../types";
import CourseRegistrationInfo from "../../common/components/CourseRegistrationInfo";
import CourseRegistrationForm from "../../common/components/CourseRegistrationForm";
import Guard from "../../common/components/Guard";


const Course: NextPage = () => {

  // to fetch [id] from the url
  const { query } = useRouter();
  const { user, courses, userCourses } = useGlobalCtx();
  const [ course, setCourse ] = useState<ICourse | undefined>(undefined);
  const [ myCourse, setMyCourse ] = useState<IUserCourse | undefined>(undefined);

  useEffect(() => {
    const { id } = query;
    setCourse(courses.find((course: ICourse) => course.id.toString() === id));
    if (course) // the course exists
    {
      setMyCourse(userCourses.find((userCourse: IUserCourse) => {
        const { attributes } = userCourse;
        const { data } = attributes.course!;
        return data.id.toString() === id;
      }));
    }
  }, [query, course, courses, userCourses])

  return (
    <Guard condition={!!user}>
      <h1>Course</h1>
      {
        course ? (
          <div>
            <h2>{course.attributes.name}</h2>
            <p>{course.attributes.description}</p>
            <p><strong>{myCourse ? "registered" : "not registered"}</strong></p>
            {
              myCourse ? 
                <CourseRegistrationInfo course={course} myCourse={myCourse}/> : // registered - shows info about my registration
                <CourseRegistrationForm course={course} />                   // not registered - shows registration form
            }
          </div>
        ) : (
          <h2>not found</h2>
        )
      }
    </Guard>
  );
};


export default Course;
