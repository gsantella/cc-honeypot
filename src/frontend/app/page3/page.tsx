export default async function Home() {
  let data = await fetch('http://localhost:3001/v1/bird')
  let birds = await data.json()
  console.log(birds)
  return (
    <ul>
      {birds.map((bird: any) => (
        <li key={bird.id}>{bird.title}</li>
      ))}
    </ul>
  )
}