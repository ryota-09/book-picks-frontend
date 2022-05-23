import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useCurrentUser } from "../lib/useCurrentUser";
import { UserModel } from "../types/UserModel";

const Register: React.FC = ({}) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const { setUserState } = useCurrentUser();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username: "",
        email: email,
        password: password,
      });
      console.log(response.data);
      // const option = { path: "/" };
      // cookie.set("access_token", response.data, option);
      setUserState({
        type: "SET_CURRENT_USER",
        payload: {
          currentUser: response.data.user,
          isLogin: true,
        },
      });
      router.push("/book-collection");
    } catch (error) {
      console.log(error);
    }
  };

  const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/db", {
        username: username,
        email: email,
        password: password,
      });
      if (response.status === 201) login(email, password);
    } catch {
      setError("ユーザー登録できませんでした。");
    }
  };

  return (
    <>
      <p className="text-3xl text-center mt-8">Sign up</p>
      <form onSubmit={authUser} className="mt-8 space-y-3">
        <div>
          <input
            type="text"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="email"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <button
            disabled={!username || !password || !email}
            type="submit"
            className="disabled:opacity-40 py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Sign Up
          </button>
        </div>
      </form>
      {error && <p className="mt-5 text-red-600">{error}</p>}
    </>
  );
};

export default Register;
