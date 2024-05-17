import './App.css'
import styled, { ThemeProvider } from 'styled-components'
import { Menu } from './components/Menu'
import { Navbar } from './components/Navbar'
import { useState } from 'react';
import { darkTheme, lightTheme } from './components/utils/Theme';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import {Home} from './pages/Home'
import { Video } from './pages/Video';
import { Signin } from './pages/Signin';
import { Search } from './pages/Search';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  `;
const Main = styled.div`
  flex: 7;
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text}

`;
const Wrapper = styled.div`
//padding: 22px 96px;
`;
function App() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [darkMode, setdarkMode]= useState(true)
  return (
    <ThemeProvider theme={ darkMode? darkTheme : lightTheme}>
    <Container>
      <BrowserRouter>
     <Menu darkMode={darkMode} setdarkMode={setdarkMode}/>
     <Main>
      <Navbar/>
       <Wrapper>
        <Routes>
          <Route path='/'>
            <Route index element={currentUser ?<Home type="random"/> : <Signin/>}/>
            <Route path='trends' element={currentUser? <Home type="trend"/> : <Signin/>}/>
            <Route path='subscriptions' element={ currentUser ? <Home type="sub"/> : <Signin/>}/>
            <Route path='search' element={<Search />}/>
             
            <Route path='signin' element={<Signin/>}/>
            <Route path='video'>
              <Route path=":id" element={currentUser ? <Video/> : <Signin/>}/>
            </Route>
          </Route>
         

        </Routes>
       </Wrapper>
     </Main>
     </BrowserRouter>
    </Container>
    </ThemeProvider>
  )
}

export default App
