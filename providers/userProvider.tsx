import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { BookCollectionModel } from "../types/BookCollectionModel";
import { BookModel } from "../types/BookModel";
import { UserModel } from "../types/UserModel";

type State = {
  currentUser: UserModel;
  isLogin: boolean;
};

type Action = {
  type:
    | "SET_CURRENT_USER"
    | "TOGGLE_ISLOGIN"
    | "INITIALIZE_USER_STATE"
    | "SET_BOOKLIST";
  payload: {
    currentUser?: UserModel;
    bookList?: BookModel[];
    isLogin?: boolean;
  };
};

export type UserContextType = {
  userState: State;
  setUserState: Dispatch<Action>;
};

export const userContext = createContext({} as UserContextType);

const initialUserState: State = {
  currentUser: {
    userId: 0,
    username: "",
    email: "",
    password: "",
    avatatar: "",
    remarks: "",
    userBookCollection: {
      collectionId: 0,
      authorId: 0,
      author: null,
      bookList: [],
      likeCount: 0,
    },
  },
  isLogin: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        currentUser: action.payload.currentUser,
        isLogin: action.payload.isLogin,
      };
    case "TOGGLE_ISLOGIN":
      return {
        currentUser: state.currentUser,
        isLogin: action.payload.isLogin,
      };
    case "INITIALIZE_USER_STATE":
      return {
        currentUser: action.payload.currentUser,
        isLogin: action.payload.isLogin,
      };
    case "SET_BOOKLIST":
      return {
        currentUser: {
          userBookCollection: {
            bookList: action.payload.bookList,
            ...state.currentUser.userBookCollection,
          },
          ...state.currentUser,
        },
        isLogin: state.isLogin,
      };
    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export const UserProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [userState, setUserState] = useReducer(reducer, initialUserState);
  return (
    <userContext.Provider value={{ userState, setUserState }}>
      {children}
    </userContext.Provider>
  );
};
