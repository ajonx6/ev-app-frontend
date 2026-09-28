import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";

function RegisterPage() {
  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">EVENTLY</div>

          <h1>Welcome back</h1>
          <p>Discover events you'll love.</p>
        </div>

        <RegisterForm />

        <p className="signup-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}

export default RegisterPage;
