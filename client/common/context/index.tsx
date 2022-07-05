import { useRouter } from "next/router";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "../state/local-storage";
import { PropsWithChildren, ICourse, IUserCourse, User } from "../types";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

interface GlobalContextType {
  user: User | null,
  courses: ICourse[],
  userCourses: IUserCourse[],
  error: string,
  registerUser: (username: string, email: string, password: string) => void,
  loginUser: (email: string, password: string) => void,
  logoutUser: () => void,
  registerCourse: (courseId: number, levelId: number, subject1Id: number, subject2Id: number) => void,
  unsubscribeCourse: (userCourseId: number) => void,
}

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  courses: [],
  userCourses: [],
  error: '',
  registerUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  registerCourse: () => {},
  unsubscribeCourse: () => {},
});

/*
  Context provider for global state variables
  provides the following variables
    user
    courses
    userCourses
    error
  
  also the following functions to manipulate the state:
    registerUser
    loginUser
    logoutUser
    registerCourse
    unsibscribeCourse
 */
const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [ jwt, setJwt ] = useLocalStorage<string>('__jwt', '');
  const [ user, setUser ] = useLocalStorage<User | null>('__user', null);
  const [ courses, setCourses ] = useLocalStorage<ICourse[]>('__courses', []);
  const [ userCourses, setUserCourses ] = useLocalStorage<IUserCourse[]>('__user_courses', []);
  const [ error, setError ] = useLocalStorage<string>('__error', '');
  const router = useRouter();

  const resetStates = () => {
    setJwt('');
    setUser(null);
    setError('');
    setUserCourses([]);
  }

  const handleError = (error: unknown) => {
    const msg = getErrorMessage(error);
    console.log(msg);
    setError(msg);
  }

  const fetchCourses = useCallback(() => {
    if (!jwt)
      return ;
    // https://devtrium.com/posts/async-functions-useeffect

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/courses?populate[0]=*&populate[levels][populate][1]=subjects`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => {
        if (json.error)
          throw Error(json.error)
        return json;
      })
      .then(json => json.data)
      .then(setCourses)
      .catch(handleError);
    }, [jwt]);

  const fetchUserCourses = useCallback(() => {
    if (!user || !jwt)
      return ;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-courses?populate=*&filters[user][id][$eq]=${user!.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => {
        if (json.error)
          throw Error(json.error)
        return json;
      })
      .then(json => {
        const { data } = json;
        setUserCourses(data);
      })
      .catch(handleError);
  }, [user, jwt]);

  const unsubscribeCourse = (userCourseId: number) => {
    if (!user || !jwt)
      return ;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-courses/${userCourseId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => {
        if (json.error)
          throw Error(json.error)
        return json;
      })
      .then(() => {
        setUserCourses(userCourses.filter((userCourse: IUserCourse) => {
          return userCourse.id != userCourseId;
        }));
        router.push("/");
      })
      .catch(handleError);
  };

  const registerCourse = (courseId: number, levelId: number, subject1Id: number, subject2Id: number) => {
    if (!user || !jwt)
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
    });

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-courses`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    }).then(response => response.json())
      .then(json => {
        if (json.error)
          throw Error(json.error)
        return json;
      })
      .then(() => {
        fetchUserCourses();
        router.push("/");
      })
      .catch(handleError);
  };

  const registerUser = (username: string, email: string, password: string) => {

    resetStates();

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
      .then(json => {
        if (json.error)
          throw Error(json.error)
        return json;
      })
      .then(json => {
        setJwt(json.jwt);
        setUser(json.user);
      })
      .catch(handleError);
  };

  const loginUser = (email: string, password: string) => {

    resetStates();

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
      .then(json => {
        if (json.error)
          throw Error(json.error)
        return json;
      })
      .then((json) => {
        setJwt(json.jwt);
        setUser(json.user);
      })
    .catch(handleError);
  };

  const logoutUser = () => {
    resetStates();
    router.push("/");
  }

  useEffect(() => {
    if (jwt && user)
    {
      fetchCourses();
      fetchUserCourses();
    }
  }, [jwt, user, fetchCourses, fetchUserCourses]);

  return (
    <GlobalContext.Provider value={{
      user, courses, userCourses, error,
      registerUser, loginUser, logoutUser,
      registerCourse, unsubscribeCourse
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalCtx = () => useContext(GlobalContext);

export default GlobalContextProvider;
