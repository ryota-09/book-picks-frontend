import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "universal-cookie";

const cookie = new Cookie();

const Login: React.FC = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username: "",
        email: email,
        password: password,
      });
      // const option = { path: "/" }う
      // cookie.set("access_token", response.data, option);
      router.push("/book-collection");
    } catch {
      setError("ログインエラーが発生しました。")
    }
  };

  return (
    <>
      <p className="text-3xl text-center mt-8">Sign In</p>
      <form onSubmit={login} className="mt-8 space-y-3">
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
            disabled={!password || !email}
            type="submit"
            className="disabled:opacity-40 py-2 px-4 text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none"
          >
            Sign In
          </button>
        </div>
      </form>
      {error && <p className="mt-5 text-red-600">{error}</p>}
    </>
  );
};

export default Login;
