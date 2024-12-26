import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Users, BookOpen, GraduationCap, DollarSign } from 'lucide-react';
import Layout from './components/Layout';
// import StatCard from './components/StatCard';
// import AttendanceChart from './components/charts/AttendanceChart';
// import StudentDistribution from './components/charts/StudentDistribution';
// import EventsList from './components/EventsList';
// import TeachersList from './components/TeachersList';
// import NewStudentList from './components/students/NewStudentList';
// import ExamSchedule from './components/exams/ExamSchedule';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import Studednt from './pages/Studednt';
import Course from './pages/Course';
import Schedule from './pages/Schedule';
import Lectures from './pages/Lectures';
import Request from './pages/Request';
import Fees from './pages/Fees';
import Payout from './pages/Payout';
// import Setting from './pages/Setting';
import Marksheet from './pages/Marksheet';
import ProtectedRoute from './pages/auth/ProtectedRoute';
// function Dashboard() {
//   const role = localStorage.getItem('role')
//   console.log(role)
//   return (
//     <Layout>
//       {role === 'Principal' && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
//           <StatCard
//             icon={<Users className="text-blue-600" />}
//             title="Total Sales"
//             value="1500"
//             trend={12}
//             trendLabel="16% more than last month"
//           />
//           <StatCard
//             icon={<BookOpen className="text-green-600" />}
//             title="Total Courses"
//             value="125"
//             trend={8}
//             trendLabel="12% more than last month"
//           />
//           <StatCard
//             icon={<GraduationCap className="text-purple-600" />}
//             title="Total Teachers"
//             value="89"
//             trend={-5}
//             trendLabel="3% less than last month"
//           />
//           <StatCard
//             icon={<DollarSign className="text-yellow-600" />}
//             title="Fees Collection"
//             value="$48,697"
//             trend={15}
//             trendLabel="8% more than last month"
//           />
//         </div>
//       )}
//       {(role === 'Principal' || role === 'Teacher') && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <AttendanceChart />
//           <StudentDistribution />
//         </div>
//       )}
//       {['Student', 'Principal', 'Teacher'].includes(role) && (
//         <div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//             <TeachersList />
//             <EventsList />
//           </div>
//           <ExamSchedule />
//         </div>
//       )}
//       {(role === 'Principal' || role === 'Teacher') && (
//         <NewStudentList />
//       )}
//     </Layout>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

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
                <Route path="/course" element={<Course />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/lecture" element={<Lectures />} />
                <Route path="/request" element={<Request />} />
                <Route path="/fees" element={<Fees />} />
                <Route path="/payout" element={<Payout />} />
                {/* <Route path="/setting" element={<Setting />} /> */}
                <Route path="/marksheet" element={<Marksheet />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
