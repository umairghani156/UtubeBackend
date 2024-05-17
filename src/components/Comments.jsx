import { Comment } from './Comment';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from "axios";
import { useSelector, useDispatch} from 'react-redux';
import { commentSuccess } from '../redux/commentSlice';

const Container = styled.div`
 `;
const NewComment = styled.div`
display: flex;
align-items: center;
`;
const Avatar = styled.img`
border-radius: 50%;
width: 100%;
height: 100%;
object-fit: cover;`;
const Input = styled.input`
border: none;
border-bottom: 1px solid ${({theme})=> theme.soft};
background-color: transparent;
outline: none;
padding: 5px;
width: 100%;
color: ${({theme})=> theme.textSoft};
`;
const UserImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid grey;

`;
const CommentButtons = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;`;
const Button = styled.button`
background-color:  #999;
border: 1px solid ${({theme})=> theme.soft};
padding: 5px;
border-radius: 4px;
color: ${({theme})=> theme.text};
cursor: pointer;

`;
export const Comments = ({videoId}) => {
  const {currentUser} = useSelector(state => state.user);
  const {currentComment} = useSelector(state => state.comment);
  const dispatch = useDispatch();
  const [userComment, setUserComment] = useState(undefined)

  const [comments, setComments] = useState([]);
  //console.log("videoId", videoId);
  useEffect(()=>{
     const fetchComments = async () =>{
      try{
       const resComments = await axios.get(`http://localhost:8000/api/comments/${videoId}`,{
        withCredentials: true
       });

       const sortComment = resComments.data.sort((a,b)=> {
       return  new Date(b.createdAt) - new Date(a.createdAt)});
       console.log(sortComment);
       setComments(sortComment)
       //console.log("resComments", resComments);
      }catch(err){
        console.log(err);
      }
     };
     fetchComments()
  },[videoId])
  // Comment a video
  const commentHandler = async (id)=>{
    const res = await axios.post(`http://localhost:8000/api/comments`,{
      desc: userComment,
      videoId: id,
    },{
      withCredentials: true,
    });
    console.log('commentRes', res);
    dispatch(commentSuccess(res.data))
    window.location.reload()
  }
  return (
    <Container>
        <NewComment>
          <UserImg>
           <Avatar src={currentUser?.img}/>
           </UserImg>
           <Input placeholder='Add a comment' onChange={(e)=> setUserComment(e.target.value)}/> 
        </NewComment>
        <CommentButtons>
         {userComment && <Button onClick={()=>commentHandler(videoId)}>Comment</Button>}
        </CommentButtons>
        {
          
          comments?.map(comment=>(
            <Comment key={comment._id} comment={comment} videoId={videoId}/>
          ))
        }
        
    </Container>
  )
}
