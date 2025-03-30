import ProfileIcon from "./ProfileIcon";
import DuckProfile from "/DuckProfile.png"

const Navbar = () => {
  return(
      <div className="bg-blue-500 text-white p-4 flex justify-between">
        <div className="absolute top-2 right-4">
        <ProfileIcon icon={<img src={DuckProfile} className="w-12 h-12 rounded-full" />} />
        </div>
      </div>
  );
}

export default Navbar;