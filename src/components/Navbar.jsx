import React, { useEffect } from 'react'
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Upload } from './Upload';
import {useNavigate} from "react-router-dom";
import { menuSuccess } from '../redux/showMenuSlice';
import useWindowWidth from '../hook/useWindowWidth';

const Container = styled.div`
position: sticky;
top: 0;
background-color:  ${({theme})=> theme.bgLighter};
height: 50px;
@media (max-width: 788px) {
 height: 100px;
 z-index: 1;
 
}
@media (max-width: 360px) {
z-index: 1;
}
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
  @media (max-width: 788px) {
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}


`
const Search = styled.div`
width: 40%;

left: 0;
right: 0;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 6px;
color: ${({theme})=> theme.text};
@media (max-width: 788px) {
  width: 100%;
}


 
`
const Input = styled.input`
border: none;
background-color: transparent;
outline: none;
color: white;
`
const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
margin-top: 6px;
gap: 5px;
font-size: 12px;

`;

const User = styled.div`
 display: flex;
 align-items: center;
 gap: 10px;
 font-weight: 500;

 color:  ${({theme})=> theme.text};
 cursor: pointer;

`;
const UserImg = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid grey;

`;

const Avatar = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 50%;
background-color: transparent;

`;
const SignUpDev = styled.div`


`;
const MenuIconDisplay = styled.span`
display: none;
   @media (max-width: 460px) {
  display: flex;
}
`;
const WrapperTwo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
export const Navbar = () => {
  const navigate = useNavigate()
  const {menu} = useSelector(state=> state.menu);
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [q, setQ] = useState("");
  const {currentUser} = useSelector(state => state.user);
  const width = useWindowWidth();

  const showMenus = () =>{
    dispatch(menuSuccess(!menu))
    
  }
  useEffect(()=>{
    if (width > 500) {
      dispatch(menuSuccess(true));
    } else {
      dispatch(menuSuccess(false));
    }
  },[width])
  return (
    <>
    <Container>
      <Wrapper>
        <WrapperTwo>
      <MenuIconDisplay><MenuIcon onClick={()=>showMenus()}/></MenuIconDisplay>
        <Search>
         
          <Input placeholder='Search' onChange={(e)=> setQ(e.target.value)}/>
          <SearchOutlinedIcon onClick={()=> navigate(`/search?q=${q}`)}/>
        </Search>
        </WrapperTwo>
        <SignUpDev>
        {currentUser ?
        <User>
          <VideoCallOutlinedIcon onClick={()=> setOpenModal(true)}/>
          <UserImg>
          <Avatar src={currentUser.img}/>
          </UserImg>
          {currentUser.name}
        </User>
        :<Link to='signin' style={{textDecoration:"none"}}>
        <Button>
          <AccountCircleOutlinedIcon/>
          SIGN IN
          </Button>
          </Link>}
          </SignUpDev>
      </Wrapper>
    </Container>
    {
      openModal && <Upload setOpenModal={setOpenModal}/>
    }
    </>
  )
}
