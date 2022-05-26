
import './App.css';
import {YearApiTableReg} from "./components/player_stats_table";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    
      </header>
      <div className='h-max'>
      <YearApiTableReg/>
      </div>
    
    </div>
    
  );
}

export default App;
