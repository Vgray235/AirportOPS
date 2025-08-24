// import React, { useEffect, useState } from "react";
// import {
//   Box, Stack, Grid, Card, CardHeader, CardContent, Typography,
//   Avatar, TextField, Button, CircularProgress, Divider,
//   MenuItem, Select, FormControl, InputLabel, Paper
// } from "@mui/material";
// import { FlightTakeoff, Luggage, Schedule, Warning } from "@mui/icons-material";
// import { delayFlight, getAnalytics, listFlights } from "../api/api.js";
// import { toast } from "react-toastify";

// export default function OpsPage() {
//   const [analytics, setAnalytics] = useState(null);
//   const [flights, setFlights] = useState([]); // ✅ always an array
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [form, setForm] = useState({ flightId: "", reason: "", newTime: "", flightNo: "" });

//   useEffect(() => { loadData(); }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [a, f] = await Promise.all([getAnalytics(), listFlights()]);
//       setAnalytics(a?.data || {});
//       setFlights(f?.data || []); // ✅ safe fallback
//     } catch {
//       toast.error("Failed to load operations data");
//     } finally { setLoading(false); }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.flightId || !form.reason || !form.newTime) return toast.error("All fields required");
//     setSubmitting(true);
//     try {
//       await delayFlight(form.flightId, { reason: form.reason, newTime: form.newTime });
//       toast.success("Delay notification sent");
//       setForm({ flightId: "", reason: "", newTime: "", flightNo: "" });
//       const res = await getAnalytics();
//       setAnalytics(res.data);
//     } catch {
//       toast.error("Failed to send delay notification");
//     } finally { setSubmitting(false); }
//   };

//   const handleFlightChange = (id) => {
//     const flight = flights.find(f => f._id === id);
//     setForm(prev => ({ ...prev, flightId: id, flightNo: flight?.flightNo || "" }));
//   };

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//       <CircularProgress sx={{ color: "#6366f1" }} />
//     </Box>
//   );

//   const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
//     <Card sx={statCardStyle}>
//       <CardContent>
//         <Stack direction="row" alignItems="center" spacing={2} mb={1}>
//           <Avatar sx={{ bgcolor: `${color}20`, color, width: 44, height: 44 }}>
//             <Icon />
//           </Avatar>
//           <Typography fontWeight={600} fontSize="1rem">{title}</Typography>
//         </Stack>
//         <Typography variant="h4" fontWeight={700} color={color}>{value}</Typography>
//         <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Box sx={pageWrapper}>
//       <Stack spacing={6}>
//         {/* Analytics */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <StatCard icon={FlightTakeoff} title="Flights Today" value={analytics?.totalFlightsToday || 0} color="#6366f1" subtitle="Scheduled today" />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <StatCard icon={Luggage} title="Baggages Total" value={analytics?.totalBaggageProcessed || 0} color="#10b981" subtitle="Bags handled" />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <StatCard icon={Schedule} title="Flights Total" value={flights?.length || 0} color="#f59e0b" subtitle="Total flights" />
//           </Grid>
//         </Grid>

//         {/* Delay Notification Form */}
//         <Card sx={cardGlass}>
//           <CardHeader
//             avatar={<Avatar sx={{ bgcolor: "#6366f1" }}><Warning /></Avatar>}
//             title={<Typography fontWeight={600}>Send Delay Notification</Typography>}
//             subheader="Notify passengers about delays"
//           />
//           <Divider />
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <Stack spacing={2}>
//                 <FormControl fullWidth>
//                   <InputLabel>Select Flight</InputLabel>
//                   <Select value={form.flightId} onChange={(e) => handleFlightChange(e.target.value)}>
//                     <MenuItem value="">Choose flight</MenuItem>
//                     {Array.isArray(flights) && flights.map(f => (
//                       <MenuItem key={f._id} value={f._id}>{f.flightNo} – {f.origin} → {f.destination}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 {form.flightNo && (
//                   <Paper sx={infoBox}>
//                     <Typography variant="subtitle2" fontWeight={600}>Selected Flight: {form.flightNo}</Typography>
//                   </Paper>
//                 )}

//                 <TextField label="Reason" value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} multiline rows={3} required fullWidth />
//                 <TextField type="datetime-local" label="New Departure" InputLabelProps={{ shrink: true }} value={form.newTime} onChange={e => setForm(p => ({ ...p, newTime: e.target.value }))} required fullWidth />

