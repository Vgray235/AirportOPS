// // // src/pages/Login.jsx
// // import { useState } from "react";
// // import { Container, TextField, Button, Box, Typography, Paper } from "@mui/material";
// // import { useAuth } from "../contexts/AuthContext";

// // export default function Login() {
// //   const { login } = useAuth();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // For now, mock login (replace with backend API later)
// //     login({ name: "Admin User", role: "admin", token: "jwt-token" });
// //   };

// //   return (
// //     <Container maxWidth="sm" sx={{ mt: 10 }}>
// //       <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
// //         <Typography variant="h5" mb={2}>
// //           Airport Operations Platform
// //         </Typography>
// //         <Box component="form" onSubmit={handleSubmit}>
// //           <TextField
// //             fullWidth
// //             label="Email"
// //             margin="normal"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Password"
// //             type="password"
// //             margin="normal"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
// //             Login
// //           </Button>
// //         </Box>
// //       </Paper>
// //     </Container>
// //   );
// // }


// // import { useContext, useState } from "react";
// // import { Container, TextField, Button, Box, Typography } from "@mui/material";
// // import api from "../api/axios";
// // import { toast } from "react-toastify";
// // import { AuthContext } from "../contexts/AuthContext";
// // import { useNavigate } from "react-router-dom";

// // export default function Login() {
// //   const { login } = useContext(AuthContext);
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await api.post("/auth/login", form);
// //       login(res.data);
// //       toast.success("Login successful!");
// //       navigate("/");
// //     } catch (err) {
// //       toast.error(err.response?.data?.error || "Login failed");
// //     }
// //   };

// //   return (
// //     <Container maxWidth="xs">
// //       <Box mt={8}>
// //         <Typography variant="h5" gutterBottom>Login</Typography>
// //         <form onSubmit={handleSubmit}>
// //           <TextField
// //             margin="normal"
// //             fullWidth
// //             label="Email"
// //             type="email"
// //             value={form.email}
// //             onChange={(e) => setForm({ ...form, email: e.target.value })}
// //           />
// //           <TextField
// //             margin="normal"
// //             fullWidth
// //             label="Password"
// //             type="password"
// //             value={form.password}
// //             onChange={(e) => setForm({ ...form, password: e.target.value })}
// //           />
// //           <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
// //             Login
// //           </Button>
// //         </form>
// //       </Box>
// //     </Container>
// //   );
// // }


// import { useState, useContext } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../api/axios";
// import { AuthContext } from "../contexts/AuthContext";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", form);
//       login(res.data);
//       toast.success("Login successful!");
//       navigate("/");
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 10 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//         <Typography variant="h5" mb={2}>
//           Airport Operations Platform
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Email"
//             type="email"
//             margin="normal"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             margin="normal"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mt: 2 }}
//             type="submit"
//           >
//             Login
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }


// import { useState, useContext } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../api/axios";
// import { AuthContext } from "../contexts/AuthContext";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", form);
//       login(res.data);
//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 10 }}>
//       <Paper
//         elevation={3}
//         sx={{ p: 4, borderRadius: 3, border: "1px solid black" }}
//       >
//         <Typography
//           variant="h5"
//           mb={2}
//           sx={{ fontWeight: "bold", textAlign: "center" }}
//         >
//           Airport Operations Platform – Login
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Email"
//             type="email"
//             margin="normal"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             margin="normal"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mt: 2 }}
//             type="submit"
//           >
//             Login
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }
// import { useState, useContext } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   InputAdornment,
// } from "@mui/material";
// import { Person, Lock } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../api/axios";
// import { AuthContext } from "../contexts/AuthContext";

// // Background image
// import bgImage from "../assets/logo.jpg";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", form);
//       login(res.data);
//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100vw",
//         display: "flex",
//         position: "relative",
//       }}
//     >
//       {/* Left side - Airplane image (80%) */}
//       <Box
//         sx={{
//           width: "80%",
//           height: "100vh",
//           position: "relative",
//         }}
//       >
//         <Box
//           component="img"
//           src={bgImage}
//           alt="Airport"
//           sx={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             display: "block",
//           }}
//         />
//       </Box>

