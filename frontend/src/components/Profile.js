import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Avatar,
  Tabs,
  Tab,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import imageCompression from "browser-image-compression";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [success, setSuccess] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: token },
      });
      setForm({ ...res.data, password: "" });
    };
    fetchUser();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setAvatarFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setForm({ ...form, avatar: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    // Optional size check
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Image too large, max size is 5MB.");
      return;
    }

    // Compression options
    const options = {
      maxSizeMB: 1, // target max size (in MB)
      maxWidthOrHeight: 800, // maintain aspect ratio
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

      setForm((prev) => ({ ...prev, avatar: base64 }));
    } catch (err) {
      console.error("Compression failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...form };
    if (!avatarFile) delete updatedData.avatar; // Avoid sending unchanged avatar
    await axios.put("http://localhost:5000/api/users/profile", updatedData, {
      headers: { Authorization: token },
    });
    setSuccess(true);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={(e, newVal) => setSelectedTab(newVal)}
        sx={{ mb: 3 }}
      >
        <Tab label="Profile Info" />
      </Tabs>

      {/* Avatar Section */}
      {selectedTab === 0 && (
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="center">
            <Box position="relative">
              <Avatar
                src={form.avatar || ""}
                sx={{ width: 100, height: 100 }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#fff",
                }}
                component="label"
              >
                <EditIcon />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </IconButton>
            </Box>

            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit" variant="contained">
              Update Profile
            </Button>
          </Stack>
        </form>
      )}

      {/* Success Message */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile updated!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Profile;
