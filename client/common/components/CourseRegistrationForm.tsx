import { ChangeEvent, ChangeEventHandler, SyntheticEvent, useState } from "react";
import { useGlobalCtx } from "../context";
import { ICourse, ILevel, ISubject } from "../types";

interface CourseRegistrationFormProps {
  course: ICourse;
};


/*
  Course registration form
   * the user chooses a level (stored in the selectedLevel variable)
   * after selecting a level, the different subjects are displayed
     to be able to register, only two subjects can be selected
     the selected subjects ids are stored in the selectedSubjects variable

  To be used in /course/:id page
 */
const CourseRegistrationForm = ({ course }: CourseRegistrationFormProps) => {
  const { id, attributes } = course;
  const [ selectedLevel, setSelectedLevel ] = useState<ILevel | undefined>(undefined);
  const [ selectedSubjects, setSelectedSubjects ] = useState<number[]>([]);
  const { registerCourse } = useGlobalCtx();

  if (!attributes.levels)
    return <div></div>;

  // we get all the levels from the course argument, that holds all the information
  const levels = attributes.levels!.data;

  const onChangeLevel = (e: ChangeEvent<HTMLSelectElement>) => {
    //e.preventDefault();
    const levelId = parseInt(e.target.value);
    const oldLevelId = selectedLevel?.id;
    setSelectedLevel(levels.find((level: ILevel) => level.id === levelId));
    if (levelId != oldLevelId)
      setSelectedSubjects([]); // reset selectedSubjects if level changes
  }

  const onClick = (e: SyntheticEvent) => {

    e.preventDefault();

    if (!selectedLevel) {
      console.log("Level not selected");
      return ;
    }
    if (selectedSubjects.length !== 2) {
      console.log("number of selected levels different than 2");
      return ;
    }
    registerCourse(id, selectedLevel!.id, selectedSubjects[0], selectedSubjects[1]);
  }

  return (
    <div>
      <SelectLevel levels={levels} onChange={onChangeLevel} />
      <SubjectsCheckboxes
        level={selectedLevel}
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
      />
      <input
        type="button"
        value="Inscrever"
        disabled={selectedSubjects.length != 2}
        onClick={onClick}
      />
    </div>
  );
};

interface SelectLevelProps {
  levels: ILevel[],
  onChange: ChangeEventHandler<HTMLSelectElement>
}

const SelectLevel = ({ levels, onChange }: SelectLevelProps) => {
  return (
  <select name="level" onChange={onChange}>
    <option disabled selected> -- seleccione um nível -- </option>
    {
      levels.map((level: ILevel) => {
        const { id, attributes } = level;
        return (
          <option key={id} value={id}>
            {level.attributes.name}
          </option>
        );
      })
    }
  </select>
  );
}


interface SubjectsCheckboxesProps {
  level: ILevel | undefined;
  selectedSubjects: number[];
  setSelectedSubjects: (subjects: number[]) => void;
}

const SubjectsCheckboxes = ({ level, selectedSubjects, setSelectedSubjects }: SubjectsCheckboxesProps) => {

  if (!level)
    return <div></div>;

  const { attributes } = level;
  const { subjects } = attributes;

  if (!subjects)
    return <div></div>;
  const subjectsArr = subjects!.data;

  const onChange = (subjectId: number) => {
    const idx = selectedSubjects.indexOf(subjectId);
    if (idx < 0) // add new Id
      setSelectedSubjects([...selectedSubjects, subjectId]);
    else // remove Id
      setSelectedSubjects([
        ...selectedSubjects.slice(0, idx),
        ...selectedSubjects.slice(idx + 1)
      ]);
  }

  return (
    <div>
    {
      subjectsArr.map((subject: ISubject) => {
        const { id, attributes } = subject;
        const { name } = attributes;
        return (
          <div key={id}>
            <label>
              <input
                type="checkbox"
                defaultChecked={selectedSubjects.indexOf(id) >= 0}
                onChange={() => onChange(id)}
              />
              {name}
            </label>
          </div>
        );
      })
    }
    </div>
  );
}

export default CourseRegistrationForm;
