import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const FullPizza: React.FC = ()  => {
  const {id} = useParams()
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title: string,
    price: number
  }>()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get("https://640b60e381d8a32198e2a60f.mockapi.io/items/" + id)
        setPizza(data)
      } catch (error) {
        alert("Cannot get pizza")
        navigate('/')
      }
    }
    fetchPizza();
  }, [])

  if (!pizza) {
    return <>Loading...</>
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  )
}
