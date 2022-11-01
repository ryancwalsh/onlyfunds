import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navigation } from './components/Navigation';
import { Body } from './components/Body';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Body/>
    </div>
  );
}

export default App;
