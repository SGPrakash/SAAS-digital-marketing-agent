import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [businessName, setBusinessName] = useState('')
  const [industry, setIndustry] = useState('')
  const [contentType, setContentType] = useState('')
  const [generatedContent, setGeneratedContent] = useState([])
  const [message, setMessage] = useState('')
  
  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate`, 
        { businessName, industry, contentType },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setGeneratedContent(prev => [...prev, response.data.content])
      setMessage('Content generated successfully')
    } catch (error) {
      setMessage('Content generation failed')
    }
  }
  
  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setGeneratedContent(response.data.contents)
    } catch (error) {
      setMessage('Failed to fetch content')
    }
  }
  
  useEffect(() => {
    fetchContent()
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Business Name"
          value={businessName}
          onChange={(e)=> setBusinessName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input 
          type="text" 
          placeholder="Industry"
          value={industry}
          onChange={(e)=> setIndustry(e.target.value)}
          className="border p-2 mr-2"
        />
        <input 
          type="text" 
          placeholder="Content Type (blog, tweet, LinkedIn post)"
          value={contentType}
          onChange={(e)=> setContentType(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleGenerate} className="bg-purple-500 text-white px-4 py-2 rounded">
          Generate Content
        </button>
      </div>
      {message && <p className="mb-4">{message}</p>}
      <div>
        <h3 className="text-xl mb-2">Generated Content</h3>
        <ul>
          {generatedContent.map((content, index) => (
            <li key={index} className="mb-4 border p-2 bg-white">
              <p>{content}</p>
              <button 
                onClick={() => navigator.clipboard.writeText(content)}
                className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}