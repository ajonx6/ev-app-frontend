import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../PasswordInput";

function LoginForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"" | "user" | "organiser" | "admin">(
    "",
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (firstName.trim() === "") {
      setError("First name is required.");
      return;
    }

    if (lastName.trim() === "") {
      setError("Last name is required.");
      return;
    }

    if (email.trim() === "") {
      setError("Email is required.");
      return;
    }

    if (password.trim() === "") {
      setError("Password is required.");
      return;
    }

    if (confirmPassword.trim() === "") {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (userType === "") {
      setError("Please select a user type.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
          userType,
        },
      );

      if (response && response.status === 201) navigate("/login");
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setError("Email already exists.");
      } else if (err.response && err.response.message.includes("User type")) {
        // TODO: Change method for detecting this error, make more structured in backend
        setError("Please select a valid user type.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSignIn}>
      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

      <div className="form-group">
        <label htmlFor="firstName">Enter First Name</label>
        <input
          id="firstName"
          type="text"
          placeholder="John"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Enter Last Name</label>
        <input
          id="lastName"
          type="text"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Enter Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <PasswordInput
        id="password"
        label="Enter Password"
        value={password}
        onChange={setPassword}
        required={false}
      />

      <PasswordInput
        id="confirmPassword"
        label="Enter Password Again"
        value={confirmPassword}
        onChange={setConfirmPassword}
        required={false}
      />

      <div className="form-group">
        <label htmlFor="userType">Select User Type</label>
        <div className="user-type-selector">
          <button
            type="button"
            className={userType === "user" ? "active" : ""}
            onClick={() => setUserType("user")}
          >
            User
          </button>

          <button
            type="button"
            className={userType === "organiser" ? "active" : ""}
            onClick={() => setUserType("organiser")}
          >
            Organiser
          </button>

          <button
            type="button"
            className={userType === "admin" ? "active" : ""}
            onClick={() => setUserType("admin")}
          >
            Admin
          </button>
        </div>
      </div>

      <button type="submit" className="login-button" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default LoginForm;
