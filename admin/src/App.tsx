import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import Studednt from './pages/Studednt';
import Schedule from './pages/Schedule';
import Lectures from './pages/Lectures';
import Request from './pages/Request';
import Fees from './pages/Fees';
import Payout from './pages/Payout';
import Marksheet from './pages/Marksheet';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import Status from './pages/Status';
import CoursePage from './pages/Course';
import TampleG from './pages/TampleG';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/request-p" element={<Status />} />

        {/* Wrap the routes with the Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={ <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
                <Route path="/teacher" element={<Teachers />} />
                <Route path="/student" element={<Studednt />} />
                <Route path="/course" element={<CoursePage />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/lecture" element={<Lectures />} />
                <Route path="/request" element={<Request />} />
                <Route path="/fees" element={<Fees />} />
                <Route path="/payout" element={<Payout />} />
                <Route path="/marksheet" element={<Marksheet />} />
                <Route path="/tampleG" element={<TampleG />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
