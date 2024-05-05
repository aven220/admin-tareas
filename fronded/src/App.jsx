import Taskform from "./task/Taskform";
import TaskList from "./task/TaskList";
import { useState } from 'react';
import Login from "./Login/Login";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  const menu = () => {
    return (
      <>
        <Taskform usuarios={usuarios}/>
        <TaskList usuarios={usuarios}/>
      </>
    );
  }

  return (
    <div className="bg-zinc-900 h-screen">
      <div className="container mx-auto p-10">
        <div className='App'>
          {usuarios.length === 0 ? <Login setUsuarios={setUsuarios} /> : menu()}
        </div>      
      </div>
    </div>
  );
}

export default App;
