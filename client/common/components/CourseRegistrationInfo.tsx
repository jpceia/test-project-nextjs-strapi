import { useGlobalCtx } from "../context";
import { ICourse, IUserCourse } from "../types";

interface CourseRegistrationInfoProps {
  course: ICourse;
  myCourse: IUserCourse;
}

const CourseRegistrationInfo = ({ myCourse }: CourseRegistrationInfoProps) => {
  
  // unnesting variables
  const { id, attributes } = myCourse;
  const level = attributes.level!.data;
  const subject1 = attributes.subject_1!.data;
  const subject2 = attributes.subject_1!.data;
  const levelName = level.attributes.name;
  const subject1Name = subject1.attributes.name;
  const subject1Description = subject1.attributes.description;
  const subject2Name = subject2.attributes.name;
  const subject2Description = subject2.attributes.description;

  const { unregisterCourse } = useGlobalCtx();

  return (
    <div>
      <h3>Current Level: {levelName}</h3>
      <h4>Subject 1: {subject1Name}</h4>
      <p>{subject1Description}</p>
      <h4>Subject 2: {subject2Name}</h4>
      <p>{subject2Description}</p>
      <button value="Remover" onClick={() => unregisterCourse(id)}>Remover</button>
    </div>
  );
}

export default CourseRegistrationInfo;
