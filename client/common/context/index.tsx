import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { PropsWithChildren, ICourse, IUserCourse, User } from "../types";

interface GlobalContextType {
  jwt: string,
  user: User | null,
  courses: ICourse[],
  userCourses: IUserCourse[],
  error: string,
  registerUser: (username: string, email: string, password: string) => void,
  loginUser: (email: string, password: string) => void,
  logoutUser: () => void,
  registerCourse: (courseId: number, levelId: number, subject1Id: number, subject2Id: number) => void,
  unregisterCourse: (userCourseId: number) => void,
}

const GlobalContext = createContext<GlobalContextType>({
  jwt: '',
  user: null,
  courses: [],
  userCourses: [],
  error: '',
  registerUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  registerCourse: () => {},
  unregisterCourse: () => {},
});

const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [ jwt, setJwt ] = useState<string>('');
  const [ user, setUser ] = useState<User | null>(null);
  const [ courses, setCourses ] = useState<ICourse[]>([]);
  const [ userCourses, setUserCourses ] = useState<IUserCourse[]>([]);
  const [ error, setError ] = useState<string>('');
  const router = useRouter();

  const resetStates = () => {
    setJwt('');
    setUser(null);
    setError('');
    setUserCourses([]);
  }

  const fetchCourses = () => {
    // https://devtrium.com/posts/async-functions-useeffect
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/courses?populate[0]=*&populate[levels][populate][1]=subjects`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SERVER_API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => {
        if (json.error) {
          console.log(json.error);
          setError(json.error.message);
        }
        else {
          const { data } = json;
          setCourses(data);
        }
      });
  }

  const fetchUserCourses = (userId: number) => {
    // https://devtrium.com/posts/async-functions-useeffect
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-courses?populate=*&filters[user][id][$eq]=${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SERVER_API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => {
        if (json.error) {
          console.log(json.error);
          setError(json.error.message);
        }
        else {
          const { data } = json;
          setUserCourses(data);
        }
      });
  }

  const unregisterCourse = (userCourseId: number) => {
    if (!user)
      return ;
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-courses/${userCourseId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SERVER_API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => {
        if (json.error) {
          console.log(json.error);
          setError(json.error.message);
        }
        else {
          setUserCourses(userCourses.filter((userCourse: IUserCourse) => {
            return userCourse.id != userCourseId;
          }));
          router.push("/");
        }
      });
  }

  const registerCourse = (courseId: number, levelId: number, subject1Id: number, subject2Id: number) => {
    if (!user)
      return;
    const userId = user!.id;
    const body = JSON.stringify({
      data: {
        user: userId,
        course: courseId,
        level: levelId,
        subject_1: subject1Id,
        subject_2: subject2Id,
      }
    })

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-courses`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SERVER_API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    }).then(response => response.json())
      .then(json => {
        if (json.error) {
          console.log(json.error);
          setError(json.error.message);
        }
        else {
          fetchUserCourses(userId);
          router.push("/");
        }
      });
  }

  const registerUser = (username: string, email: string, password: string) => {

    resetStates();
    fetchCourses();

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/local/register`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      username,
      email,
      password
    });

    fetch(url, {
      method: 'POST',
      headers,
      body
    }).then((response) => response.json())
      .then((json) => {
        if (json.error) {
          console.log(json.error);
          setError(json.error.message);
        }
        else {
          setJwt(json.jwt);
          setUser(json.user);
          fetchUserCourses(json.user.id);
        }
      });
  };

  const loginUser = (email: string, password: string) => {

    resetStates();
    fetchCourses();

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/local`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      identifier: email,
      password
    });

    fetch(url, {
      method: 'POST',
      headers,
      body
    }).then((response) => response.json())
      .then((json) => {
        if (json.error) {
          console.log(json.error);
          setError(json.error.message);
        }
        else {
          setJwt(json.jwt);
          setUser(json.user);
          fetchUserCourses(json.user.id);
        }
      });
  };

  const logoutUser = () => {
    resetStates();
    router.push("/");
  }

  return (
    <GlobalContext.Provider value={{
      jwt, user, courses, userCourses, error,
      registerUser, loginUser, logoutUser,
      registerCourse, unregisterCourse
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalCtx = () => useContext(GlobalContext);

export default GlobalContextProvider;
