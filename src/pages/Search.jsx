import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { Card } from '../components/Card';

const Container = styled.div`
 display: flex;
 flex-wrap: wrap;
 gap: 10px;
`;
export const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search

    useEffect(()=>{
     const fetchVideos = async ()=>{
        const res = await axios.get(`http://localhost:8000/api/videos/search${query}`,null,{
            withCredentials: true,
        });
        console.log('res',res);
        setVideos(res.data)
     }
     fetchVideos()
    },[])
  return (
    <Container>
        {
            videos?.map(video=>(
                <Card key={video._id} video={video}/>
            ))
        }
    </Container>
  )
}