//                 <Button type="submit" variant="contained" disabled={submitting} startIcon={submitting ? <CircularProgress size={20} /> : <Warning />} sx={btnStyle}>
//                   {submitting ? "Sending..." : "Send Notification"}
//                 </Button>
//               </Stack>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Flights List */}
//         <Card sx={cardGlass}>
//           <CardHeader title={<Typography fontWeight={600}>Available Flights</Typography>} subheader="Recent flights in system" />
//           <Divider />
//           <CardContent>
//             {Array.isArray(flights) && flights.length ? (
//               <Grid container spacing={2}>
//                 {flights.slice(0, 6).map(f => (
//                   <Grid item xs={12} sm={6} md={4} key={f._id}>
//                     <Paper sx={flightBox}>
//                       <Typography fontWeight={600}>{f.flightNo}</Typography>
//                       <Typography variant="body2">{f.origin} → {f.destination}</Typography>
//                       <Typography variant="caption" color="text.secondary">Status: {f.status} | Gate: {f.gate || "N/A"}</Typography>
//                     </Paper>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : <Typography align="center" py={3} color="text.secondary">No flights available</Typography>}
//           </CardContent>
//         </Card>
//       </Stack>
//     </Box>
//   );
// }

// /* === Styles === */
// const pageWrapper = {
//   maxWidth: 1280,
//   mx: "auto",
//   p: 3,
//   background: "linear-gradient(135deg, #ffffff, #f8fafc)",
//   borderRadius: 3,
// };

// const statCardStyle = {
//   borderRadius: 3,
//   width:"100%",
//   backdropFilter: "blur(8px)",
//   background: "rgba(255, 255, 255, 0.7)",
//   border: "1px solid rgba(255,255,255,0.3)",
//   boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
// };

// const cardGlass = {
//   borderRadius: 3,
//   backdropFilter: "blur(12px)",
//   background: "rgba(255, 255, 255, 0.6)",
//   border: "1px solid rgba(255,255,255,0.3)",
//   boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
// };

// const btnStyle = {
//   background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
//   borderRadius: 2,
//   textTransform: "none",
//   fontWeight: 600,
//   "&:hover": { background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }
// };

// const infoBox = {
//   p: 2,
//   bgcolor: "rgba(248, 250, 252, 0.7)",
//   border: "1px solid #e2e8f0",
//   borderRadius: 2
// };

// const flightBox = {
//   p: 2,
//   border: "1px solid #e2e8f0",
//   borderRadius: 2,
//   backdropFilter: "blur(6px)",
//   background: "rgba(255,255,255,0.65)",
//   transition: "0.2s",
//   "&:hover": { boxShadow: "0 6px 12px rgba(0,0,0,0.12)", transform: "translateY(-3px)" }
// };


// import React, { useEffect, useState } from "react";
// import {
//   Box, Stack, Grid, Card, CardHeader, CardContent, Typography,
//   Avatar, TextField, Button, CircularProgress, Divider,
//   MenuItem, Select, FormControl, InputLabel, Paper, Chip
// } from "@mui/material";
// import { 
//   FlightTakeoff, Luggage, Schedule, Warning, TrendingUp, 
//   AccessTime, Cancel, CheckCircle, Flight, LocalAirport 
// } from "@mui/icons-material";
// import { 
//   PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
//   Tooltip, ResponsiveContainer, LineChart, Line, Legend, Area, AreaChart 
// } from "recharts";
// import { delayFlight, getAnalytics, listFlights } from "../api/api.js";
// import { toast } from "react-toastify";

// export default function OpsPage() {
//   const [analytics, setAnalytics] = useState(null);
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [form, setForm] = useState({ flightId: "", reason: "", newTime: "", flightNo: "" });

//   useEffect(() => { loadData(); }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [a, f] = await Promise.all([getAnalytics(), listFlights()]);
//       setAnalytics(a?.data || {});
//       setFlights(f?.data || []);
//     } catch {
//       toast.error("Failed to load operations data");
//     } finally { setLoading(false); }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.flightId || !form.reason || !form.newTime) return toast.error("All fields required");
//     setSubmitting(true);
//     try {
//       await delayFlight(form.flightId, { reason: form.reason, newTime: form.newTime });
//       toast.success("Delay notification sent");
//       setForm({ flightId: "", reason: "", newTime: "", flightNo: "" });
//       const res = await getAnalytics();
//       setAnalytics(res.data);
//     } catch {
//       toast.error("Failed to send delay notification");
//     } finally { setSubmitting(false); }
//   };

//   const handleFlightChange = (id) => {
//     const flight = flights.find(f => f._id === id);
//     setForm(prev => ({ ...prev, flightId: id, flightNo: flight?.flightNo || "" }));
//   };

//   // Prepare chart data from analytics
//   const getFlightStatusData = () => {
//     const onTime = analytics?.onTimeFlights || 0;
//     const delayed = analytics?.delayedFlights || 0;
//     const cancelled = analytics?.cancelledFlights || 0;
//     const boarding = analytics?.boardingFlights || 0;

//     return [
//       { name: 'On Time', value: onTime, color: '#10b981' },
//       { name: 'Delayed', value: delayed, color: '#f59e0b' },
//       { name: 'Cancelled', value: cancelled, color: '#ef4444' },
//       { name: 'Boarding', value: boarding, color: '#6366f1' }
//     ];
//   };

//   const getBaggageData = () => {
//     const processed = analytics?.baggageProcessed || 0;
//     const pending = analytics?.baggagePending || 0;
//     const lost = analytics?.baggageLost || 0;

