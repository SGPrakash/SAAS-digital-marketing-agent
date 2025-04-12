import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      setMessage('Login successful')
      router.push('/dashboard')
    } catch (error) {
      setMessage('Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  )
}