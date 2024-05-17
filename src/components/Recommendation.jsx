import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from "styled-components";
import { Card } from './Card';
const Container = styled.div`
flex: 2;
`;


export const Recommendation = ({tags}) => {
const [videos, setVideos] = useState([]);

useEffect(()=>{
    const fetchVideos = async ()=>{
        const res = await axios.get(`http://localhost:8000/api/videos/tags?tags=${tags}`,{},{
            withCredentials: true,
        });
        setVideos(res.data)
        //console.log("resVideos",res.data);
    };
    fetchVideos()
},[tags])
  return (
    <Container>
      {
       videos?.map(video=>(
        <Card type='sm' key={video._id} video={video}/>
       ))
      }
    </Container>
  )
}