//     return [
//       { name: 'Processed', value: processed, color: '#10b981' },
//       { name: 'Pending', value: pending, color: '#f59e0b' },
//       { name: 'Lost/Delayed', value: lost, color: '#ef4444' }
//     ];
//   };

//   const getHourlyFlightData = () => {
//     return analytics?.hourlyFlights || [
//       { hour: '6AM', flights: 0, delays: 0 },
//       { hour: '9AM', flights: 0, delays: 0 },
//       { hour: '12PM', flights: 0, delays: 0 },
//       { hour: '3PM', flights: 0, delays: 0 },
//       { hour: '6PM', flights: 0, delays: 0 },
//       { hour: '9PM', flights: 0, delays: 0 }
//     ];
//   };

//   const getDailyTrendData = () => {
//     return analytics?.dailyTrends || [
//       { day: 'Mon', flights: 0, baggage: 0, delays: 0 },
//       { day: 'Tue', flights: 0, baggage: 0, delays: 0 },
//       { day: 'Wed', flights: 0, baggage: 0, delays: 0 },
//       { day: 'Thu', flights: 0, baggage: 0, delays: 0 },
//       { day: 'Fri', flights: 0, baggage: 0, delays: 0 },
//       { day: 'Sat', flights: 0, baggage: 0, delays: 0 },
//       { day: 'Sun', flights: 0, baggage: 0, delays: 0 }
//     ];
//   };

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//       <CircularProgress sx={{ color: "#6366f1" }} size={50} />
//     </Box>
//   );

//   const StatCard = ({ icon: Icon, title, value, color, subtitle, trend }) => (
//     <Card sx={statCardStyle}>
//       <CardContent>
//         <Stack direction="row" alignItems="center" spacing={2} mb={1}>
//           <Avatar sx={{ bgcolor: `${color}15`, color, width: 48, height: 48 }}>
//             <Icon fontSize="large" />
//           </Avatar>
//           <Box flex={1}>
//             <Typography fontWeight={600} fontSize="0.9rem" color="text.secondary">{title}</Typography>
//             <Typography variant="h3" fontWeight={700} color={color}>{value}</Typography>
//           </Box>
//           {trend && (
//             <Chip 
//               icon={<TrendingUp />} 
//               label={`${trend}%`} 
//               size="small" 
//               sx={{ bgcolor: trend > 0 ? '#10b98110' : '#ef444410', color: trend > 0 ? '#10b981' : '#ef4444' }}
//             />
//           )}
//         </Stack>
//         <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
//       </CardContent>
//     </Card>
//   );

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <Paper sx={{ p: 2, boxShadow: 3, bgcolor: 'rgba(255,255,255,0.95)' }}>
//           <Typography variant="subtitle2" fontWeight={600}>{label}</Typography>
//           {payload.map((entry, index) => (
//             <Typography key={index} variant="body2" sx={{ color: entry.color }}>
//               {entry.name}: {entry.value}
//             </Typography>
//           ))}
//         </Paper>
//       );
//     }
//     return null;
//   };

//   return (
//     <Box sx={pageWrapper}>
//       <Stack spacing={4}>
//         {/* Header */}
//         <Box>
//           <Typography variant="h4" fontWeight={700} color="#1f2937" gutterBottom>
//             Operations Dashboard
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Real-time airport operations monitoring and management
//           </Typography>
//         </Box>

//         {/* Key Metrics */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} lg={3}>
//             <StatCard 
//               icon={FlightTakeoff} 
//               title="Flights Today" 
//               value={analytics?.totalFlightsToday || 0} 
//               color="#6366f1" 
//               subtitle="Scheduled flights"
//               trend={analytics?.flightsTrend}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} lg={3}>
//             <StatCard 
//               icon={Luggage} 
//               title="Baggage Processed" 
//               value={analytics?.totalBaggageProcessed || 0} 
//               color="#10b981" 
//               subtitle="Bags handled today"
//               trend={analytics?.baggageTrend}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} lg={3}>
//             <StatCard 
//               icon={AccessTime} 
//               title="Avg Delay" 
//               value={`${analytics?.averageDelay || 0}min`} 
//               color="#f59e0b" 
//               subtitle="Average delay time"
//               trend={analytics?.delayTrend}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} lg={3}>
//             <StatCard 
//               icon={CheckCircle} 
//               title="On-Time Rate" 
//               value={`${analytics?.onTimeRate || 0}%`} 
//               color="#10b981" 
//               subtitle="Punctuality score"
//               trend={analytics?.onTimeRateTrend}
//             />
//           </Grid>
//         </Grid>

