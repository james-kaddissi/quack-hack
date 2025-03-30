import SideBarIcon from "./SidebarIcon";
import { GiPlasticDuck } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";

const SideBar = () => {
    return(
        <div className="fixed left-0 h-full w-16 m-0 flex flex-col bg-primary text-white shadow-lg">
            <SideBarIcon icon={<AiFillHome size="30" />} />
            <SideBarIcon icon={<GiPlasticDuck size="30" />} />
        </div>
    );
}

export default SideBar;