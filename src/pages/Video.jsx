import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Comments } from '../components/Comments';
import {Card} from "../components/Card";
import {useSelector, useDispatch} from "react-redux";
import {useLocation} from "react-router-dom"
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import {format} from "timeago.js"
import { subscription } from '../redux/userSlice';
import { Recommendation } from '../components/Recommendation';
const Container = styled.div`
display: flex;
gap: 24px;
margin: 10px 20px;
@media (max-width: 788px) {
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
}
`;
const Content = styled.div`
flex: 5;
`;
const VideoWrapper = styled.div`

`;

const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({theme})=> theme.text};

`;
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
@media (max-width: 788px) {
 flex-direction: column;
 align-items: flex-start;
 gap: 10px;
}
`;
const Info = styled.span`
color: ${({theme})=> theme.textSoft};

`;
const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({theme})=> theme.text};
@media (max-width: 788px) {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

`;
const Button = styled.div`
 display: flex;
 align-items: center;
 gap: 5px;
 cursor: pointer;
`;

const Hr = styled.hr`
margin: 15px 0;
 border: 0.5px solid ${({theme})=> theme.soft};
`


const Channel = styled.div`
display: flex;
justify-content: space-between;
`;

const ChannelInfo = styled.div`
 display: flex;
 gap: 20px;
`;
const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;

`;
const ChannelDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({theme})=> theme.text};

`;
const ChannelName = styled.span`
font-weight: 500;
`;
const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20px;
color: ${({theme})=> theme.textSoft};
font-size: 12px;

`;
const Description = styled.p`
font-size: 14px;

`;
const Subscribe = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: white;
border: none;
border-radius: 5px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

export const Video = () => {
  const {currentUser} = useSelector(state => state.user);
  const {currentVideo} = useSelector(state => state.video);
  // console.log("currentVideo", currentVideo);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  
  // console.log("path",path);
  const [channel, setChannel] = useState({});
  const [isSub, setIsSub] = useState(false)

  useEffect(()=>{
     const fetchData = async()=>{
      try{
         const videoRes = await axios.get(`http://localhost:8000/api/videos/find/${path}`,{},{
          withCredentials: true
         });
    
         const channelRes = await axios.get(`http://localhost:8000/api/users/find/${videoRes?.data._doc.userId}`,{},{
          withCredentials: true
         });
         setChannel(channelRes.data);
         dispatch(fetchSuccess(videoRes.data._doc))
         
      }catch(err){
       console.log(err);
      }
     }
     fetchData()
  },[path, dispatch, isSub]);

  //Like a Video
  const likeHandler =async () =>{
    console.log(currentVideo._id);
     await axios.put(`http://localhost:8000/api/users/like/${currentVideo._id}`,null,{
      withCredentials: true,
     });
     dispatch(like(currentUser._id))
  };

  // Dislike video
  const disLikeHandler =async () =>{
    await axios.put(`http://localhost:8000/api/users/dislike/${currentVideo._id}`,null,{
     withCredentials: true,
    });
    dispatch(dislike(currentUser._id))
 };
 // Subscribe a user
 const subscribeHandler =async () =>{
  try{
    currentUser.subscribedUsers.includes(channel?._id) ?
    await axios.put(`http://localhost:8000/api/users/unsub/${channel?._id}`,{},{
      withCredentials: true
    }) : 
    await axios.put(`http://localhost:8000/api/users/sub/${channel?._id}`,{},{
      withCredentials: true
    });
    dispatch(subscription(channel?._id))
    setIsSub(!isSub)
  }catch(err){
    console.log("error",err);
  }
 }
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls/>
          <Title>{currentVideo?.title}</Title>
          <Details>
            <Info>{currentVideo?.views} views . {format(currentVideo?.createdAt)}</Info>
            
            <Buttons>
              <Button onClick={likeHandler}>
                {currentVideo?.likes?.includes(currentUser?._id) ?<ThumbUpIcon />:<ThumbUpOutlinedIcon/>}{currentVideo?.likes?.length}
                </Button>
              <Button onClick={disLikeHandler}>
                {currentVideo?.dislikes?.includes(currentUser?._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon/>}
                {currentVideo?.dislikes?.length}
                </Button>
                <Button>
                <ReplyOutlinedIcon/>Share
                </Button>
                <Button>
                <AddTaskOutlinedIcon/>Save
                </Button>
            </Buttons>

          </Details>
          <Hr/>
          <Channel>
            <ChannelInfo>
              <Image src={channel?.img}/>
              <ChannelDetail>
                <ChannelName>{channel?.name}</ChannelName>
                <ChannelCounter>{channel?.subscribers} subscribers </ChannelCounter>
                <Description>
                  {
                    currentVideo?.desc 
                  }
                </Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe onClick={subscribeHandler}>
              {currentUser.subscribedUsers?.includes(channel?._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
              </Subscribe>
          </Channel>
          <Hr/>
          <Comments videoId={currentVideo?._id}/>
        </VideoWrapper>
      </Content>
      <Recommendation tags={currentVideo?.tags}/>

    </Container>
  )
}
