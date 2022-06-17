import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import { useCurrentUser } from "../lib/useCurrentUser";
import { UserModel } from "../types/UserModel";
import FileUpload from "./FileUpload";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_BASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

type Props = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>
}

const Edit: React.FC<Props> = ({ isEdit, setIsEdit }) => {
  const [remarks, setRemarks] = useState("");
  const [image, setImage] = useState<File>();
  

  const { userState, setUserState } = useCurrentUser();

  const urlFormater = (key: string): string => {
    return key.replace("avatar/", "");
  };

  const uploadFile = async () => {
    const { data, error } = await supabase.storage
      .from("avatar")
      .upload(`avatar${userState.currentUser.userId}`, image);

    const key = data.Key;

    if (!key) {
      throw new Error("Error");
    }
    const { publicURL } = await supabase.storage
      .from(`avatar`)
      .getPublicUrl(urlFormater(key));
    return publicURL
  };

  const updateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const avatar = await uploadFile();
    const response = await axios.patch<UserModel>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/db/update`,
      {
        userId: userState.currentUser.userId,
        avatatar: avatar,
        remarks: remarks,
      }
    );
    setUserState({
      type: "SET_CURRENT_USER",
      payload: {
        currentUser: {
          userId: response.data.userId,
          username: response.data.username,
          email: "",
          password: "",
          avatatar: response.data.avatatar,
          remarks: response.data.remarks,
          userBookCollection: null,
        },
        isLogin: true,
      },
    });
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <div className="mb-10 md:mb-16">
              <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
                Edit Area
              </h2>
            </div>

            <form
              onSubmit={updateUserInfo}
              className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
            >
              <div className="sm:col-span-1">
                <label className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                  icon:
                </label>
                {/* <input
                  onChange={(e) => setAvatar(e.target.value)}
                  name="company"
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                /> */}
                <br />
                <FileUpload setImage={setImage} />
              </div>

              <div className="sm:col-span-2 mt-3">
                <label className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                  ひとこと:
                </label>
                <textarea
                  onChange={(e) => setRemarks(e.target.value)}
                  name="message"
                  className="w-full h-64 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                ></textarea>
              </div>

              <div className="sm:col-span-2 flex justify-between items-center">
                <span></span>
                <button
                  type="submit"
                  className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Edit;