//       {/* Right side - Blue background (20%) */}
//       <Box
//         sx={{
//           width: "20%",
//           height: "100vh",
//           backgroundColor: "#1976D2", // Blue background
//         }}
//       />

//       {/* Login form positioned at the junction of image and blue box */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "85%", // Position at 65% to be at junction of 80% image and 20% blue
//           transform: "translate(-50%, -50%)",
//           zIndex: 10,
//         }}
//       >
//         {/* White login form container */}
//         <Box
//           sx={{
//             backgroundColor: "white",
//             borderRadius: 2,
//             p: 4,
//             width: "400px",
//             maxWidth: "90%",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//           }}
//         >
//           {/* Login form */}
//           <Box component="form" onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               placeholder="USERNAME"
//               type="email"
//               margin="normal"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Person sx={{ color: "#ccc" }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 mb: 2,
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: 1,
//                   "& fieldset": {
//                     border: "1px solid #e0e0e0",
//                   },
//                   "&:hover fieldset": {
//                     border: "1px solid #ccc",
//                   },
//                   "&.Mui-focused fieldset": {
//                     border: "1px solid #1976D2",
//                   },
//                 },
//                 "& .MuiInputBase-input::placeholder": {
//                   color: "#999",
//                   opacity: 1,
//                   fontSize: "0.9rem",
//                   fontWeight: 500,
//                 },
//               }}
//             />

//             <TextField
//               fullWidth
//               placeholder="PASSWORD"
//               type="password"
//               margin="normal"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock sx={{ color: "#ccc" }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 mb: 1,
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: 1,
//                   "& fieldset": {
//                     border: "1px solid #e0e0e0",
//                   },
//                   "&:hover fieldset": {
//                     border: "1px solid #ccc",
//                   },
//                   "&.Mui-focused fieldset": {
//                     border: "1px solid #1976D2",
//                   },
//                 },
//                 "& .MuiInputBase-input::placeholder": {
//                   color: "#999",
//                   opacity: 1,
//                   fontSize: "0.9rem",
//                   fontWeight: 500,
//                 },
//               }}
//             />

//             {/* Forgot Password link */}
//             <Box sx={{ textAlign: "right", mb: 3 }}>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: "#999",
//                   fontSize: "0.85rem",
//                   cursor: "pointer",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//               >
//                 Forgot Password?
//               </Typography>
//             </Box>

//             {/* LOGIN Button */}
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 mb: 3,
//                 py: 1.5,
//                 fontWeight: "bold",
//                 fontSize: "0.9rem",
//                 borderRadius: 1,
//                 backgroundColor: "#1976D2",
//                 color: "white",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//                 "&:hover": { backgroundColor: "#1565C0" },
//               }}
//               type="submit"
//             >
//               LOGIN
            
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// import { useState, useContext } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   InputAdornment,
//   Container,
// } from "@mui/material";
// import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../api/axios";
// import { AuthContext } from "../contexts/AuthContext";

// // Background image
// import bgImage from "../assets/logo.jpg";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", form);
//       login(res.data);
//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Login failed");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         width: "100vw",
//         display: "flex",
//         overflow: "hidden",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         margin: 0,
//         padding: 0,
//       }}
//     >
//       {/* Left side - Background image (70%) */}
//       <Box
//         sx={{
//           width: { xs: "0%", md: "70%" },
//           height: "100vh",
//           position: "relative",
//           display: { xs: "none", md: "block" },
//           overflow: "hidden",
//         }}
//       >
//         <Box
//           component="img"
//           src={bgImage}
//           alt="Airport"
//           sx={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//           }}
//         />
        
//         {/* Overlay gradient for better text readability */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.3) 100%)",
//           }}
//         />
//       </Box>

