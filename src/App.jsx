import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Store from './pages/Store'
import Cartegories from "./pages/Cartegories"
import Mp4 from "./pages/Mp4"
import Cart from "./pages/Cart"
import Popular from './pages/Popular'
import Purchased from './pages/Purchased'
import Account from './pages/Account'
import Authetication from './pages/Authetication'
import Deposit from './pages/Deposit'
import Play from './pages/Play'
import Search from "./pages/Search"
import Spin from "./pages/Spin"
import Message from "./pages/Message"
import ForgotPasswordForm from './pages/ForgotpwdForm'
import ResetPasswordForm from './pages/Pwdrest'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/store' element={<Store/>}/>
        <Route path='/series' element={<Store/>}/>
        <Route path='/movies' element={<Store/>}/>
        <Route path='/anime' element={<Store/>}/>
        <Route path='/category' element={<Cartegories/>}/>
        <Route path='/store/:slug' element={<Mp4/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/cartegory/:slug' element={<Popular/>}/>
        <Route path='/purchased' element={<Purchased/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/account/authenticate' element={<Authetication/>}/>
        <Route path='/account/deposit' element={<Deposit/>}/>
        <Route path='/store/play/:slug' element={<Play/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/message' element={<Message/>}/>
        <Route path='/account/password_reset' element={<ForgotPasswordForm/>}/>
        <Route path='/account/password_reset/:slug' element={<ResetPasswordForm/>}/>
        <Route path='/spin_and_win' element={<Spin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
