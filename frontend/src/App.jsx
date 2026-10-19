import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

// ... imports ...

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Ek main wrapper div add karo */}
        <div className="app-wrapper"> 
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/details" element={<DestinationDetails />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;