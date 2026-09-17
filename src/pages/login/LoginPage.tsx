import LoginForm from "../../components/auth/LoginForm";

function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">EVENTLY</div>

          <h1>Welcome back</h1>
          <p>Discover events you'll love.</p>
        </div>

        <LoginForm />

        <p className="signup-text">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
