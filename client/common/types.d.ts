
interface IStrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  }
  meta?: object;
}

interface IBaseAttributes
{
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ILevelAttributes extends IBaseAttributes {
  name: string;
}

interface ISchoolAttributes extends IBaseAttributes {
  name: string;
  description?: string;
  courses?: ICourse[];
}

export type ILevel = IStrapiResponse<ILevelAttributes>;
export type ICourse = IStrapiResponse<ICourseAttributes>;
export type ISchool = IStrapiResponse<ISchoolAttributes>;

interface ICourseAttributes extends IBaseAttributes {
  name: string;
  description?: string;
  school?: ISchool;
  levels?: ILevel[];
}