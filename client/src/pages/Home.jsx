import CVLibraryCards from "../components/CVLibraryCards";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Hiring from "../components/Hiring";
import MobileAdvertisement from "../components/MobileAdersitement";
import Recursting from "../components/Recursting";
import RegisterCv from "../components/RegisterCv";

export default function Home(){
  return (
    <div>
     <Hero />
     <Hiring />
     <CVLibraryCards />
     <RegisterCv />
     <MobileAdvertisement />
     <Recursting />
   
    </div>
  );
}