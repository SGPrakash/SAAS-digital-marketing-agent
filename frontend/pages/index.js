import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">SAAS Digital Marketing Agent</h1>
      <p className="mb-6">Automate your digital marketing with AI-generated content!</p>
      <div>
        <Link href="/login">
          <a className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Login</a>
        </Link>
        <Link href="/register">
          <a className="bg-green-500 text-white px-4 py-2 rounded">Register</a>
        </Link>
      </div>
    </div>
  )
}