//       {/* Right side - Login section (30% on desktop, 100% on mobile) */}
//       <Box
//         sx={{
//           width: { xs: "100%", md: "30%" },
//           height: "100vh",
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: { xs: 1, sm: 2, md: 1.5 },
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Decorative background elements */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: "20%",
//             left: "10%",
//             width: "100px",
//             height: "100px",
//             borderRadius: "50%",
//             background: "rgba(255, 255, 255, 0.1)",
//             opacity: 0.6,
//           }}
//         />
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: "20%",
//             right: "15%",
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%",
//             background: "rgba(255, 255, 255, 0.1)",
//             opacity: 0.4,
//           }}
//         />

//         {/* Login form container */}
//         <Box
//           sx={{
//             backgroundColor: "rgba(255, 255, 255, 0.95)",
//             backdropFilter: "blur(10px)",
//             borderRadius: 4,
//             p: { xs: 2, sm: 3 },
//             width: "100%",
//             maxWidth: { xs: "95%", sm: "350px", md: "320px" },
//             maxHeight: "90vh",
//             overflowY: "auto",
//             overflowX: "hidden",
//             boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)",
//             border: "1px solid rgba(255, 255, 255, 0.2)",
//             position: "relative",
//             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             "&:hover": {
//               transform: "translateY(-5px)",
//               boxShadow: "0 25px 50px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)",
//             },
//             // Custom scrollbar styling
//             "&::-webkit-scrollbar": {
//               width: "4px",
//             },
//             "&::-webkit-scrollbar-track": {
//               background: "transparent",
//             },
//             "&::-webkit-scrollbar-thumb": {
//               background: "rgba(102, 126, 234, 0.3)",
//               borderRadius: "2px",
//               "&:hover": {
//                 background: "rgba(102, 126, 234, 0.5)",
//               },
//             },
//           }}
//         >
//           {/* Header */}
//           <Box sx={{ textAlign: "center", mb: 3 }}>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: "bold",
//                 color: "#333",
//                 mb: 0.5,
//                 fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
//                 background: "linear-gradient(45deg, #667eea, #764ba2)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Welcome Back
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: "#666",
//                 fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
//               }}
//             >
//           Airport OPS 
//             </Typography>
//           </Box>

//           {/* Login form */}
//           <Box component="form" onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               placeholder="Email Address"
//               type="email"
//               margin="normal"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Person sx={{ color: "#3bdf49ff" }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 mb: 1.5,
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#fafafa",
//                   borderRadius: 3,
//                   transition: "all 0.3s ease",
//                   "& fieldset": {
//                     border: "2px solid transparent",
//                     borderColor: "#146275ff",
//                   },
//                   "&:hover": {
//                     backgroundColor: "#f5f5f5",
//                     "& fieldset": {
//                       borderColor: "#667eea",
//                     },
//                   },
//                   "&.Mui-focused": {
//                     backgroundColor: "#ffffff",
//                     "& fieldset": {
//                       borderColor: "#667eea",
//                       borderWidth: "2px",
//                     },
//                   },
//                 },
//                 "& .MuiInputBase-input": {
//                   padding: { xs: "12px", sm: "14px 12px" },
//                   fontSize: { xs: "0.9rem", sm: "0.95rem" },
//                   "&::placeholder": {
//                     color: "#8a6464ff",
//                     opacity: 1,
//                     fontWeight: 500,
//                   },
//                 },
//               }}
//             />

//             <TextField
//               fullWidth
//               placeholder="Password"
//               type={showPassword ? "text" : "password"}
//               margin="normal"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock sx={{ color: "#3acc72ff" }} />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Button
//                       onClick={togglePasswordVisibility}
//                       sx={{ 
//                         minWidth: "auto", 
//                         p: 0.5,
//                         color: "#999",
//                         "&:hover": { 
//                           color: "#293b8dff",
//                           backgroundColor: "transparent" 
//                         }
//                       }}
//                     >
//                       {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
//                     </Button>
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 mb: 0.5,
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#fafafa",
//                   borderRadius: 3,
//                   transition: "all 0.3s ease",
//                   "& fieldset": {
//                     border: "2px solid transparent",
//                     borderColor: "#e8e8e8",
//                   },
//                   "&:hover": {
//                     backgroundColor: "#509c9cff",
//                     "& fieldset": {
//                       borderColor: "#667eea",
//                     },
//                   },
//                   "&.Mui-focused": {
//                     backgroundColor: "#ffffff",
//                     "& fieldset": {
//                       borderColor: "#667eea",
//                       borderWidth: "1px",
//                     },
//                   },
//                 },
//                 "& .MuiInputBase-input": {
//                   padding: { xs: "12px", sm: "14px 12px" },
//                   fontSize: { xs: "0.9rem", sm: "0.95rem" },
//                   "&::placeholder": {
//                     color: "#999",
//                     opacity: 1,
//                     fontWeight: 500,
//                   },
//                 },
//               }}
//             />

