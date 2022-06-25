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

export type ISchoolsResponse = IStrapiResponse<ISchoolAttributes>;
export type ICoursesResponse = IStrapiResponse<ICourseAttributes>;
export type ILevelsResponse = IStrapiResponse<ILevelAttributes>;
export type ISubjectResponse = IStrapiResponse<ISubjectAttributes>;

export type ISchool = IIdAttrPair<ISchoolAttributes>;
export type ICourse = IIdAttrPair<ICourseAttributes>;
export type ILevel = IIdAttrPair<ILevelAttributes>;
export type ISubject = IIdAttrPair<ISubjectAttributes>;

export interface PropsWithChildren {
  children: ReactNode
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
