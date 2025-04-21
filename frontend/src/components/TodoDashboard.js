import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function TodoDashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    const params = {};
    if (filterStatus) params.status = filterStatus;
    if (searchTerm) params.search = searchTerm;

    const res = await axios.get("http://localhost:5000/api/todos", {
      headers: { Authorization: token },
      params,
    });
    setTodos(res.data);
  };

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/todos", newTodo, {
      headers: { Authorization: token },
    });
    setNewTodo({ title: "", description: "", dueDate: "" });
    fetchTodos();
  };

  const handleToggle = async (id, currentStatus) => {
    await axios.put(
      `http://localhost:5000/api/todos/${id}`,
      {
        status: currentStatus === "pending" ? "completed" : "pending",
      },
      {
        headers: { Authorization: token },
      }
    );
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: token },
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, [filterStatus, searchTerm]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            Your To-Do List
          </Typography>

          <Grid container spacing={2} marginBottom={3}>
            <Grid item xs={12} sm={6} >
              <TextField
                fullWidth
                label="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                sx={{ width: "100%" }} // Ensures full width within the Grid item
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ width: "100%" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Status"
                  variant="outlined"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Add New Todo Form */}
          <Grid container spacing={2} marginBottom={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Title"
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, title: e.target.value })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Description"
                value={newTodo.description}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, description: e.target.value })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                InputLabelProps={{ shrink: true }}
                value={newTodo.dueDate}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, dueDate: e.target.value })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                fullWidth
                sx={{ height: "100%" }}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          {/* Todo List */}
          <Grid container spacing={2}>
            {todos.map((todo) => (
              <Grid item xs={12} sm={6} md={4} key={todo._id}>
                <Card variant="outlined" sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6">{todo.title}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {todo.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Due: {new Date(todo.dueDate).toLocaleDateString()} |
                      Status: {todo.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleToggle(todo._id, todo.status)}
                      variant="outlined"
                      color="primary"
                    >
                      {todo.status === "pending"
                        ? "Mark Completed"
                        : "Mark Pending"}
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(todo._id)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default TodoDashboard;
