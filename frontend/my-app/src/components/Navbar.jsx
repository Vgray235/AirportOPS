// import { AppBar, Toolbar, Button, Typography } from "@mui/material";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>Airport Operation Platform</Typography>
//         {user ? (
//           <>
//             {user.role === "admin" && (
//               <>
//                 <Button color="inherit" component={Link} to="/flights">Flights</Button>
//                 <Button color="inherit" component={Link} to="/baggage">Baggage</Button>
//                 <Button color="inherit" component={Link} to="/register">Users</Button>
//               </>
//             )}
//             {user.role === "airline" && (
//               <Button color="inherit" component={Link} to="/flights">Flights</Button>
//             )}
//             {user.role === "baggage" && (
//               <Button color="inherit" component={Link} to="/baggage">Baggage</Button>
//             )}
//             <Button color="inherit" onClick={logout}>Logout</Button>
//           </>
//         ) : (
//           <Button color="inherit" component={Link} to="/login">Login</Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }


// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemButton,
//   Typography,
//   Box,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useContext, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { Link } from "react-router-dom";

// const drawerWidth = 220;

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawerContent = (
//     <Box
//       sx={{
//         height: "100%",
//         bgcolor: "#1e1e2f", // dark background
//         color: "#fff",
//         boxShadow: 4,
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}
//       >
//         Airport Ops
//       </Typography>
//       <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

//       <List>
//         {user ? (
//           <>
//             {/* Common Routes */}
//             <ListItem disablePadding>
//               <ListItemButton component={Link} to="/dashboard">
//                 <ListItemText primary="Dashboard" />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton component={Link} to="/ops">
//                 <ListItemText primary="Ops" />
//               </ListItemButton>
//             </ListItem>

//             {/* Role-based Routes */}
//             {user.role === "admin" && (
//               <>
//                 <ListItem disablePadding>
//                   <ListItemButton component={Link} to="/flights">
//                     <ListItemText primary="Flights" />
//                   </ListItemButton>
//                 </ListItem>
//                 <ListItem disablePadding>
//                   <ListItemButton component={Link} to="/baggage">
//                     <ListItemText primary="Baggage" />
//                   </ListItemButton>
//                 </ListItem>
//                 <ListItem disablePadding>
//                   <ListItemButton component={Link} to="/register">
//                     <ListItemText primary="Users" />
//                   </ListItemButton>
//                 </ListItem>
//               </>
//             )}
//             {user.role === "airline" && (
//               <ListItem disablePadding>
//                 <ListItemButton component={Link} to="/flights">
//                   <ListItemText primary="Flights" />
//                 </ListItemButton>
//               </ListItem>
//             )}
//             {user.role === "baggage" && (
//               <ListItem disablePadding>
//                 <ListItemButton component={Link} to="/baggage">
//                   <ListItemText primary="Baggage" />
//                 </ListItemButton>
//               </ListItem>
//             )}

//             {/* Logout */}
//             <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 1 }} />
//             <ListItem disablePadding>
//               <ListItemButton onClick={logout}>
//                 <ListItemText primary="Logout" />
//               </ListItemButton>
//             </ListItem>
//           </>
//         ) : (
//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/login">
//               <ListItemText primary="Login" />
//             </ListItemButton>
//           </ListItem>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <IconButton
//         color="inherit"
//         edge="start"
//         onClick={handleDrawerToggle}
//         sx={{
//           position: "fixed",
//           top: 10,
//           left: 10,
//           zIndex: 1300,
//           display: { sm: "none" },
//           bgcolor: "#1e1e2f",
//         }}
//       >
//         <MenuIcon sx={{ color: "#fff" }} />
//       </IconButton>

//       {/* Sidebar Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: "none", sm: "block" },
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//         open
//       >
//         {drawerContent}
//       </Drawer>

//       {/* Mobile Drawer */}
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: "block", sm: "none" },
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         {drawerContent}
//       </Drawer>
//     </>
//   );
// }

// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemButton,
//   Typography,
//   Box,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useContext, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { Link } from "react-router-dom";

// const drawerWidth = 220;

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   // Conditional rendering: Do not render the navbar if there is no user
//   if (!user) {
//     return null;
//   }

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawerContent = (
//     <Box
//       sx={{
//         height: "100%",
//         bgcolor: "#1e1e2f", // dark background
//         color: "#fff",
//         boxShadow: 4,
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}
//       >
//         Airport Ops
//       </Typography>
//       <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

//       <List>
//         {/* All routes are now inside the user check */}
//         <ListItem disablePadding>
//           <ListItemButton component={Link} to="/dashboard">
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>
//         </ListItem>

//         <ListItem disablePadding>
//           <ListItemButton component={Link} to="/ops">
//             <ListItemText primary="Ops" />
//           </ListItemButton>
//         </ListItem>

