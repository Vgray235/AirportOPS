// import { useContext, useEffect, useMemo, useState } from "react";
// import {
//   Box, Paper, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
//   TextField, MenuItem, Grid, Table, TableHead, TableRow, TableCell, TableBody, Chip, Tooltip
// } from "@mui/material";
// import { AuthContext } from "../contexts/AuthContext.jsx";
// import api from "../api/axios.js";
// import { toast } from "react-toastify";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";

// const STATUS = ["scheduled","boarding","departed","arrived","delayed","cancelled"];

// function StatusChip({ value }) {
//   const color =
//     value === "scheduled" ? "default" :
//     value === "boarding" ? "info" :
//     value === "departed" ? "warning" :
//     value === "arrived" ? "success" :
//     value === "delayed" ? "error" : "default";
//   return <Chip label={value} color={color} size="small" />;
// }

// export default function Flights() {
//   const { user } = useContext(AuthContext);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const canCreate = user?.role === "admin" || user?.role === "airline";
//   const canEdit = canCreate;
//   const canDelete = user?.role === "admin";

//   const fetchFlights = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/flights");
//       setRows(res.data || []);
//     } catch (e) {
//       toast.error(e.response?.data?.error || "Failed to load flights");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchFlights(); }, []);

//   // Create Dialog
//   const [openCreate, setOpenCreate] = useState(false);
//   const [createForm, setCreateForm] = useState({ flightNo: "", origin: "", destination: "", status: "" });

//   const createSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // IATA codes must be 3 letters; backend will validate too
//       if (createForm.origin.length !== 3 || createForm.destination.length !== 3) {
//         toast.warn("Origin/Destination must be 3-letter IATA codes");
//         return;
//       }
//       await api.post("/flights", {
//         flightNo: createForm.flightNo.trim(),
//         origin: createForm.origin.toUpperCase(),
//         destination: createForm.destination.toUpperCase(),
//         status: createForm.status || undefined
//       });
//       toast.success("Flight created");
//       setOpenCreate(false);
//       setCreateForm({ flightNo: "", origin: "", destination: "", status: "" });
//       fetchFlights();
//     } catch (e) {
//       const err = e.response?.data;
//       toast.error(err?.error || err?.message || "Create failed");
//     }
//   };

//   // Edit Dialog
//   const [openEdit, setOpenEdit] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({ status: "", gate: "", scheduledDep: "", scheduledArr: "" });

//   const openEditDialog = (row) => {
//     setEditId(row._id);
//     setEditForm({
//       status: row.status || "",
//       gate: row.gate || "",
//       scheduledDep: row.scheduledDep ? new Date(row.scheduledDep).toISOString().slice(0,16) : "",
//       scheduledArr: row.scheduledArr ? new Date(row.scheduledArr).toISOString().slice(0,16) : ""
//     });
//     setOpenEdit(true);
//   };

//   const editSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...(editForm.status ? { status: editForm.status } : {}),
//         ...(editForm.gate ? { gate: editForm.gate } : {}),
//         ...(editForm.scheduledDep ? { scheduledDep: new Date(editForm.scheduledDep).toISOString() } : {}),
//         ...(editForm.scheduledArr ? { scheduledArr: new Date(editForm.scheduledArr).toISOString() } : {})
//       };
//       await api.patch(`/flights/${editId}`, payload);
//       toast.success("Flight updated");
//       setOpenEdit(false);
//       setEditId(null);
//       fetchFlights();
//     } catch (e) {
//       toast.error(e.response?.data?.error || "Update failed");
//     }
//   };

//   const deleteFlight = async (id) => {
//     if (!confirm("Delete this flight?")) return;
//     try {
//       await api.delete(`/flights/${id}`);
//       toast.success("Flight deleted");
//       fetchFlights();
//     } catch (e) {
//       toast.error(e.response?.data?.error || "Delete failed");
//     }
//   };

//   const table = useMemo(() => (
//     <Table size="small">
//       <TableHead>
//         <TableRow>
//           <TableCell>Flight No</TableCell>
//           <TableCell>Origin</TableCell>
//           <TableCell>Destination</TableCell>
//           <TableCell>Status</TableCell>
//           <TableCell>Gate</TableCell>
//           <TableCell>Scheduled Dep</TableCell>
//           <TableCell>Scheduled Arr</TableCell>
//           {(canEdit || canDelete) && <TableCell align="right">Actions</TableCell>}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {rows.map((r) => (
//           <TableRow key={r._id} hover>
//             <TableCell>{r.flightNo}</TableCell>
//             <TableCell>{r.origin}</TableCell>
//             <TableCell>{r.destination}</TableCell>
//             <TableCell>{r.status ? <StatusChip value={r.status} /> : "-"}</TableCell>
//             <TableCell>{r.gate || "-"}</TableCell>
//             <TableCell>{r.scheduledDep ? new Date(r.scheduledDep).toLocaleString() : "-"}</TableCell>
//             <TableCell>{r.scheduledArr ? new Date(r.scheduledArr).toLocaleString() : "-"}</TableCell>
//             {(canEdit || canDelete) && (
//               <TableCell align="right">
//                 {canEdit && (
//                   <Tooltip title="Edit">
//                     <IconButton onClick={() => openEditDialog(r)} size="small"><EditIcon /></IconButton>
//                   </Tooltip>
//                 )}
//                 {canDelete && (
//                   <Tooltip title="Delete">
//                     <IconButton onClick={() => deleteFlight(r._id)} size="small" color="error"><DeleteIcon /></IconButton>
//                   </Tooltip>
//                 )}
//               </TableCell>
//             )}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   ), [rows]);

