import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { MovieProvider } from './contexts/MovieProvider';
import './css/App.css';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import WatchList from './pages/WatchList';

function App() {
  return (
    <>
      <MovieProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watch-list" element={<WatchList />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