//         {/* Role-based Routes */}
//         {user.role === "admin" && (
//           <>
//             <ListItem disablePadding>
//               <ListItemButton component={Link} to="/flights">
//                 <ListItemText primary="Flights" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton component={Link} to="/baggage">
//                 <ListItemText primary="Baggage" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton component={Link} to="/register">
//                 <ListItemText primary="Users" />
//               </ListItemButton>
//             </ListItem>
//           </>
//         )}
//         {user.role === "airline" && (
//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/flights">
//               <ListItemText primary="Flights" />
//             </ListItemButton>
//           </ListItem>
//         )}
//         {user.role === "baggage" && (
//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/baggage">
//               <ListItemText primary="Baggage" />
//             </ListItemButton>
//           </ListItem>
//         )}

//         {/* Logout */}
//         <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 1 }} />
//         <ListItem disablePadding>
//           <ListItemButton onClick={logout}>
//             <ListItemText primary="Logout" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <IconButton
//         color="inherit"
//         edge="start"
//         onClick={handleDrawerToggle}
//         sx={{
//           position: "fixed",
//           top: 10,
//           left: 10,
//           zIndex: 1300,
//           display: { sm: "none" },
//           bgcolor: "#1e1e2f",
//         }}
//       >
//         <MenuIcon sx={{ color: "#fff" }} />
//       </IconButton>

//       {/* Sidebar Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: "none", sm: "block" },
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//         open
//       >
//         {drawerContent}
//       </Drawer>

//       {/* Mobile Drawer */}
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: "block", sm: "none" },
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         {drawerContent}
//       </Drawer>
//     </>
//   );
// }
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const drawerWidth = 220;

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(true);

  if (!user) return null;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#000", // black background
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            p: 2,
            textAlign: "center",
            fontWeight: "bold",
            color: "#00bfff", // sky blue
            fontFamily: "Poppins, sans-serif",
          }}
        >
          ✈ Airport Ops
        </Typography>
         <Box
              sx={{
                borderRadius: 3,
                p: 1.5,
                border: "0px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "0.875rem",
                  lineHeight: 1.2,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {user?.name || user?.email || "User"}
                {user.role}
              </Typography>
            </Box>
        <Divider sx={{ bgcolor: "#333" }} />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/dashboard"
              sx={{
                "&:hover": { bgcolor: "#00bfff22" },
                "& .MuiListItemText-root": { color: "#fff", fontWeight: 500 },
              }}
            >
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/ops"
              sx={{
                "&:hover": { bgcolor: "#00bfff22" },
                "& .MuiListItemText-root": { color: "#fff", fontWeight: 500 },
              }}
            >
              <ListItemText primary="Ops" />
            </ListItemButton>
          </ListItem>

          {/* Role-based Routes */}
          {user.role === "admin" && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/flights"
                  sx={{
                    "&:hover": { bgcolor: "#00bfff22" },
                    "& .MuiListItemText-root": { color: "#fff" },
                  }}
                >
                  <ListItemText primary="Flights" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/baggage"
                  sx={{
                    "&:hover": { bgcolor: "#00bfff22" },
                    "& .MuiListItemText-root": { color: "#fff" },
                  }}
                >
                  <ListItemText primary="Baggage" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/register"
                  sx={{
                    "&:hover": { bgcolor: "#00bfff22" },
                    "& .MuiListItemText-root": { color: "#fff" },
                  }}
                >
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
            </>
          )}
          {user.role === "airline" && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/flights"
                sx={{
                  "&:hover": { bgcolor: "#00bfff22" },
                  "& .MuiListItemText-root": { color: "#fff" },
                }}
              >
                <ListItemText primary="Flights" />
              </ListItemButton>
            </ListItem>
          )}
          {user.role === "baggage" && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/baggage"
                sx={{
                  "&:hover": { bgcolor: "#00bfff22" },
                  "& .MuiListItemText-root": { color: "#fff" },
                }}
              >
                <ListItemText primary="Baggage" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>

      {/* Logout */}
      <Box>
        <Divider sx={{ bgcolor: "#333" }} />
        <ListItem disablePadding>
          <ListItemButton
            onClick={logout}
            sx={{
              "&:hover": { bgcolor: "#ff444422" },
              "& .MuiListItemText-root": { color: "#ff4444", fontWeight: "bold" },
            }}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Toggle Button */}
      <IconButton
        color="inherit"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 1300,
          bgcolor: "#00bfff",
          color: "#000",
          "&:hover": { bgcolor: "#009acd" }, // darker sky blue
        }}
      >
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#000", // black
            color: "#fff",
            transition: "all 0.3s ease",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
