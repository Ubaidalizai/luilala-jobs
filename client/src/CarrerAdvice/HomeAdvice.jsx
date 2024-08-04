import CareerAdvice from "../pages/CareerAdvice";
import CarrerHomeCourses from "./CaarrerHomeCourses";

export default function HomeAdvice() {
  return (
    <>
      <div>
        <CareerAdvice
          title="Career Advice"
          description="Our advice centre contains articles with helpful tips, how-to guides and CV templates. Written by career experts, were committed to helping your job search and ensuring you get the most from your career."
        />

        <div className=" flex flex-col md:flex-row  container gap-8">
          {/* <!-- first --> */}
          <div className="first-adivce-card relative">
            <img
              src="https://media.istockphoto.com/id/1497199031/photo/portrait-of-mechanical-engineers-are-checking-the-working-condition-of-an-old-machine-that.jpg?s=612x612&w=0&k=20&c=MHIeLccBnJESugiT1UNo9Mw4nZpFdeF7lZTmYntkkU4="
            />
            <div className="text-white absolute bottom-0 left-0 p-8 bg-[#002244] bg-opacity-70 w-full">
              <span className="text-md font-medium">By content team</span>
              <a href="#" className="block text-2xl mt-3 font-bold hover:underline">
                Your guide to apprenticeships in 2024
              </a>
            </div>
          </div>

          {/* <!-- second --> */}
          <div className="two_image grid grid-cols-1 sm:grid-cols-2 gap-8">
           
            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/2005694683/photo/checking-and-inspecting-metal-machine-part-items-for-shipping-male-and-woman-worker-checking.jpg?s=612x612&w=0&k=20&c=8vwEqA8abT5mF7-mS55b_eNeJYmfPriMjLEf_hF0qRQ="
                alt=""
                className="w-full h-64 object-cover"
              />
              <div className="text-white absolute bottom-0 left-0 p-8 bg-[#002244] bg-opacity-70 w-full">
                <span className="text-sm font-medium">By content team</span>
                <a href="#" className="block text-lg font-bold hover:underline">
                  Your guide to apprenticeships in 2024
                </a>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/1198042412/photo/male-supervisor-at-a-manufacturing-factory-talking-to-female-employee-at-the-production-line.jpg?s=612x612&w=0&k=20&c=xboPES80NaevEF8IrpTKT48aGjVsAqTj1t-QMlFPCXo="
                alt=""
                className="w-full h-64 object-cover"
              />
              <div className="text-white absolute bottom-0 left-0 p-8 bg-[#002244] bg-opacity-70 w-full">
                <span className="text-sm font-medium">By content team</span>
                <a href="#" className="block text-lg font-bold hover:underline">
                  Your guide to apprenticeships in 2024
                </a>
              </div>
            </div>

          </div>
        </div>
 
      </div>
      <CarrerHomeCourses />
    </>
  );
}