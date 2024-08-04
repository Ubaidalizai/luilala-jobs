import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
export default function Logo() {
  return (
    <div className="company-logo flex items-center justify-center">
      <Link to="/" className="block">
        <img src={logo} alt="Company Logo" className="w-16 scale-1 h-auto" />
      </Link>
    </div>
  );
}
 