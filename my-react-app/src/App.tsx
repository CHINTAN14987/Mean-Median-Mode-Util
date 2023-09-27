import { getItemClass } from "./utils/index";
import Table from "./Table";
function App() {
  return (
    <div className="App">
      <Table data={getItemClass("Flavanoids")} />
      <Table data={getItemClass("Gamma")} />
    </div>
  );
}

export default App;
