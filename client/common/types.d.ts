import { ReactNode } from "react";

interface IIdAttrPair<T> {
  id: number;
  attributes: T;
}

interface IStrapiResponse<T> {
  data: IIdAttr<T>[];
  meta: object;
}

interface IBaseAttributes
{
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ISchoolAttributes extends IBaseAttributes {
  name: string;
  description?: string;
  courses?: { data: ICourse[] };
}

interface ICourseAttributes extends IBaseAttributes {
  name: string;
  description?: string;
  duration?: number;
  school?: { data: ISchool };
  levels?: { data: ILevel[] };
}

interface ILevelAttributes extends IBaseAttributes {
  name: string;
  course?: { data: ICourse };
  subjects?: { data: ISubject[] };
}

interface ISubjectAttributes extends IBaseAttributes {
  name: string;
  description?: string;
  level?: { data: ILevel };
}

interface IUserCourseAttributes extends IBaseAttributes {
  user?: User;
  course?: { data: ICourse };
  level?: { data: ILevel };
  subject_1?: { data: ISubject };
  subject_2?: { data: ISubject };
}

export type ISchoolsResponse = IStrapiResponse<ISchoolAttributes>;
export type ICoursesResponse = IStrapiResponse<ICourseAttributes>;
export type ILevelsResponse = IStrapiResponse<ILevelAttributes>;
export type ISubjectResponse = IStrapiResponse<ISubjectAttributes>;
export type IUserCourseResponse = IStrapiResponse<IUserCourseAttributes>;

export type ISchool = IIdAttrPair<ISchoolAttributes>;
export type ICourse = IIdAttrPair<ICourseAttributes>;
export type ILevel = IIdAttrPair<ILevelAttributes>;
export type ISubject = IIdAttrPair<ISubjectAttributes>;
export type IUserCourse = IIdAttrPair<IUserCourseAttributes>;

export interface PropsWithChildren {
  children: ReactNode
}

export interface GuardProps extends PropsWithChildren {
  condition: boolean
}

export interface User {
  id: number,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedat: string
}
