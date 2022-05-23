import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Register: React.FC = ({}) => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const login = async () => {
    
  }

  const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      login()
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}/register/`,
          { username: username, password: password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (res.status === 201) login()
      } catch {
        setError('Registration Error')
      }
    }
  }

  return (
    <>
      <p className="text-3xl text-center mt-8">{isLogin ? 'Sign In' : 'Sign up'}</p>
      <form onSubmit={authUser} className="mt-8 space-y-3">
        <div>
          <input
            type="text"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
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
              setEmail(e.target.value)
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
              setPassword(e.target.value)
            }}
          />
        </div>
        <p
          data-testid="mode-change"
          onClick={() => {
            setIsLogin(!isLogin)
            setError('')
          }}
          className="cursor-pointer flex items-center justify-center flex-col font-medium hover:text-indigo-500 "
        >
          change mode ?
        </p>

        <div className="flex items-center justify-center flex-col">
          <button
            disabled={!username || !password || !email}
            type="submit"
            className="disabled:opacity-40 py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>
      {error && <p className="mt-5 text-red-600">{error}</p>}
    </>
  )
}

export default Register;
