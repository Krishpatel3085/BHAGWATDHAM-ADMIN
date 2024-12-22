import EventsSection from '../components/schedule/EventsSection';
import ExamsSection from '../components/schedule/ExamSection';

const Schedule = () => {
  return (

    <div className="space-y-6">
      <EventsSection />
      <ExamsSection />
    </div>

  );
};

export default Schedule;