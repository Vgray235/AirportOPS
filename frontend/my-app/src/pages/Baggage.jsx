import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Container, Paper, Typography, TextField, Button,
  Grid, Card, CardContent, CardActions, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, Stack,
  Tooltip, ToggleButton, ToggleButtonGroup, Divider, Table,
  TableHead, TableRow, TableCell, TableBody, Chip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import { toast } from "react-toastify";

const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/baggage`
  : "http://localhost:4000/api/baggage";

const FLIGHT_API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/flights`
  : "http://localhost:4000/api/flights";

const STATUSES = ["checkin","loaded","inTransit","unloaded","atBelt","lost"];

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Function to get user role from token
function getUserRole() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}

// Function to check if user is admin
function isAdmin() {
  const role = getUserRole();
  return role === "admin";
}

// Function to check if user is airline
function isAirline() {
  const role = getUserRole();
  return role === "airline";
}

export default function Baggage() {
  const [rows, setRows] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [searchTag, setSearchTag] = useState("");
  const [userRole, setUserRole] = useState(null);

  const initialForm = { tagId:"", flightId:"", weight:"", status:"checkin", lastLocation:"" };
  const [form, setForm] = useState(initialForm);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Check user role on component mount
  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  // Normalize API response to always be array
  const normalizeData = (data) => (!data ? [] : Array.isArray(data) ? data : [data]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE, { headers: authHeaders() });
      setRows(normalizeData(res.data));
    } catch (err) {
      console.error("fetchAll error:", err);
      toast.error(err?.response?.data?.error || "Failed to load baggage");
      setRows([]);
    } finally { setLoading(false); }
  };

  const fetchFlights = async () => {
    try {
      const res = await axios.get(FLIGHT_API, { headers: authHeaders() });
      setFlights(normalizeData(res.data));
    } catch (err) {
      console.error("fetchFlights error:", err);
    }
  };

  const searchByTag = async (tag) => {
    if (!tag?.trim()) return toast.warn("Enter a Tag ID to search");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE}/tag/${encodeURIComponent(tag.trim())}`, { headers: authHeaders() });
      setRows(normalizeData(res.data));
    } catch (err) {
      console.error("search error:", err);
      toast.error(err?.response?.data?.error || "Baggage not found");
      setRows([]);
    } finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e?.preventDefault?.();
    if (!isAdmin()) {
      toast.error("Only administrators can create baggage records");
      return;
    }
    
    if (!form.tagId.trim()) return toast.error("Tag ID required");
    if (!/^[a-zA-Z0-9]+$/.test(form.tagId)) return toast.error("Tag ID must be alphanumeric");
    if (!form.flightId) return toast.error("Please select a flight");
    if (form.weight && !(Number(form.weight) >= 0.1 && Number(form.weight) <= 100))
      return toast.error("Weight must be between 0.1 and 100 kg");

    try {
      await axios.post(BASE, {
        tagId: form.tagId.trim(),
        flightId: form.flightId,
        weight: form.weight ? Number(form.weight) : undefined,
        status: form.status,
        lastLocation: form.lastLocation || undefined
      }, { headers: authHeaders() });
      toast.success("Baggage created");
      setIsCreateOpen(false); setForm(initialForm); await fetchAll();
    } catch (err) {
      console.error("create error:", err);
      toast.error(err?.response?.data?.error || "Create failed");
    }
  };

  const openEdit = (bag) => {
    if (!isAdmin()) {
      toast.error("Only administrators can edit baggage records");
      return;
    }
    
    setEditingId(bag._id);
    setForm({
      tagId: bag.tagId || "",
      flightId: bag.flightId?._id || "",
      weight: bag.weight ?? "",
      status: bag.status || "checkin",
      lastLocation: bag.lastLocation || ""
    });
    setIsEditOpen(true);
  };

  const handleEdit = async (e) => {
    e?.preventDefault?.();
    if (!isAdmin()) {
      toast.error("Only administrators can edit baggage records");
      return;
    }
    
    if (!editingId) return;
    try {
      await axios.patch(`${BASE}/${editingId}`, {
        status: form.status,
        lastLocation: form.lastLocation || undefined
      }, { headers: authHeaders() });
      toast.success("Baggage updated");
      setIsEditOpen(false); setEditingId(null); setForm(initialForm); await fetchAll();
    } catch (err) {
      console.error("edit error:", err);
      toast.error(err?.response?.data?.error || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin()) {
      toast.error("Only administrators can delete baggage records");
      return;
    }
    
    if (!confirm("Delete this baggage record?")) return;
    try {
      await axios.delete(`${BASE}/${id}`, { headers: authHeaders() });
      toast.success("Baggage deleted"); await fetchAll();
    } catch (err) {
      console.error("delete error:", err);
      toast.error(err?.response?.data?.error || "Delete failed");
    }
  };

  const handleReset = async () => { setSearchTag(""); await fetchAll(); };

  useEffect(() => { fetchFlights(); fetchAll(); }, []);

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case "checkin": return "default";
      case "loaded": return "primary";
      case "inTransit": return "info";
      case "unloaded": return "warning";
      case "atBelt": return "success";
      case "lost": return "error";
      default: return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt:5 }}>
      <Paper sx={{ p:3, borderRadius:3 }}>
        <Box sx={{ display:"flex", gap:2, alignItems:"center", mb:2, flexWrap:"wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" sx={{ fontWeight:800 }}>Baggage Management</Typography>
            {userRole && (
              <Chip 
                icon={isAdmin() ? <AdminPanelSettingsIcon /> : <AirlineStopsIcon />}
                label={isAdmin() ? "Admin Mode" : "Airline Mode"} 
                color={isAdmin() ? "primary" : "info"}
                size="small"
                sx={{ ml: 2 }}
              />
            )}
          </Box>
          <TextField
            placeholder="Search by Tag ID"
            size="small"
            value={searchTag}
            onChange={e=>setSearchTag(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter") searchByTag(searchTag)}}
            InputProps={{ startAdornment:<SearchIcon sx={{mr:1}}/> }}
            sx={{ width:{ xs:"100%", sm:300 } }}
          />
          <Button variant="outlined" startIcon={<SearchIcon/>} onClick={()=>searchByTag(searchTag)}>Search</Button>
          <Button variant="text" startIcon={<RefreshIcon/>} onClick={handleReset}>Reset</Button>
          <Box sx={{ flexGrow:1 }} />
          <ToggleButtonGroup value={viewMode} exclusive onChange={(e,v)=>v&&setViewMode(v)} size="small" sx={{ mr:1 }}>
            <ToggleButton value="cards" aria-label="cards"><Tooltip title="Cards"><ViewModuleIcon/></Tooltip></ToggleButton>
            <ToggleButton value="table" aria-label="table"><Tooltip title="Table"><ViewListIcon/></Tooltip></ToggleButton>
          </ToggleButtonGroup>
          {isAdmin() && (
            <Button variant="contained" startIcon={<AddIcon/>} onClick={()=>{setIsCreateOpen(true);setForm(initialForm)}}>New Baggage</Button>
          )}
        </Box>

        <Divider sx={{ mb:2 }}/>

        {loading ? <Typography>Loading...</Typography> : 
          rows.length===0 ? <Typography color="text.secondary">No baggage records found.</Typography> :
          viewMode==="cards" ? (
            <Grid container spacing={2}>
              {rows.map(bag=>(
                <Grid item xs={12} sm={6} md={4} key={bag._id}>
                  <Card sx={{ display:"flex", flexDirection:"column", justifyContent:"space-between", "&:hover":{ transform:"translateY(-6px)", boxShadow:"0 10px 30px rgba(2,12,27,0.12)" }}}>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">Tag ID</Typography>
                      <Typography variant="h6">{bag.tagId}</Typography>
                      <Typography variant="subtitle2" color="text.secondary">Flight</Typography>
                      <Typography variant="body1">{bag.flightId?.flightNo||"-"}</Typography>
                      <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                      <Chip 
                        label={bag.status} 
                        color={getStatusColor(bag.status)}
                        size="small"
                        sx={{textTransform:"capitalize", mb: 1}}
                      />
                      <Typography variant="subtitle2" color="text.secondary">Last location</Typography>
                      <Typography variant="body2">{bag.lastLocation||"-"}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Weight: {bag.weight??"-"} kg • Updated: {bag.updatedAt?new Date(bag.updatedAt).toLocaleString():"-"}
                      </Typography>
                    </CardContent>
                    {isAdmin() && (
                      <CardActions sx={{ justifyContent:"flex-end" }}>
                        <Tooltip title="Edit"><IconButton size="small" onClick={()=>openEdit(bag)}><EditIcon/></IconButton></Tooltip>
                        <Tooltip title="Delete"><IconButton size="small" color="error" onClick={()=>handleDelete(bag._id)}><DeleteIcon/></IconButton></Tooltip>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ overflowX:"auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tag ID</TableCell>
                    <TableCell>Flight No</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Last Location</TableCell>
                    <TableCell>Updated</TableCell>
                    {isAdmin() && <TableCell align="right">Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(bag=>(
                    <TableRow key={bag._id} hover>
                      <TableCell>{bag.tagId}</TableCell>
                      <TableCell>{bag.flightId?.flightNo||"-"}</TableCell>
                      <TableCell>
                        <Chip 
                          label={bag.status} 
                          color={getStatusColor(bag.status)}
                          size="small"
                          sx={{textTransform:"capitalize"}}
                        />
                      </TableCell>
                      <TableCell>{bag.weight??"-"}</TableCell>
                      <TableCell>{bag.lastLocation??"-"}</TableCell>
                      <TableCell>{bag.updatedAt?new Date(bag.updatedAt).toLocaleString():"-"}</TableCell>
                      {isAdmin() && (
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => openEdit(bag)}><EditIcon /></IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(bag._id)}><DeleteIcon /></IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )
        }

        {/* Create Dialog - Only for Admin */}
        {isAdmin() && (
          <Dialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>Create Baggage</DialogTitle>
            <Box component="form" onSubmit={handleCreate}>
              <DialogContent dividers>
                <Stack spacing={2}>
                  <TextField
                    label="Tag ID (alphanumeric)"
                    value={form.tagId}
                    onChange={(e) => setForm({ ...form, tagId: e.target.value })}
                    required
                  />
                  <TextField
                    select
                    label="Select Flight"
                    value={form.flightId}
                    onChange={(e) => setForm({ ...form, flightId: e.target.value })}
                    required
                  >
                    {flights.map(f => <MenuItem key={f._id} value={f._id}>{f.flightNo}</MenuItem>)}
                  </TextField>
                  <TextField
                    label="Weight (kg)"
                    type="number"
                    inputProps={{ step: "0.1", min: 0.1, max: 100 }}
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  />
                  <TextField
                    select
                    label="Status"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </TextField>
                  <TextField
                    label="Last Location"
                    value={form.lastLocation}
                    onChange={(e) => setForm({ ...form, lastLocation: e.target.value })}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained">Create</Button>
              </DialogActions>
            </Box>
          </Dialog>
        )}

        {/* Edit Dialog - Only for Admin */}
        {isAdmin() && (
          <Dialog open={isEditOpen} onClose={() => { setIsEditOpen(false); setEditingId(null); }} fullWidth maxWidth="sm">
            <DialogTitle>Edit Baggage</DialogTitle>
            <Box component="form" onSubmit={handleEdit}>
              <DialogContent dividers>
                <Stack spacing={2}>
                  <TextField
                    label="Tag ID (read-only)"
                    value={form.tagId}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Flight ID (read-only)"
                    value={form.flightId}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    select
                    label="Status"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </TextField>
                  <TextField
                    label="Last Location"
                    value={form.lastLocation}
                    onChange={(e) => setForm({ ...form, lastLocation: e.target.value })}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { setIsEditOpen(false); setEditingId(null); }}>Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
              </DialogActions>
            </Box>
          </Dialog>
        )}
      </Paper>
    </Container>
  );
}