//             {/* Forgot Password link */}
//             <Box sx={{ textAlign: "right", mb: 2 }}>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: "#667eea",
//                   fontSize: { xs: "0.8rem", sm: "0.85rem" },
//                   cursor: "pointer",
//                   fontWeight: 500,
//                   transition: "all 0.3s ease",
//                   "&:hover": { 
//                     textDecoration: "underline",
//                     color: "#764ba2",
//                   },
//                 }}
//               >
            
//               </Typography>
//             </Box>

//             {/* LOGIN Button */}
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 mb: 2,
//                 py: { xs: 1.5, sm: 2 },
//                 fontWeight: "bold",
//                 fontSize: { xs: "0.9rem", sm: "1rem" },
//                 borderRadius: 3,
//                 background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
//                 color: "white",
//                 textTransform: "none",
//                 letterSpacing: "0.5px",
//                 boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
//                 transition: "all 0.3s ease",
//                 "&:hover": { 
//                   background: "linear-gradient(45deg, #5a67d8 0%, #6b46c1 100%)",
//                   boxShadow: "0 12px 30px rgba(102, 126, 234, 0.4)",
//                   transform: "translateY(-2px)",
//                 },
//                 "&:active": {
//                   transform: "translateY(0px)",
//                 },
//               }}
//               type="submit"
//             >
//               Sign In
//             </Button>

//             {/* Additional options */}
//             <Box sx={{ textAlign: "center" }}>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: "#666",
//                   fontSize: { xs: "0.8rem", sm: "0.85rem" },
//                 }}
//               >
//                 <Typography
//                   component="span"
//                   sx={{
//                     color: "#6a8686ff",
//                     cursor: "pointer",
//                     fontWeight: 600,
//                     transition: "color 0.3s ease",
//                     "&:hover": { 
//                       color: "#764ba2",
//                       textDecoration: "underline" 
//                     },
//                   }}
//                 >
//                   Sign up is disabaled for non admin user
//                 </Typography>
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";

// Background image
import bgImage from "../assets/logo.jpg";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      // backend should return { token, role, name }
      const { token, role, name } = res.data;

      // call AuthContext login
      login({ token, role, name });

      toast.success(`Welcome ${name}!`);
      
      // redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
      }}
    >
      {/* Left side - Background image (70%) */}
      <Box
        sx={{
          width: { xs: "0%", md: "70%" },
          height: "100vh",
          position: "relative",
          display: { xs: "none", md: "block" },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={bgImage}
          alt="Airport"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.3) 100%)",
          }}
        />
      </Box>

      {/* Right side - Login form */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 1, sm: 2, md: 1.5 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            p: { xs: 2, sm: 3 },
            width: "100%",
            maxWidth: { xs: "95%", sm: "350px", md: "320px" },
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            position: "relative",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow:
                "0 25px 50px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)",
            },
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 0.5,
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Airport OPS
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Email Address"
              type="email"
              margin="normal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#3bdf49ff" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#3acc72ff" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={togglePasswordVisibility}
                      sx={{
                        minWidth: "auto",
                        p: 0.5,
                        color: "#999",
                        "&:hover": {
                          color: "#293b8dff",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            {/* Login Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: 3,
                background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #5a67d8 0%, #6b46c1 100%)",
                  transform: "translateY(-2px)",
                },
              }}
              type="submit"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
