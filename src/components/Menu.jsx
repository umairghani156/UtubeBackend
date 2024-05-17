import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import LogoTube from "../assets/logo.png";
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import {useDispatch} from "react-redux"
import { logOut } from '../redux/userSlice';
import "./comp.css"
import { isUserSuccess } from '../redux/isUserSlice';
import { menuSuccess } from '../redux/showMenuSlice';

const Container = styled.div`
flex: 1;
background-color: ${({theme})=> theme.bgLighter};
height: 160vh;
color: ${({theme})=> theme.text};
font-size: 12px;
position: sticky;
top: 0;
@media (max-width: 360px) {
position: absolute;
z-index: 999;
}
`;

const Wrapper = styled.div`
  padding: 10px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  
  `
  
  ;

const Img = styled.img`
 height: 25px;
 `

const Item = styled.div`
display: flex;
align-items: center;
gap: 20px;
cursor: pointer;
padding: 7.5px 0px;
&:hover{
    background-color: ${({theme})=> theme.soft};
}
`;
const Hr = styled.div`
margin: 15px 0px;
border: 0.5px solid ${({theme})=> theme.soft};
`
const Login = styled.div`
`;
const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
margin-top: 10px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;

`;
const Title = styled.h2`
 font-size: 11px;
 font-weight: 500;
 color: #aaaaaa;
 margin-bottom: 20px;
 @media (max-width: 475px) {
 display: none;
}
 `;
 const SpanContent = styled.span`
 @media (max-width: 475px) {
 display: none;
}
`;
const MenuIconDisplay = styled.span`
display: none;
   
   @media (max-width: 460px) {
  display: flex;
  padding:5px 0;
}
`;

export const Menu = ({darkMode, setdarkMode}) => {
  const {currentUser} = useSelector(state => state.user);
  const {menu} = useSelector(state => state.menu);
  const {isUser} = useSelector(state => state.isUser);

  const dispatch = useDispatch();

  const logOutHandler = ()=>{
    dispatch(logOut())
  }
  const signHandler = () =>{
    dispatch(isUserSuccess(!isUser))

  }
  const showMenus = () =>{
    dispatch(menuSuccess(!menu))
    
  }
  return (
    <>
   {menu && <Container>
        <Wrapper>
        <MenuIconDisplay><MenuIcon onClick={()=>showMenus()}/></MenuIconDisplay>
            <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
            <Logo>
                <Img style={{width:"30px"}} src={LogoTube}/>
                <SpanContent>
                SMIT-Tube
                </SpanContent>
            </Logo>
            </Link>
            <Link to='/' style={{textDecoration:"none", color:"inherit"}}>
            <Item >
                <HomeIcon/>
                <SpanContent>
                Home
                </SpanContent>
                
            </Item>
            </Link>
            <Link to='trends' style={{textDecoration:"none", color:"inherit"}}>
            <Item>
                <ExploreOutlinedIcon/>
                <SpanContent>
                Explore
                </SpanContent>
            </Item>
            </Link>
            <Link to='subscriptions' style={{textDecoration:"none", color:"inherit"}}>
            <Item>
                <SubscriptionsOutlinedIcon/>
                <SpanContent>
                Subscriptions
                </SpanContent>
            </Item>
            </Link>
            <Hr/>
            <Item className='videoIcon'>
                <VideoLibraryOutlinedIcon className='videoIcon'/>
                <SpanContent>
                Library
                </SpanContent>
            </Item>
            <Item  className='historyIcon'>
                <HistoryOutlinedIcon/>
                <SpanContent>
                History
                </SpanContent>
            </Item>
            {!currentUser &&
                <>
            <Hr/>
            <Login className='signPar'>
               <SpanContent>Sign in to like videos, comment, and subscribe</SpanContent>
                
                <Link to='signin' style={{textDecoration:"none"}}>
                <Button className='signBtn' onClick={()=> signHandler()}><AccountCircleOutlinedIcon/>SIGN IN</Button>
                </Link>
            </Login>
            <Hr/>
            </>
            }
            <Title  className='title'>BEST OF SMIT-TUBE</Title>
            <Item  className='historyIcon'>
                <LibraryMusicOutlinedIcon/>
                <SpanContent>
                Music 
                </SpanContent>
            </Item>
            <Item  className='historyIcon'>
                <SportsBasketballOutlinedIcon/>
                <SpanContent>
                Sports
                </SpanContent>
            </Item>
            <Item  className='historyIcon'>
                <SportsEsportsOutlinedIcon/>
                <SpanContent>
                Gaming
                </SpanContent>
            </Item>
            <Item  className='historyIcon'>
                <MovieOutlinedIcon/>
                <SpanContent>
                Movies
                </SpanContent>
            </Item>
            <Item  className='historyIcon'>
                <ArticleOutlinedIcon/>
                <SpanContent>
                News
                </SpanContent>
            </Item>
            <Item  className='historyIcon'>
                <LiveTvOutlinedIcon/>
                <SpanContent>
                Live
                </SpanContent>
            </Item >
            <Hr/>
            <Item  className='historyIcon'>
                <SettingsOutlinedIcon/>
                <SpanContent>
                Settings
                </SpanContent>
            </Item>
            <Item  className='historyIcon'>
                <FlagOutlinedIcon/>
                <SpanContent>
                Report
                </SpanContent>
            </Item>
            <Item  className='historyIcon'>
                <HelpOutlineOutlinedIcon/>
                <SpanContent>
                Help
                </SpanContent>
            </Item>
            <Item onClick={()=> setdarkMode(!darkMode)}>
                <SettingsBrightnessOutlinedIcon/>
                <SpanContent>
                {
                    darkMode ? "Light " : "Dark "
                } Mode
                </SpanContent>
            </Item>
            <Link to="/signin" style={{textDecoration:"none",color:"inherit"}}>
            <Item onClick={logOutHandler}>
                <LogoutOutlinedIcon/>
                <SpanContent>
                LogOut
                </SpanContent>
            </Item>
            </Link>
        </Wrapper>
    </Container>}
    </>
  )
}

