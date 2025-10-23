import { useAuthStore } from "@/core/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import Avatar from "@/core/assets/Vite.js.png";
import Logo from "@/core/assets/Mea-logo.png";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();

    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="nav-logo">
          <img src={Logo} alt={"logo"} className="logo-mea" width={100} />
        </div>

        <div className="navbar-button">
          <div className="user-info">
            <img src={Avatar} alt="Avatar" className="user-avatar" />
            <span>Halo, {user?.name || "User"}</span>
          </div>

          <button onClick={handleLogout} className="btn-logout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};
