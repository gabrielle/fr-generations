import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import DragonList from './components/DragonList';
import EditDragon from './components/EditDragon';
import Layout from './pages/Layout';
import Main from './pages/Main';
import AddNew from './pages/add.js';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/add" element={<AddNew />} />
          <Route path="edit">
            <Route path=":dragonId" element={<EditDragon />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