//   return (
//     <Box>
//       <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
//         <Typography variant="h5" fontWeight={800}>Flights</Typography>
//         <Box sx={{ flexGrow: 1 }} />
//         {canCreate && (
//           <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenCreate(true)}>
//             New Flight
//           </Button>
//         )}
//       </Box>

//       <Paper elevation={2} sx={{ p: 2 }}>
//         {loading ? "Loading..." : table}
//       </Paper>

//       {/* Create */}
//       <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Create Flight</DialogTitle>
//         <Box component="form" onSubmit={createSubmit}>
//           <DialogContent dividers>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField label="Flight No" fullWidth required
//                   value={createForm.flightNo}
//                   onChange={(e) => setCreateForm({ ...createForm, flightNo: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={6} md={3}>
//                 <TextField label="Origin (IATA)" fullWidth required inputProps={{ maxLength: 3 }}
//                   value={createForm.origin}
//                   onChange={(e) => setCreateForm({ ...createForm, origin: e.target.value.toUpperCase() })}
//                 />
//               </Grid>
//               <Grid item xs={6} md={3}>
//                 <TextField label="Destination (IATA)" fullWidth required inputProps={{ maxLength: 3 }}
//                   value={createForm.destination}
//                   onChange={(e) => setCreateForm({ ...createForm, destination: e.target.value.toUpperCase() })}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField label="Status" select fullWidth value={createForm.status}
//                   onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}>
//                   <MenuItem value="">(none)</MenuItem>
//                   {STATUS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
//                 </TextField>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
//             <Button type="submit" variant="contained">Create</Button>
//           </DialogActions>
//         </Box>
//       </Dialog>

//       {/* Edit */}
//       <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Edit Flight</DialogTitle>
//         <Box component="form" onSubmit={editSubmit}>
//           <DialogContent dividers>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField label="Status" select fullWidth value={editForm.status}
//                   onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
//                   {STATUS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField label="Gate" fullWidth value={editForm.gate}
//                   onChange={(e) => setEditForm({ ...editForm, gate: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Scheduled Departure"
//                   type="datetime-local"
//                   fullWidth
//                   InputLabelProps={{ shrink: true }}
//                   value={editForm.scheduledDep}
//                   onChange={(e) => setEditForm({ ...editForm, scheduledDep: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Scheduled Arrival"
//                   type="datetime-local"
//                   fullWidth
//                   InputLabelProps={{ shrink: true }}
//                   value={editForm.scheduledArr}
//                   onChange={(e) => setEditForm({ ...editForm, scheduledArr: e.target.value })}
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
//             <Button type="submit" variant="contained">Save</Button>
//           </DialogActions>
//         </Box>
//       </Dialog>
//     </Box>
//   );
// }

import { useContext, useEffect, useState } from "react";
import {
  Box, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Grid, Chip, Tooltip, Card, CardContent, CardActions
} from "@mui/material";
import { AuthContext } from "../contexts/AuthContext.jsx";
import api from "../api/axios.js";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const STATUS = ["scheduled","boarding","departed","arrived","delayed","cancelled"];

function StatusChip({ value }) {
  const color =
    value === "scheduled" ? "default" :
    value === "boarding" ? "info" :
    value === "departed" ? "warning" :
    value === "arrived" ? "success" :
    value === "delayed" ? "error" : "default";
  return <Chip label={value} color={color} size="small" />;
}

