import CareerAdvice from "../pages/CareerAdvice";
import GradutesCourses from './GradutesCourses'

export default function Graduates() {
  return (  
    <div>
        <CareerAdvice title="Graduate" description="Whether you’re getting ready to leave university, or have already graduated, you’ve come to the right place. With detailed advice on graduate schemes and your options after higher education, we’ve got hints and tips on how to kick-start your career and make the most of your degree." />
        <GradutesCourses />
    </div>
  );
}