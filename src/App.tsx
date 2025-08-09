import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route 
            path="/favorites" 
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }: { children: any }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default App;