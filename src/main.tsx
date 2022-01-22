import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Friends from './pages/Friends'
import 'react-datepicker/dist/react-datepicker.css'
import { Provider } from 'react-redux'
import { store } from './redux/store';

const updateSW = registerSW({
  onNeedRefresh() { },
  onOfflineReady() { },
})
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="/friends" element={<Friends />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
