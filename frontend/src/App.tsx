import { useStore } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import LoginPage from './pages/login-page';
import ProtectedRoute from './components/common/protected-route/ProtectedRoute';

import { setupAxios } from './utils/http';

function App() {
  const store = useStore();

  setupAxios(store);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Private Routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<div>Dashboard</div>} />
            <Route path="/profile" element={<div>Profile</div>} />
          </Route>

          {/* Error Routes */}
          <Route path="/*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
