import "./App.css";
import { Canvas } from "./components/Canvas";
import { initGrid } from "./webworker";

initGrid();

function App() {
  return (
    <>
      <Canvas />
    </>
  );
}

export default App;
