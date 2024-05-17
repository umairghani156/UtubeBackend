import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import {format} from 'timeago.js'


const Container = styled.div`
 width:${(props)=> props.type !== "sm" && "300px"};
 margin-bottom:  ${(props)=> props.type === "sm" ? "10px": "45px"};
 cursor: pointer;
 display: ${(props)=> props.type === "sm" && "flex"};
 margin-top:  ${(props)=> props.type === "sm" ? "10px": "20px"};
 gap: 5px;
 @media (max-width: 788px) {
  flex-direction: column;
  
  width:${(props)=> props.type !== "sm" && "250px"};
  gap: 10px;
 }
 @media (max-width: 720px) {
  flex-direction: column;
  width:${(props)=> props.type !== "sm" && "220px"};
  gap: 10px;
 }
 @media (max-width: 720px) {
  flex-direction: row;
  width:${(props)=> props.type !== "sm" && "100%"};
  gap: 10px;
 }
 @media (max-width: 554px) {
  flex-direction: row;
  display:${(props)=> props.type == "sm" && "flex"};
  flex-direction:${(props)=> props.type == "sm" && "column"};

  gap: 10px;
 }
`;
const Image = styled.img`
 width: ${props => props.type === 'sm' ? '300px' : '100%'};
 height:${(props)=> props.type === "sm" ? "100px" : "170px"} ;
 background-color: #999;
 flex: 1;
 object-fit: cover;
`;

const Details = styled.div`
display: flex;
margin-top: ${(props)=> props.type !== "sm" && "16px"};
gap: 12px;
width: 100%;
flex: 1;

`;
const ChannelImage = styled.img`
 width: ${(props)=> props.type === "sm" ? "25px": "36px"};
 height: ${(props)=> props.type === "sm" ? "25px": "36px"};
 border-radius: 50%;
 background-color: #999;
 display: ${(props)=> props.type === "sm" && "none"};
`;
const Texts = styled.div``;
const Title = styled.h1`
 font-size:  ${(props)=> props.type === "sm" ? "12px": "14px"};;
 font-weight: 500;
 color: ${({theme})=> theme.text};
`;
const ChannelName = styled.h2`
 font-size: 12px;
 color:${({theme})=> theme.textSoft};
 margin: 9px 0px;
`;
const Info = styled.div`
font-size: 12px;
color: ${({theme})=> theme.textSoft};
`;

export const Card = ({type, video}) => {
  const [channel, setChannel] = useState({});
  const {currentUser} = useSelector(state => state.user);
  

  const fetchChannel = async () =>{
   const res = await axios.get(`http://localhost:8000/api/users/find/${video?.userId}`);
   setChannel(res.data)
  }

  useEffect(()=>{
    fetchChannel()
  },[video?.userId])
  return (
    <Link to={`/video/${video?._id}`} style={{textDecoration:"none"}}>
    <Container type={type}>
      <Image type={type} src={video?.imgUrl}/>
      <Details type={type}>
        <ChannelImage type={type} src={video?.userImg}/>
        <Texts>
          <Title type={type}>{video?.title}</Title>
          <ChannelName type={type}>{channel?.name}</ChannelName>
          <Info type={type}>{video?.views} views * {format(video?.createdAt)}</Info>
        </Texts>
      </Details>
      </Container>
    </Link>
  )
}