export default function Flights() {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const canCreate = user?.role === "admin" ;
//   || user?.role === "airline"
  const canEdit = canCreate;
  const canDelete = user?.role === "admin";

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const res = await api.get("/flights");
      setRows(res.data || []);
    } catch (e) {
      toast.error(e.response?.data?.error || "Failed to load flights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFlights(); }, []);

  // Create Dialog
  const [openCreate, setOpenCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ flightNo: "", origin: "", destination: "", status: "" });

  const createSubmit = async (e) => {
    e.preventDefault();
    try {
      if (createForm.origin.length !== 3 || createForm.destination.length !== 3) {
        toast.warn("Origin/Destination must be 3-letter IATA codes");
        return;
      }
      await api.post("/flights", {
        flightNo: createForm.flightNo.trim(),
        origin: createForm.origin.toUpperCase(),
        destination: createForm.destination.toUpperCase(),
        status: createForm.status || undefined
      });
      toast.success("Flight created");
      setOpenCreate(false);
      setCreateForm({ flightNo: "", origin: "", destination: "", status: "" });
      fetchFlights();
    } catch (e) {
      toast.error(e.response?.data?.error || "Create failed");
    }
  };

  // Edit Dialog
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ status: "", gate: "", scheduledDep: "", scheduledArr: "" });

  const openEditDialog = (row) => {
    setEditId(row._id);
    setEditForm({
      status: row.status || "",
      gate: row.gate || "",
      scheduledDep: row.scheduledDep ? new Date(row.scheduledDep).toISOString().slice(0,16) : "",
      scheduledArr: row.scheduledArr ? new Date(row.scheduledArr).toISOString().slice(0,16) : ""
    });
    setOpenEdit(true);
  };

  const editSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...(editForm.status ? { status: editForm.status } : {}),
        ...(editForm.gate ? { gate: editForm.gate } : {}),
        ...(editForm.scheduledDep ? { scheduledDep: new Date(editForm.scheduledDep).toISOString() } : {}),
        ...(editForm.scheduledArr ? { scheduledArr: new Date(editForm.scheduledArr).toISOString() } : {})
      };
      await api.patch(`/flights/${editId}`, payload);
      toast.success("Flight updated");
      setOpenEdit(false);
      setEditId(null);
      fetchFlights();
    } catch (e) {
      toast.error(e.response?.data?.error || "Update failed");
    }
  };

//   const deleteFlight = async (id) => {
//     if (!confirm("Delete this flight?")) return;
//     try {
//       await api.delete(`/flights/${id}`);
//       toast.success("Flight deleted");
//       fetchFlights();
//     } catch (e) {
//       toast.error(e.response?.data?.error || "Delete failed");
//     }
//   };
const deleteFlight = async (id) => {
  if (!confirm("Delete this flight?")) return;
  try {
    const res = await api.delete(`/flights/${id}`);
    // backend now sends deletedBaggageCount
    toast.success(`Flight deleted. ${res.data.deletedBaggageCount || 0} baggage record(s) also deleted.`);
    fetchFlights(); // refresh flights
    // Optionally: refresh baggage list if you have a separate Baggage component
    // fetchBaggage();
  } catch (e) {
    toast.error(e.response?.data?.error || "Delete failed");
  }
};



  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
        <Typography variant="h5" fontWeight={800}>Flights</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {canCreate && (
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenCreate(true)}>
            New Flight
          </Button>
        )}
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={2}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : rows.length === 0 ? (
          <Typography>No flights found</Typography>
        ) : (
          rows.map((r) => (
            <Grid item xs={12} sm={6} md={4} key={r._id}>
              <Card
                sx={{
                  bgcolor: "white",
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                    background: "linear-gradient(135deg, #ffffff, #f0f7ff)"
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{r.flightNo}</Typography>
                  <Typography color="text.secondary">
                    {r.origin} → {r.destination}
                  </Typography>
                  <Box mt={1}>
                    {r.status ? <StatusChip value={r.status} /> : "-"}
                  </Box>
                  <Typography variant="body2" mt={1}>
                    Gate: {r.gate || "-"}
                  </Typography>
                  <Typography variant="body2">
                    Dep: {r.scheduledDep ? new Date(r.scheduledDep).toLocaleString() : "-"}
                  </Typography>
                  <Typography variant="body2">
                    Arr: {r.scheduledArr ? new Date(r.scheduledArr).toLocaleString() : "-"}
                  </Typography>
                </CardContent>
                {(canEdit || canDelete) && (
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    {canEdit && (
                      <Tooltip title="Edit">
                        <IconButton onClick={() => openEditDialog(r)} size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {canDelete && (
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteFlight(r._id)} size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Create Dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Flight</DialogTitle>
        <Box component="form" onSubmit={createSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Flight No" fullWidth required
                  value={createForm.flightNo}
                  onChange={(e) => setCreateForm({ ...createForm, flightNo: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField label="Origin (IATA)" fullWidth required inputProps={{ maxLength: 3 }}
                  value={createForm.origin}
                  onChange={(e) => setCreateForm({ ...createForm, origin: e.target.value.toUpperCase() })}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField label="Destination (IATA)" fullWidth required inputProps={{ maxLength: 3 }}
                  value={createForm.destination}
                  onChange={(e) => setCreateForm({ ...createForm, destination: e.target.value.toUpperCase() })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Status" select fullWidth value={createForm.status}
                  onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}>
                  <MenuItem value="">(none)</MenuItem>
                  {STATUS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Create</Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Flight</DialogTitle>
        <Box component="form" onSubmit={editSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Status" select fullWidth value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                  {STATUS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Gate" fullWidth value={editForm.gate}
                  onChange={(e) => setEditForm({ ...editForm, gate: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Scheduled Departure"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={editForm.scheduledDep}
                  onChange={(e) => setEditForm({ ...editForm, scheduledDep: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Scheduled Arrival"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={editForm.scheduledArr}
                  onChange={(e) => setEditForm({ ...editForm, scheduledArr: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
