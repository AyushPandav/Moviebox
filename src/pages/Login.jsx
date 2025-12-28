import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const userData = {
          id: user.id,
          email: user.email,
        };

        // ✅ Store in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");

        // ✅ SweetAlert success
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          // ✅ Redirect to home
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to connect to server",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
