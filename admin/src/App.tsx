import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, DollarSign } from 'lucide-react';
import Layout from './components/Layout';
import StatCard from './components/StatCard';
import AttendanceChart from './components/charts/AttendanceChart';
import StudentDistribution from './components/charts/StudentDistribution';
import EventsList from './components/EventsList';
import TeachersList from './components/TeachersList';
import NewStudentList from './components/students/NewStudentList';
import ExamSchedule from './components/exams/ExamSchedule';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

function Dashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        <StatCard
          icon={<Users className="text-blue-600" />}
          title="Total Sales"
          value="1500"
          trend={12}
          trendLabel="16% more than last month"
        />
        <StatCard
          icon={<BookOpen className="text-green-600" />}
          title="Total Courses"
          value="125"
          trend={8}
          trendLabel="12% more than last month"
        />
        <StatCard
          icon={<GraduationCap className="text-purple-600" />}
          title="Total Teachers"
          value="89"
          trend={-5}
          trendLabel="3% less than last month"
        />
        <StatCard
          icon={<DollarSign className="text-yellow-600" />}
          title="Fees Collection"
          value="$48,697"
          trend={15}
          trendLabel="8% more than last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AttendanceChart />
        <StudentDistribution />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TeachersList />
        <EventsList />
      </div>

      <ExamSchedule />

      <NewStudentList />
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
