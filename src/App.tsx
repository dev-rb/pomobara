import { MdAdd } from 'react-icons/md';
import './App.css';
import Header from './components/Header';
import Level from './components/Level';
import Navbar from './components/Navbar';
import TaskGroup from './components/TaskGroup';

function App() {

  return (
    <div className="App">
      <Header />
      {/* <Navbar /> */}
      <div className="Tasks">
        <Level />
        <div className="TaskGroups">
          <TaskGroup />
          <TaskGroup />
          <TaskGroup />
        </div>
        <button className='NewTaskButton'> <MdAdd size={35} color="white" /> Add Task </button>
      </div>
    </div>
  )
}

export default App;
