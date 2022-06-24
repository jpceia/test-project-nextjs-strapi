import { NextPage } from "next";
import { Fragment } from "react";
import CourseCard from "../common/components/CourseCard";
import PrivateLayout from "../common/components/PrivateLayout";
import { ICourse, ICourseAttributes } from "../common/types";

const MyCourses: NextPage = () => {
  const myCourses: ICourse[] = [];
  
  return (
    <PrivateLayout>
      <h1>My Courses</h1>
    </PrivateLayout>
  );
}

export default MyCourses;
