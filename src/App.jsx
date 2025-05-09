import Canvas from "./components/Canvas/Canvas";
import Landing from "./components/Landing/Landing";
import Dropzone from "./components/Dropzone/Dropzone";
import Tracks from "./components/Tracks/Tracks";
import Picker from "./components/Picker/Picker";
import Manager from "./components/Manager/Manager";

function App() {
  return (
    <>
      <Landing />
      <Dropzone />
      <Picker />
      <Manager />
      <Tracks />
      <Canvas />
    </>
  );
}

export default App;
