import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
    >
      <Card sx={{ width: 400, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Please login to your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="email"
                label="Email"
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
              >
                Don't have an account?{" "}
                <span
                  style={{ color: "#1976d2", cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
