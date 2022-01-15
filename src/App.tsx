import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ReloadPrompt from './ReloadPrompt'

function App() {

  return (
    <div className="App">
      <Header />
      <ReloadPrompt />
      <Outlet />
      {/* <Navbar /> */}

    </div>
  )
}

export default App;
