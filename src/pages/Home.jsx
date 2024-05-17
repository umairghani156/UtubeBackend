import axios from 'axios'
import { Card } from '../components/Card'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
margin: 0 20px;
@media (max-width: 720px) {
  flex-direction: column;
  width:${(props)=> props.type !== "sm" && "100%"};
  height:${(props)=> props.type !== "sm" && "100%"};

  gap: 10px;
  object-fit: cover;
 margin-left: 0;
 padding: 10px;
 }
`
export const Home = ({type}) => {
   const [videos, setVideos] = useState([]);

   const fetchVideoData = async () =>{
    const res = await axios.get(`http://localhost:8000/api/videos/${type}`);
    // console.log("Res", res);
    setVideos(res.data)
   }

   useEffect(()=>{
    fetchVideoData()
   },[type])
  return (
    <Container>
      {
        videos?.map((video)=>(
          <Card key={video._id} video={video}/>
        ))
      }
    </Container>
  )
}
