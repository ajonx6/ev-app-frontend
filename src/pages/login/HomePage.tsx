import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="homepages-page">
      <h1>Welcome to your Home Page!</h1>
      <p>
        Logged in as: {user?.email} (ID: {user?.id})
      </p>

      <button onClick={handleLogout}>Log Out</button>
    </main>
  );
}

export default HomePage;
