import ProfileIcon from "./ProfileIcon";
import DuckProfile from "/DuckProfile.png"

const Navbar = () => {
  return(
      <div className="bg-blue-500 text-white p-4 flex justify-between">
        <a href="/">
          <img src="/BetterBills.png" alt="Better Bills Logo" className="h-15 w-fit" />
        </a>
        <div className="absolute top-2 right-4">
        <ProfileIcon icon={<img src={DuckProfile} className="w-15 h-15 rounded-full" />} />
        </div>
      </div>
  );
}

export default Navbar;