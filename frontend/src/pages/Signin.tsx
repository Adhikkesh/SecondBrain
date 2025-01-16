import { useState } from "react";
import InputBox from "../components/ui/inputBox";
import { Button } from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response) {
        switch (err.response.status) {
          case 411:
            setError(
              "Invalid input: " +
                (err.response.data.Zoderror?.issues?.[0]?.message ||
                  "Please check your inputs")
            );
            break;
          case 403:
            setError("Username already exists");
            break;
          case 500:
            setError("Server error. Please try again later");
            break;
          default:
            setError("An error occurred. Please try again");
        }
      } else if (err.request) {
        setError("No response from server. Please check your connection");
      } else {
        setError("An error occurred. Please try again");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-cyan-400 min-h-screen relative">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700" />
        </div>
      ) : (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-4 border-2 border-gray-100 rounded-lg p-8 w-full max-w-md mx-4">
          <p className="flex justify-center text-2xl font-bold">SignIn</p>
          <InputBox
            placeholder="username"
            label="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(e.target.value);
            }}
          />
          <InputBox
            placeholder="Password"
            label="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            password={true}
          />
          <Button
            variant="primary"
            content="Sign In"
            size="md"
            onClick={handleSubmit}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </div> )}
    </div>
  );
}
