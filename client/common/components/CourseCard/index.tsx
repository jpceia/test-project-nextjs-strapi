import { ICourseAttributes } from "../../types";
import styles from '../../../styles/CourseCard.module.css'

interface CourseCardProps {
  attributes: ICourseAttributes
}

/*
Cada card deve ter as seguintes informações:
  * Nome do curso
  * duração em horas
  * descrição.
No footer de cada card, deve haver um botão, que na verdade é um Link, que levará para a página do curso.
*/

const CourseCard = ({ attributes }: CourseCardProps) => {
  const { name, description, school } = attributes;
  const schoolName = school?.data?.attributes?.name;
  return (
    <a href="" className={styles.card}>
      <h2>{name}</h2>
      <h3></h3> 
      <p>{description}</p>
      <strong>{schoolName}</strong>
    </a>
  );
}

export default CourseCard;
