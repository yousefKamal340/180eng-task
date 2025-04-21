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

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Please try again.");
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
            Create an Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Please fill in the details to register
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Full Name"
                onChange={handleChange}
                fullWidth
                required
              />
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
              <TextField
                name="phone"
                label="Phone Number"
                onChange={handleChange}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>
              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
              >
                Already have an account?{" "}
                <span
                  style={{ color: "#1976d2", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login here
                </span>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
