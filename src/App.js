import './App.css';
import Disperse from './components/Disperse';
import OnSubmit from './components/OnSubmit';
import DuplicateError from './components/DuplicateError';
import ValidNumbersValidator from './components/ValidNumbersValidator';
import Combine from './components/Combine';

function App() {
  return (
    <div className="App">
    <Disperse /> 
      {/* <OnSubmit />
    <DuplicateError />
    <ValidNumbersValidator />
    <Combine /> */}
    </div>
  );
}

export default App;
