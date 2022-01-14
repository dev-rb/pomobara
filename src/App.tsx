import './App.css';
import Header from './components/Header';
import Level from './components/Level';
import Navbar from './components/Navbar';
import TaskGroup from './components/TaskGroup';

function App() {

  return (
    <div className="App">
      <Header />
      <Navbar />
      <div className="Tasks">
        <Level />
        <div className="TaskGroups">
          <TaskGroup />
          <TaskGroup />
          <TaskGroup />
        </div>
      </div>
    </div>
  )
}

export default App;
