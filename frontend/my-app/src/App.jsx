// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Flights from "./pages/flights";
// import Baggage from "./pages/Baggage";
// import Users from "./pages/Users";

// function App() {
//   const [auth, setAuth] = useState(false);

//   return (
//     <Routes>
//       <Route path="/" element={<Login setAuth={setAuth} />} />
//       <Route path="/register" element={<Register />} />

//       {/* Protected Routes */}
//       {auth ? (
//         <>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/flights" element={<Flights />} />
//           <Route path="/baggage" element={<Baggage />} />
//           <Route path="/users" element={<Users />} />
//         </>
//       ) : (
//         <Route path="*" element={<Navigate to="/" />} />
//       )}
//     </Routes>
//   );
// }

// export default App;
 
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";s
// import Dashboard from "./pages/Dashboard";
// // import Flights from "./pages/Flights";
// import Baggage from "./pages/Baggage";
// import Users from "./pages/Users";
// import NotFound from "./pages/Notfound";
// import AppLayout from "./layout/AppLayout";
// import ProtectedRoute from "./guards/ProtectedRoute";
// import RoleGuard from "./guards/RoleGuard";
// import { Zoom } from "@mui/material";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       <Route
//         element={
//           <ProtectedRoute>
//             <AppLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Navigate to="/dashboard" />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route
//           path="/flights"
//           element={
//             <RoleGuard roles={["admin", "airline"]}>
//               <Flights />
//             </RoleGuard>
//           }
//         />
//         <Route
//           path="/baggage"
//           element={
//             <RoleGuard roles={["admin", "baggage"]}>
//               <Baggage />
//             </RoleGuard>
//           }
// //         />
// //         <Route
// //           path="/users"
// //           element={
// //             <RoleGuard roles={["admin"]}>
// //               <Users />
// //             </RoleGuard>
// //           }
// //         />
// //       </Route>

// //       <Route path="*" element={<NotFound />} />
// //     </Routes>
// //   );
// // }



// // src/App.jsx
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { Box, Container } from "@mui/material";
// import Navbar from "./components/Navbar.jsx";
// import ToastContainerWrapper from "./components/ToastContainerWrapper.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import Flights from "./pages/flights.jsx";
// // add these
// import Baggage from "./pages/Baggage";
// import BaggageTracker from "./pages/BaggageTracker";
// import Dashboard from "./pages/Dashboard.jsx";
// import { motion, AnimatePresence } from "framer-motion";

// function Page({ children }) {
//   const location = useLocation();
//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={location.pathname}
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -8 }}
//         transition={{ duration: 0.18 }}
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// export default function App() {
//   return (
//     <Box>
//       <Navbar />
//       <ToastContainerWrapper />
//       <Container maxWidth="lg" sx={{ py: 3 }}>
//         <Page>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/register"
//               element={
//                 <ProtectedRoute roles={["admin"]}>
//                   <Register />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/flights"
//               element={
//                 <ProtectedRoute roles={["admin", "airline", "baggage"]}>
//                   <Flights />
//                 </ProtectedRoute>
//               }
//             />
//             {/* <Route
//               path="/baggage"
//               element={
//                 <ProtectedRoute roles={["admin", "baggage", "airline"]}>
//                   <Baggage />
//                 </ProtectedRoute>
//               }
//             /> */}
            
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </Page>
//       </Container>
//     </Box>
//   );
// }


import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar.jsx";
import ToastContainerWrapper from "./components/ToastContainerWrapper.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Flights from "./pages/flights.jsx";
import Baggage from "./pages/Baggage.jsx";
import BaggageTracker from "./pages/BaggageTracker.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { motion, AnimatePresence } from "framer-motion";
import OpsPage from "./pages/opsDashboard.jsx";
const drawerWidth = 240;

function Page({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Navbar />

      {/* Main content shifted right */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`, // shift content right
          p: 3,
          minHeight: "100vh",
          bgcolor: "#f5f6fa",
        }}
      >
        <ToastContainerWrapper />
        <Page>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />  <Route
              path="/ops"
              element={
                <ProtectedRoute>
                  <OpsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/flights"
              element={
                <ProtectedRoute roles={["admin", "airline", "baggage"]}>
                  <Flights />
                </ProtectedRoute>
              }
            />
           <Route
  path="/baggage"
  element={
    <ProtectedRoute roles={["admin", "baggage", "airline"]}>
      <Baggage />
    </ProtectedRoute>
  }
/>
            <Route
              path="/baggage-tracker"
              element={
                <ProtectedRoute roles={["admin", "baggage"]}>
                  <BaggageTracker />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Page>
      </Box>
    </Box>
  );
}
