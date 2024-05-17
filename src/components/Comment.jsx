import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from "axios" ;
import {format} from "timeago.js";
import { useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
display: flex;
gap: 10px;
margin: 30px 0px;
`;

const Avatar = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 50%;`;

const UserImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid grey;

`;

const Details = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
color: ${({theme})=> theme.text};
`;
const Name = styled.span`
font-size: 13px;
font-weight: 500;
`;
const Date = styled.span`
font-size: 12px;
font-weight: 400;
color: ${({theme})=> theme.textSoft};
margin-left: 5px;
`;
const Text = styled.span`
font-size: 14px;
`;


export const Comment = ({comment}) => {
  const location = useLocation();
  console.log("ll",location);
  const [channel, setChannel] = useState({});
  const {currentComment} = useSelector(state => state.comment);
  const dispatch = useDispatch();
  const commentsData = async ()=>{
    const videoCom = await axios.get(`http://localhost:8000/api/users/find/${comment?.userId}`,{},{
          withCredentials: true
         });
    console.log("videoCom",videoCom);
    setChannel(videoCom.data)
  }
  useEffect(()=>{
     commentsData()
  },[comment?.userId])
  
  return (
    <Container>
        <UserImg>
        <Avatar src={channel?.img}/>
        </UserImg>
        <Details>
            <Name>
                {
                  channel?.name
                }
                <Date>{
                  format(comment?.createdAt)
                  }</Date>
            </Name>
            <Text>
              {
                comment?.desc
              }
            </Text>
        </Details>
    </Container>
  )
}
