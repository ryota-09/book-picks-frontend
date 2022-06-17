import { reducer, Action, State } from "../providers/userProvider";

describe("providers/userProvider.tsx", () => {
  let initialState = {
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

  test("正常系: SET_CURRENT_USERが正常に機能する。", () => {
    const updateUser = {
      userId: 1,
      username: "テストname",
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
    };
    const updateFrag = true;
    const action: Action = {
      type: "SET_CURRENT_USER",
      payload: {
        currentUser: updateUser,
        isLogin: updateFrag,
      },
    };
    const state = reducer(initialState, action)
    expect(state.currentUser.userId).toEqual(1);
  });
  
});
