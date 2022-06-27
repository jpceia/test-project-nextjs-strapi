import { ICourse } from "../types";
import styles from './CourseCard.module.css'
import Link from "next/link";

interface CourseCardProps {
  course: ICourse
}

/*
Cada card deve ter as seguintes informações:
  * Nome do curso
  * duração em horas
  * descrição.
No footer de cada card, deve haver um botão, que na verdade é um Link, que levará para a página do curso.
*/

const CourseCard = ({ course }: CourseCardProps) => {
  const { id, attributes } = course;
  const { name, description } = attributes;

  return (
    <Link href={`/course/${id}`} className={styles.card}>
      <div className={styles.card}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default CourseCard;
