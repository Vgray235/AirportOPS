// import { useState } from "react";
// import { Container, TextField, Button, Box, Typography, Paper, MenuItem } from "@mui/material";
// import api from "../api/axios.js";
// import { toast } from "react-toastify";

// const roles = ["admin", "airline", "baggage"];

// export default function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "airline" });
//   const [loading, setLoading] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.post("/auth/register", form);
//       toast.success("User registered");
//       setForm({ name: "", email: "", password: "", role: "airline" });
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Register failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h5" fontWeight={700} gutterBottom>Create User</Typography>
//         <Box component="form" onSubmit={submit}>
//           <TextField
//             label="Full name"
//             fullWidth
//             margin="normal"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             margin="normal"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//           />
//           <TextField
//             label="Password (min 6)"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             inputProps={{ minLength: 6 }}
//             required
//           />
//           <TextField
//             label="Role"
//             select
//             fullWidth
//             margin="normal"
//             value={form.role}
//             onChange={(e) => setForm({ ...form, role: e.target.value })}
//           >
//             {roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
//           </TextField>
//           <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 1.5 }}>
//             {loading ? "Creating..." : "Create"}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import api from "../api/axios.js";
import { toast } from "react-toastify";

const roles = ["admin", "airline", "baggage"];

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "airline",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      toast.success("User registered");
      setForm({ name: "", email: "", password: "", role: "airline" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 3, border: "1px solid black" }}
      >
        <Typography
          variant="h5"
          mb={2}
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Airport Operations Platform – Register
        </Typography>

        <Box component="form" onSubmit={submit}>
          <TextField
            label="Full name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <TextField
            label="Password (min 6)"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            inputProps={{ minLength: 6 }}
            required
          />
          <TextField
            label="Role"
            select
            fullWidth
            margin="normal"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
