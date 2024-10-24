"use client"


import { useState, useEffect } from 'react'
 
export default function ISS() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    fetch('http://api.open-notify.org/iss-now.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [refresh])

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <div>
      <p>{data.iss_position.latitude}</p>
      <p>{data.iss_position.longitude}</p>
      <button onClick={handleRefresh}>Refresh Data</button>
    </div>
  )
}