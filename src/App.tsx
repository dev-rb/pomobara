import * as React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ReloadPrompt from './ReloadPrompt'

interface TaskModalContextInterface {
  viewTaskModal: boolean,
  setViewTaskModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const TaskModalContext = React.createContext<Partial<TaskModalContextInterface>>({});

interface Props {
  children?: React.ReactNode
}

const TaskModalContextProvider = ({ children }: Props) => {
  const [viewTaskModal, setViewTaskModal] = React.useState(false);

  return (
    <TaskModalContext.Provider value={{ viewTaskModal, setViewTaskModal }}>
      {children}
    </TaskModalContext.Provider>
  );
}


function App() {

  return (
    <TaskModalContextProvider>
      <div className="App">
        <Header />
        <ReloadPrompt />
        <Outlet />
        {/* <Navbar /> */}

      </div>
    </TaskModalContextProvider>
  )
}

export default App;
