import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/features/auth/auth.slice";

const Navbar = () => {
  const navigate = useNavigate();
  const userInFo = useSelector((state) => state.auth);
  console.log(userInFo);
  const dispatch = useDispatch();

  const navItem = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Events",
      link: "/events",
    },
    {
      name: "My Event",
      link: "/my-events",
    },
    {
      name: "Add Event",
      link: "/add-event",
    },
  ];

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-black">
      <div className="navbar max-w-7xl mx-auto text-white px-4 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52"
            >
              {navItem.map((item) => (
                <li key={item.name}>
                  <a href={item.link}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <a href="/" className="text-[23px] font-bold  text-white">
            Event<span className="text-primary">Manager</span>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white font-medium text-[16px]">
            {navItem.map((item) => (
              <li key={item.name}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          {!userInFo?.token ? (
            <a
              href="/login"
              className="btn btn-outline btn-sm text-white border-white hover:bg-[#131313] hover:text-white text-[16px]"
            >
              Login
            </a>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={userInFo?.imageUrl} alt="profile" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white text-black rounded-box w-52"
              >
                <li className="px-4 py-2 font-semibold">{userInFo?.name}</li>
                <li onClick={handleLogOut}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
