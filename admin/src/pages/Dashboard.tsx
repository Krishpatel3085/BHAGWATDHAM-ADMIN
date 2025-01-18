import { Users, GraduationCap, DollarSign, Coins, Calendar, Heart, User } from 'lucide-react';
import StatCard from '../components/StatCard';
import AttendanceChart from '../components/charts/AttendanceChart';
import StudentDistribution from '../components/charts/StudentDistribution';
import EventsList from '../components/EventsList';
import TeachersList from '../components/TeachersList';
import NewStudentList from '../components/students/NewStudentList';
import ExamSchedule from '../components/exams/ExamSchedule';
import DonationChart from '../components/temple/DonationChart';
import UpcomingEvents from '../components/temple/UpcomingEvent';
import DevoteeList from '../components/temple/DevooteeList';
import PoojaBookings from '../components/temple/PoojaBooking';
import { useFees } from '../hooks/useFees';
import { useState } from 'react';

function Dashboard() {
    const { getTotalCollected } = useFees();
    const [teacherCount, setTeacherCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);
    const role = localStorage.getItem('role')
    return (
        <>
            {role === 'Principal' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                    <StatCard
                        icon={<DollarSign className="text-yellow-600" />}
                        title="Fees Collection"
                        value={getTotalCollected().toLocaleString()}
                        trend={15}
                        trendLabel="8% more than last month"
                    />
                    <StatCard
                        icon={<GraduationCap className="text-green-600" />}
                        title="Total Student"
                        value={studentCount}
                        trend={8}
                        trendLabel="12% more than last month"
                    />
                    <StatCard
                        icon={<User className="text-purple-600" />}
                        title="Total Teachers"
                        value={teacherCount}
                        trend={-5}
                        trendLabel="3% less than last month"
                    />
                    <StatCard
                        icon={<Users className="text-blue-600" />}
                        title="Total Sales"
                        value="1500"
                        trend={12}
                        trendLabel="16% more than last month"
                    />
                </div>
            )}            {
                (role === 'Principal' || role === 'Teacher') && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <AttendanceChart />
                        <StudentDistribution />
                    </div>
                )
            }
            {
                (role === 'Principal' || role === 'Teacher' || role === 'Student') && (
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <TeachersList setTeacherCount={setTeacherCount} />
                            <EventsList />
                        </div>
                        <ExamSchedule />
                    </div>
                )
            }
            {
                (role === 'Principal' || role === 'Teacher') && (
                    <NewStudentList setStudentCount={setStudentCount} />
                )
            }
            {/* Temple Related */}
            {role === 'Temple' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                    <StatCard
                        icon={<Users className="text-blue-600" />}
                        title="Total Devotees"
                        value="15,489"
                        trend={12}
                        trendLabel="16% more than last month"
                    />
                    <StatCard
                        icon={<Coins className="text-green-600" />}
                        title="Monthly Donations"
                        value="₹48,697"
                        trend={8}
                        trendLabel="12% more than last month"
                    />
                    <StatCard
                        icon={<Calendar className="text-purple-600" />}
                        title="Today's Bookings"
                        value="89"
                        trend={15}
                        trendLabel="5% more than yesterday"
                    />
                    <StatCard
                        icon={<Heart className="text-rose-600" />}
                        title="Active Volunteers"
                        value="245"
                        trend={10}
                        trendLabel="8% more than last month"
                    />
                </div>

            )}
            {role === 'Temple' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <DonationChart />
                    <UpcomingEvents />
                </div>
            )}
            {role === 'Temple' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DevoteeList />
                    <PoojaBookings />
                </div>
            )}
        </>
    );
}

export default Dashboard;
