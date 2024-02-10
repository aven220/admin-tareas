import Taskform from "./task/Taskform";
import TaskList from "./task/TaskList";

function App() {


  return (
    <div className="bg-zinc-900 h-screen">
      <div className="container  mx-auto p-10" >
        <Taskform />
        <TaskList />
      </div>
    </div>
  );
}

export default App;

