import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Servicies from './pages/Servicies';
import About from './pages/About'
import './App.css';
import NavBar from './components/NavBar';
import { UseSelector, useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDocter from './pages/ApplyDocter';
import Notification from './pages/Notification';
import Users from './pages/admin/Users';
import Docters from './pages/admin/Docters';
import Profile from './pages/docter/Profile';
import BookingPage from './pages/BookingPage';

function App() {
  const { loading } = useSelector(state => state.alerts);
  return (

    <>
      <BrowserRouter>
        {/* <NavBar /> */}
        {loading ? (
          <Spinner />
        ) : (

          <Routes>
            <Route path='/'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>

              } />
            <Route path='/apply-docter'
              element={
                <ProtectedRoute>
                  <ApplyDocter />
                </ProtectedRoute>

              } />
            <Route path='/admin/users'
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>

              } />
            <Route path='/admin/docter'
              element={
                <ProtectedRoute>
                  <Docters />
                </ProtectedRoute>

              } />


            <Route path='/docter/profile/:id'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>

              } />

            {/* appintement booking  Route*/}
            <Route path='/docter/book-appointment/:docterId'
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>

              } />


            <Route path='/notification'
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>

              } />


            <Route path='/about' element={<About />} />


            <Route path='/login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>

            } />
            <Route path='/register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path='/contact' element={<Contact />} />
            <Route path='/servicies' element={<Servicies />} />
          </Routes>)}



      </BrowserRouter>
    </>
  );
}

export default App;