//         {/* Charts Section */}
//         <Grid container spacing={4}>
//           {/* Flight Status Pie Chart */}
//           <Grid item xs={12} lg={6}>
//             <Card sx={cardGlass}>
//               <CardHeader 
//                 avatar={<Avatar sx={{ bgcolor: "#6366f1" }}><Flight /></Avatar>}
//                 title="Flight Status Distribution" 
//                 subheader="Current flight status breakdown"
//               />
//               <Divider />
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={getFlightStatusData()}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {getFlightStatusData().map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Baggage Status Pie Chart */}
//           <Grid item xs={12} lg={6}>
//             <Card sx={cardGlass}>
//               <CardHeader 
//                 avatar={<Avatar sx={{ bgcolor: "#10b981" }}><Luggage /></Avatar>}
//                 title="Baggage Processing Status" 
//                 subheader="Baggage handling breakdown"
//               />
//               <Divider />
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={getBaggageData()}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {getBaggageData().map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Hourly Flight Activity */}
//           <Grid item xs={12}>
//             <Card sx={cardGlass}>
//               <CardHeader 
//                 avatar={<Avatar sx={{ bgcolor: "#f59e0b" }}><Schedule /></Avatar>}
//                 title="Hourly Flight Activity" 
//                 subheader="Flights and delays throughout the day"
//               />
//               <Divider />
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={350}>
//                   <BarChart data={getHourlyFlightData()}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//                     <XAxis dataKey="hour" stroke="#64748b" />
//                     <YAxis stroke="#64748b" />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Bar dataKey="flights" fill="#6366f1" name="Total Flights" radius={[4, 4, 0, 0]} />
//                     <Bar dataKey="delays" fill="#ef4444" name="Delayed Flights" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Weekly Trends */}
//           <Grid item xs={12}>
//             <Card sx={cardGlass}>
//               <CardHeader 
//                 avatar={<Avatar sx={{ bgcolor: "#8b5cf6" }}><TrendingUp /></Avatar>}
//                 title="Weekly Operations Trend" 
//                 subheader="7-day analysis of flights, baggage, and delays"
//               />
//               <Divider />
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={350}>
//                   <AreaChart data={getDailyTrendData()}>
//                     <defs>
//                       <linearGradient id="flightGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
//                         <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
//                       </linearGradient>
//                       <linearGradient id="baggageGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
//                         <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
//                       </linearGradient>
//                       <linearGradient id="delayGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
//                         <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//                     <XAxis dataKey="day" stroke="#64748b" />
//                     <YAxis stroke="#64748b" />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Area 
//                       type="monotone" 
//                       dataKey="flights" 
//                       stroke="#6366f1" 
//                       fillOpacity={1} 
//                       fill="url(#flightGradient)" 
//                       name="Flights"
//                       strokeWidth={2}
//                     />
//                     <Area 
//                       type="monotone" 
//                       dataKey="baggage" 
//                       stroke="#10b981" 
//                       fillOpacity={1} 
//                       fill="url(#baggageGradient)" 
//                       name="Baggage (hundreds)"
//                       strokeWidth={2}
//                     />
//                     <Line 
//                       type="monotone" 
//                       dataKey="delays" 
//                       stroke="#ef4444" 
//                       strokeWidth={3}
//                       dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
//                       name="Delays"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Delay Notification Form */}
//         <Card sx={cardGlass}>
//           <CardHeader
//             avatar={<Avatar sx={{ bgcolor: "#ef4444" }}><Warning /></Avatar>}
//             title={<Typography fontWeight={600}>Send Delay Notification</Typography>}
//             subheader="Notify passengers about flight delays"
//           />
//           <Divider />
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <Stack spacing={3}>
//                 <FormControl fullWidth>
//                   <InputLabel>Select Flight</InputLabel>
//                   <Select value={form.flightId} onChange={(e) => handleFlightChange(e.target.value)}>
//                     <MenuItem value="">Choose flight</MenuItem>
//                     {Array.isArray(flights) && flights.map(f => (
//                       <MenuItem key={f._id} value={f._id}>
//                         <Stack direction="row" alignItems="center" spacing={1}>
//                           <LocalAirport fontSize="small" />
//                           <Typography>{f.flightNo} – {f.origin} → {f.destination}</Typography>
//                         </Stack>
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 {form.flightNo && (
//                   <Paper sx={infoBox}>
//                     <Typography variant="subtitle2" fontWeight={600} color="#6366f1">
//                       Selected Flight: {form.flightNo}
//                     </Typography>
//                   </Paper>
//                 )}

//                 <TextField 
//                   label="Delay Reason" 
//                   value={form.reason} 
//                   onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} 
//                   multiline 
//                   rows={3} 
//                   required 
//                   fullWidth
//                   placeholder="e.g., Weather conditions, Technical issues, Air traffic control delay..."
//                 />
                
//                 <TextField 
//                   type="datetime-local" 
//                   label="New Departure Time" 
//                   InputLabelProps={{ shrink: true }} 
//                   value={form.newTime} 
//                   onChange={e => setForm(p => ({ ...p, newTime: e.target.value }))} 
//                   required 
//                   fullWidth 
//                 />

//                 <Button 
//                   type="submit" 
//                   variant="contained" 
//                   disabled={submitting} 
//                   startIcon={submitting ? <CircularProgress size={20} /> : <Warning />} 
//                   sx={btnStyle}
//                   size="large"
//                 >
//                   {submitting ? "Sending Notification..." : "Send Delay Notification"}
//                 </Button>
//               </Stack>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Flights List */}
//         <Card sx={cardGlass}>
//           <CardHeader 
//             title={<Typography fontWeight={600}>Flight Operations Overview</Typography>} 
//             subheader={`${flights.length} flights in system`}
//           />
//           <Divider />
//           <CardContent>
//             {Array.isArray(flights) && flights.length ? (
//               <Grid container spacing={3}>
//                 {flights.slice(0, 8).map(f => (
//                   <Grid item xs={12} sm={6} md={4} lg={3} key={f._id}>
//                     <Paper sx={flightBox}>
//                       <Stack spacing={1}>
//                         <Stack direction="row" justifyContent="space-between" alignItems="center">
//                           <Typography fontWeight={600} variant="h6" color="#1f2937">
//                             {f.flightNo}
//                           </Typography>
//                           <Chip 
//                             label={f.status || 'Scheduled'} 
//                             size="small"
//                             sx={{ 
//                               bgcolor: f.status === 'On Time' ? '#10b98120' : 
//                                       f.status === 'Delayed' ? '#f59e0b20' : 
//                                       f.status === 'Cancelled' ? '#ef444420' : '#6366f120',
//                               color: f.status === 'On Time' ? '#10b981' : 
//                                      f.status === 'Delayed' ? '#f59e0b' : 
//                                      f.status === 'Cancelled' ? '#ef4444' : '#6366f1',
//                               fontWeight: 600
//                             }}
//                           />
//                         </Stack>
                        
//                         <Stack direction="row" alignItems="center" spacing={1}>
//                           <Typography variant="body1" fontWeight={500}>
//                             {f.origin}
//                           </Typography>
//                           <FlightTakeoff fontSize="small" sx={{ color: '#6366f1' }} />
//                           <Typography variant="body1" fontWeight={500}>
//                             {f.destination}
//                           </Typography>
//                         </Stack>
                        
//                         <Divider />
                        
//                         <Stack direction="row" justifyContent="space-between" alignItems="center">
//                           <Typography variant="caption" color="text.secondary">
//                             Gate: {f.gate || "TBA"}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             Terminal: {f.terminal || "N/A"}
//                           </Typography>
//                         </Stack>
//                       </Stack>
//                     </Paper>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Box textAlign="center" py={6}>
//                 <LocalAirport sx={{ fontSize: 64, color: '#cbd5e1', mb: 2 }} />
//                 <Typography variant="h6" color="text.secondary" gutterBottom>
//                   No flights available
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Flight data will appear here when available
//                 </Typography>
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       </Stack>
//     </Box>
//   );
// }

// /* === Enhanced Styles === */
// const pageWrapper = {
//   maxWidth: 1400,
//   mx: "auto",
//   p: { xs: 2, sm: 3, md: 4 },
//   background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
//   minHeight: "100vh",
// };

// const statCardStyle = {
//   borderRadius: 3,
//   backdropFilter: "blur(10px)",
//   background: "rgba(255, 255, 255, 0.8)",
//   border: "1px solid rgba(255,255,255,0.2)",
//   boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-4px)",
//     boxShadow: "0 16px 48px rgba(0,0,0,0.12)"
//   }
// };

// const cardGlass = {
//   borderRadius: 4,
//   backdropFilter: "blur(12px)",
//   background: "rgba(255, 255, 255, 0.9)",
//   border: "1px solid rgba(255,255,255,0.2)",
//   boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
//   transition: "all 0.3s ease",
// };

// const btnStyle = {
//   background: "linear-gradient(135deg, #ef4444, #dc2626)",
//   borderRadius: 3,
//   textTransform: "none",
//   fontWeight: 600,
//   py: 1.5,
//   px: 4,
//   boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)",
//   "&:hover": { 
//     background: "linear-gradient(135deg, #dc2626, #b91c1c)",
//     boxShadow: "0 6px 20px rgba(239, 68, 68, 0.4)",
//     transform: "translateY(-1px)"
//   }
// };

// const infoBox = {
//   p: 2,
//   bgcolor: "rgba(99, 102, 241, 0.05)",
//   border: "1px solid rgba(99, 102, 241, 0.2)",
//   borderRadius: 2,
//   backdropFilter: "blur(4px)"
// };

// const flightBox = {
//   p: 3,
//   border: "1px solid rgba(226, 232, 240, 0.6)",
//   borderRadius: 3,
//   backdropFilter: "blur(8px)",
//   background: "rgba(255,255,255,0.85)",
//   transition: "all 0.3s ease",
//   "&:hover": { 
//     boxShadow: "0 8px 24px rgba(0,0,0,0.12)", 
//     transform: "translateY(-2px)",
//     background: "rgba(255,255,255,0.95)"
//   }
// };

import React, { useEffect, useState } from "react";
import {
  Box, Stack, Grid, Card, CardHeader, CardContent, Typography,
  Avatar, TextField, Button, CircularProgress, Divider,
  MenuItem, Select, FormControl, InputLabel, Paper, Chip
} from "@mui/material";
import { 
  FlightTakeoff, Luggage, Schedule, Warning, TrendingUp, 
  AccessTime, Cancel, CheckCircle, Flight, LocalAirport 
} from "@mui/icons-material";
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, Legend, Area, AreaChart 
} from "recharts";
import { delayFlight, getAnalytics, listFlights } from "../api/api.js";
import { toast } from "react-toastify";

export default function OpsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ flightId: "", reason: "", newTime: "", flightNo: "" });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [a, f] = await Promise.all([getAnalytics(), listFlights()]);
      setAnalytics(a?.data || {});
      setFlights(f?.data || []);
    } catch {
      toast.error("Failed to load operations data");
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.flightId || !form.reason || !form.newTime) return toast.error("All fields required");
    setSubmitting(true);
    try {
      await delayFlight(form.flightId, { reason: form.reason, newTime: form.newTime });
      toast.success("Delay notification sent");
      setForm({ flightId: "", reason: "", newTime: "", flightNo: "" });
      const res = await getAnalytics();
      setAnalytics(res.data);
    } catch {
      toast.error("Failed to send delay notification");
    } finally { setSubmitting(false); }
  };

  const handleFlightChange = (id) => {
    const flight = flights.find(f => f._id === id);
    setForm(prev => ({ ...prev, flightId: id, flightNo: flight?.flightNo || "" }));
  };

  // Prepare chart data from analytics
  const getFlightStatusData = () => {
    const onTime = analytics?.onTimeFlights || 0;
    const delayed = analytics?.delayedFlights || 0;
    const cancelled = analytics?.cancelledFlights || 0;
    const boarding = analytics?.boardingFlights || 0;

    return [
      { name: 'On Time', value: onTime, color: '#10b981', icon: '✈️' },
      { name: 'Delayed', value: delayed, color: '#f59e0b', icon: '⏰' },
      { name: 'Cancelled', value: cancelled, color: '#ef4444', icon: '❌' },
      { name: 'Boarding', value: boarding, color: '#6366f1', icon: '🚪' }
    ];
  };

  const getBaggageData = () => {
    const processed = analytics?.baggageProcessed || 0;
    const pending = analytics?.baggagePending || 0;
    const lost = analytics?.baggageLost || 0;

    return [
      { name: 'Processed', value: processed, color: '#10b981', icon: '✅' },
      { name: 'Pending', value: pending, color: '#f59e0b', icon: '⏳' },
      { name: 'Lost/Delayed', value: lost, color: '#ef4444', icon: '⚠️' }
    ];
  };



  const getHourlyFlightData = () => {
    return analytics?.hourlyFlights || [
      { hour: '6AM', flights: 0, delays: 0 },
      { hour: '9AM', flights: 0, delays: 0 },
      { hour: '12PM', flights: 0, delays: 0 },
      { hour: '3PM', flights: 0, delays: 0 },
      { hour: '6PM', flights: 0, delays: 0 },
      { hour: '9PM', flights: 0, delays: 0 }
    ];
  };

  const getDailyTrendData = () => {
    return analytics?.dailyTrends || [
      { day: 'Mon', flights: 0, baggage: 0, delays: 0 },
      { day: 'Tue', flights: 0, baggage: 0, delays: 0 },
      { day: 'Wed', flights: 0, baggage: 0, delays: 0 },
      { day: 'Thu', flights: 0, baggage: 0, delays: 0 },
      { day: 'Fri', flights: 0, baggage: 0, delays: 0 },
      { day: 'Sat', flights: 0, baggage: 0, delays: 0 },
      { day: 'Sun', flights: 0, baggage: 0, delays: 0 }
    ];
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
      <CircularProgress sx={{ color: "#6366f1" }} size={50} />
    </Box>
  );

  const StatCard = ({ icon: Icon, title, value, color, subtitle, trend }) => (
    <Card sx={statCardStyle}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} mb={1}>
          <Avatar sx={{ bgcolor: `${color}15`, color, width: 48, height: 48 }}>
            <Icon fontSize="large" />
          </Avatar>
          <Box flex={1}>
            <Typography fontWeight={600} fontSize="0.9rem" color="text.secondary">{title}</Typography>
            <Typography variant="h3" fontWeight={700} color={color}>{value}</Typography>
          </Box>
          {trend && (
            <Chip 
              icon={<TrendingUp />} 
              label={`${trend}%`} 
              size="small" 
              sx={{ bgcolor: trend > 0 ? '#10b98110' : '#ef444410', color: trend > 0 ? '#10b981' : '#ef4444' }}
            />
          )}
        </Stack>
        <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
      </CardContent>
    </Card>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, boxShadow: 3, bgcolor: 'rgba(255,255,255,0.95)' }}>
          <Typography variant="subtitle2" fontWeight={600}>{label}</Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={pageWrapper}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" fontWeight={700} color="#1f2937" gutterBottom>
            Operations Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time airport operations monitoring and management
          </Typography>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={FlightTakeoff} 
              title="Flights Today" 
              value={analytics?.totalFlightsToday || 0} 
              color="#6366f1" 
              subtitle="Scheduled flights"
              trend={analytics?.flightsTrend}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={Luggage} 
              title="Baggage Processed" 
              value={analytics?.totalBaggageProcessed || 0} 
              color="#10b981" 
              subtitle="Bags handled today"
              trend={analytics?.baggageTrend}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={AccessTime} 
              title="Avg Delay" 
              value={`${analytics?.averageDelay || 0}min`} 
              color="#f59e0b" 
              subtitle="Average delay time"
              trend={analytics?.delayTrend}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={CheckCircle} 
              title="On-Time Rate" 
              value={`${analytics?.onTimeRate || 0}%`} 
              color="#10b981" 
              subtitle="Punctuality score"
              trend={analytics?.onTimeRateTrend}
            />
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={4}>
          {/* Flight Status Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={chartCardStyle}>
              <CardHeader 
                avatar={<Avatar sx={{ bgcolor: "#6366f1" }}><Flight /></Avatar>}
                title="Flight Status" 
                subheader="Current status breakdown"
              />
              <Divider />
              <CardContent sx={{ py: 2 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={getFlightStatusData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {getFlightStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <Paper sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.95)', boxShadow: 2 }}>
                                <Typography variant="body2" fontWeight={600}>
                                  {data.icon} {data.name}: {data.value}
                                </Typography>
                              </Paper>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Legend */}
                  <Stack spacing={1} mt={1} width="100%">
                    {getFlightStatusData().map((item, index) => (
                      <Stack key={index} direction="row" alignItems="center" spacing={1}>
                        <Box
                          width={12}
                          height={12}
                          borderRadius="50%"
                          bgcolor={item.color}
                        />
                        <Typography variant="body2" fontSize="0.8rem">
                          {item.icon}
                        </Typography>
                        <Typography variant="body2" fontSize="0.8rem" flex={1}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" fontSize="0.8rem" fontWeight={600}>
                          {item.value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Baggage Status Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={chartCardStyle}>
              <CardHeader 
                avatar={<Avatar sx={{ bgcolor: "#10b981" }}><Luggage /></Avatar>}
                title="Baggage Status" 
                subheader="Processing breakdown"
              />
              <Divider />
              <CardContent sx={{ py: 2 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={getBaggageData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {getBaggageData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <Paper sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.95)', boxShadow: 2 }}>
                                <Typography variant="body2" fontWeight={600}>
                                  {data.icon} {data.name}: {data.value}
                                </Typography>
                              </Paper>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Legend */}
                  <Stack spacing={1} mt={1} width="100%">
                    {getBaggageData().map((item, index) => (
                      <Stack key={index} direction="row" alignItems="center" spacing={1}>
                        <Box
                          width={12}
                          height={12}
                          borderRadius="50%"
                          bgcolor={item.color}
                        />
                        <Typography variant="body2" fontSize="0.8rem">
                          {item.icon}
                        </Typography>
                        <Typography variant="body2" fontSize="0.8rem" flex={1}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" fontSize="0.8rem" fontWeight={600}>
                          {item.value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Hourly Flight Activity */}
          <Grid item xs={12}>
            <Card sx={cardGlass}>
              <CardHeader 
                avatar={<Avatar sx={{ bgcolor: "#f59e0b" }}><Schedule /></Avatar>}
                title="Hourly Flight Activity" 
                subheader="Flights and delays throughout the day"
              />
              <Divider />
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={getHourlyFlightData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="hour" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="flights" fill="#6366f1" name="Total Flights" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="delays" fill="#ef4444" name="Delayed Flights" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Weekly Trends */}
          <Grid item xs={12}>
            <Card sx={cardGlass}>
              <CardHeader 
                avatar={<Avatar sx={{ bgcolor: "#8b5cf6" }}><TrendingUp /></Avatar>}
                title="Weekly Operations Trend" 
                subheader="7-day analysis of flights, baggage, and delays"
              />
              <Divider />
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={getDailyTrendData()}>
                    <defs>
                      <linearGradient id="flightGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="baggageGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="delayGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="flights" 
                      stroke="#6366f1" 
                      fillOpacity={1} 
                      fill="url(#flightGradient)" 
                      name="Flights"
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="baggage" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#baggageGradient)" 
                      name="Baggage (hundreds)"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="delays" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                      name="Delays"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Delay Notification Form */}
        <Card sx={cardGlass}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: "#ef4444" }}><Warning /></Avatar>}
            title={<Typography fontWeight={600}>Send Delay Notification</Typography>}
            subheader="Notify passengers about flight delays"
          />
          <Divider />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>Select Flight</InputLabel>
                  <Select value={form.flightId} onChange={(e) => handleFlightChange(e.target.value)}>
                    <MenuItem value="">Choose flight</MenuItem>
                    {Array.isArray(flights) && flights.map(f => (
                      <MenuItem key={f._id} value={f._id}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <LocalAirport fontSize="small" />
                          <Typography>{f.flightNo} – {f.origin} → {f.destination}</Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {form.flightNo && (
                  <Paper sx={infoBox}>
                    <Typography variant="subtitle2" fontWeight={600} color="#6366f1">
                      Selected Flight: {form.flightNo}
                    </Typography>
                  </Paper>
                )}

                <TextField 
                  label="Delay Reason" 
                  value={form.reason} 
                  onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} 
                  multiline 
                  rows={3} 
                  required 
                  fullWidth
                  placeholder="e.g., Weather conditions, Technical issues, Air traffic control delay..."
                />
                
                <TextField 
                  type="datetime-local" 
                  label="New Departure Time" 
                  InputLabelProps={{ shrink: true }} 
                  value={form.newTime} 
                  onChange={e => setForm(p => ({ ...p, newTime: e.target.value }))} 
                  required 
                  fullWidth 
                />

                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={submitting} 
                  startIcon={submitting ? <CircularProgress size={20} /> : <Warning />} 
                  sx={btnStyle}
                  size="large"
                >
                  {submitting ? "Sending Notification..." : "Send Delay Notification"}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>

        {/* Flights List */}
        <Card sx={cardGlass}>
          <CardHeader 
            title={<Typography fontWeight={600}>Flight Operations Overview</Typography>} 
            subheader={`${flights.length} flights in system`}
          />
          <Divider />
          <CardContent>
            {Array.isArray(flights) && flights.length ? (
              <Grid container spacing={3}>
                {flights.slice(0, 8).map(f => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={f._id}>
                    <Paper sx={flightBox}>
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography fontWeight={600} variant="h6" color="#1f2937">
                            {f.flightNo}
                          </Typography>
                          <Chip 
                            label={f.status || 'Scheduled'} 
                            size="small"
                            sx={{ 
                              bgcolor: f.status === 'On Time' ? '#10b98120' : 
                                      f.status === 'Delayed' ? '#f59e0b20' : 
                                      f.status === 'Cancelled' ? '#ef444420' : '#6366f120',
                              color: f.status === 'On Time' ? '#10b981' : 
                                     f.status === 'Delayed' ? '#f59e0b' : 
                                     f.status === 'Cancelled' ? '#ef4444' : '#6366f1',
                              fontWeight: 600
                            }}
                          />
                        </Stack>
                        
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body1" fontWeight={500}>
                            {f.origin}
                          </Typography>
                          <FlightTakeoff fontSize="small" sx={{ color: '#6366f1' }} />
                          <Typography variant="body1" fontWeight={500}>
                            {f.destination}
                          </Typography>
                        </Stack>
                        
                        <Divider />
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            Gate: {f.gate || "TBA"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Terminal: {f.terminal || "N/A"}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box textAlign="center" py={6}>
                <LocalAirport sx={{ fontSize: 64, color: '#cbd5e1', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No flights available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Flight data will appear here when available
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

/* === Enhanced Styles === */
const pageWrapper = {
  maxWidth: 1400,
  mx: "auto",
  p: { xs: 2, sm: 3, md: 4 },
  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  minHeight: "100vh",
};

const statCardStyle = {
  borderRadius: 3,
  backdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.8)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.12)"
  }
};

const chartCardStyle = {
  borderRadius: 3,
  backdropFilter: "blur(12px)",
  background: "rgba(255, 255, 255, 0.9)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};

const cardGlass = {
  borderRadius: 4,
  backdropFilter: "blur(12px)",
  background: "rgba(255, 255, 255, 0.9)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
};

const btnStyle = {
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  borderRadius: 3,
  textTransform: "none",
  fontWeight: 600,
  py: 1.5,
  px: 4,
  boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)",
  "&:hover": { 
    background: "linear-gradient(135deg, #dc2626, #b91c1c)",
    boxShadow: "0 6px 20px rgba(239, 68, 68, 0.4)",
    transform: "translateY(-1px)"
  }
};

const infoBox = {
  p: 2,
  bgcolor: "rgba(99, 102, 241, 0.05)",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  borderRadius: 2,
  backdropFilter: "blur(4px)"
};

const flightBox = {
  p: 3,
  border: "1px solid rgba(226, 232, 240, 0.6)",
  borderRadius: 3,
  backdropFilter: "blur(8px)",
  background: "rgba(255,255,255,0.85)",
  transition: "all 0.3s ease",
  "&:hover": { 
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)", 
    transform: "translateY(-2px)",
    background: "rgba(255,255,255,0.95)"
  }
};



