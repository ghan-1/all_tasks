import logo from './logo.svg';
import './App.css';
import Image1 from "./images/download.jpeg";
import Image2 from "./images/download_2.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from 'react';
import { Button } from "react-bootstrap";
import Form from './Components/Forms/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './Components/ProductList';
import UserCrud from './UserCrud';


function MainContent() {
  const [showImg, setshowImg] = useState(true);

  const toggleImgShow = () => {
    setshowImg((prev) => !prev);
  };

  return (
    <div>
      <h1>Lazy Loading with conditional rendering</h1>
      <Button variant="primary" onClick={toggleImgShow}>
        {showImg ? 'Hide Images' : 'Show Images'}
      </Button>
      {showImg ? (
        <div>
          <LazyLoadImage
            src={Image1}
            width={600}
            height={400}
            alt="Image Alt"
            effect="blur"
          />
          <LazyLoadImage
            src={Image2}
            width={600}
            height={400}
            alt="Image Alt"
          />
        </div>
      ) : (
        <p>Images not showing</p>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Define your route for "/store" */}
          <Route path="/store" element={<ProductList />} />

          {/* Define your route for "/" (root) */}
          <Route path="/" element={<MainContent />} />
          <Route path="/form" element={<Form />}/>
          <Route path="/crud" element={<UserCrud />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
