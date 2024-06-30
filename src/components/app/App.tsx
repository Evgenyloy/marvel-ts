import AppHeader from '../appHeader/AppHeader';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ComicsPage from '../pages/ComicsPage';
import MainPage from '../pages/MainPage';
import SingleComic from '../singleComic/SingleComic';
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="comics" element={<ComicsPage />} />
            <Route path="comics/:id" element={<SingleComic />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
