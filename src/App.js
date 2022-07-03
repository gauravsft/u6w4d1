import './App.css';
import { Route, Routes } from "react-router-dom";
import { TodoDetails } from "./Components/TodoDetails";
import { TodoInput } from "./Components/TodoInput";
import { TodoList } from "./Components/TodoList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoInput />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todo/:id" element={<TodoDetails />} />
      </Routes>
    </div>
  );
}

export default App;
