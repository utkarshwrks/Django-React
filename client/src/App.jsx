import { useEffect, useState } from 'react'


const API_BASE = import.meta.env.VITE_API_BASE


export default function App() {
const [status, setStatus] = useState('checking...')
const [error, setError] = useState('')


useEffect(() => {
fetch(`${API_BASE}/ping/`)
.then(res => {
if (!res.ok) throw new Error(`HTTP ${res.status}`)
return res.json()
})
.then(data => setStatus(`${data.status} (${data.service}) v${data.version}`))
.catch(err => setError(err.message))
}, [])


return (
<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
<div style={{padding:24,borderRadius:16,boxShadow:'0 10px 30px rgba(0,0,0,.08)'}}>
<h1>React ↔ Django Health Check</h1>
<p><strong>API:</strong> {API_BASE}</p>
{error ? (
<p style={{color:'crimson'}}>Error: {error}</p>
) : (
<p>Backend status: {status}</p>
)}
</div>
</div>
)
}