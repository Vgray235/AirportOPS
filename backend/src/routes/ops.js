// import { Router } from 'express';
// import { authRequired } from '../middleware/auth.js';
// import Flight from '../models/Flight.js';
// import Baggage from '../models/Baggage.js';
// import { producer } from '../config/kafka.js';
// import { redis } from '../config/redis.js';

// const router = Router();

// // Delay notification (publishes flight-event + relies on dashboard socket)
// router.post('/flights/:id/delay', authRequired(['admin','airline']), async (req, res) => {
//   const { id } = req.params;
//   const { reason, newTime } = req.body;

//   const f = await Flight.findByIdAndUpdate(id, { status: 'delayed', scheduledDep: newTime || undefined }, { new: true });
//   if (!f) return res.status(404).json({ error: 'Not found' });

//   await producer.send({
//     topic: 'flight-events',
//     messages: [{ key: f.flightNo, value: JSON.stringify({
//       type: 'flight', subtype: 'delayed', flightId: f._id, flightNo: f.flightNo, payload: { reason, newTime }
//     }) }]
//   });

//   await redis.set(`flight:${f._id}:status`, JSON.stringify({
//     flightNo: f.flightNo, gate: f.gate, status: f.status,
//     scheduledDep: f.scheduledDep, scheduledArr: f.scheduledArr
//   }), { EX: 3600 });

//   res.json({ message: 'Delay notification sent' });
// });

// // Simple analytics (today)
// router.get('/analytics', authRequired(['admin','airline']), async (req, res) => {
//   const start = new Date(); start.setHours(0,0,0,0);
//   const end = new Date(); end.setHours(23,59,59,999);

//   const totalFlightsToday = await Flight.countDocuments({ createdAt: { $gte: start, $lte: end } });
//   const totalBaggageProcessed = await Baggage.countDocuments({ updatedAt: { $gte: start, $lte: end }, status: { $in: ['loaded','unloaded','atBelt'] } });

//   res.json({ totalFlightsToday, totalBaggageProcessed });
// });

// export default router;

// import { Router } from 'express';
// import { authRequired } from '../middleware/auth.js';
// import Flight from '../models/Flight.js';
// import Baggage from '../models/Baggage.js';
// import { producer } from '../config/kafka.js';
// import { redis } from '../config/redis.js';

// const router = Router();

// // Delay notification (publishes flight-event + relies on dashboard socket)
// router.post('/flights/:id/delay', authRequired(['admin','airline']), async (req, res) => {
//   const { id } = req.params;
//   const { reason, newTime } = req.body;

//   try {
//     const f = await Flight.findByIdAndUpdate(
//       id, 
//       { 
//         status: 'Delayed', 
//         scheduledDep: newTime || undefined,
//         delayReason: reason,
//         delayedAt: new Date()
//       }, 
//       { new: true }
//     );
    
//     if (!f) return res.status(404).json({ error: 'Flight not found' });

//     // Send Kafka event for real-time notifications
//     await producer.send({
//       topic: 'flight-events',
//       messages: [{ 
//         key: f.flightNo, 
//         value: JSON.stringify({
//           type: 'flight', 
//           subtype: 'delayed', 
//           flightId: f._id, 
//           flightNo: f.flightNo, 
//           payload: { reason, newTime, timestamp: new Date() }
//         }) 
//       }]
//     });

//     // Cache updated flight status
//     await redis.set(`flight:${f._id}:status`, JSON.stringify({
//       flightNo: f.flightNo, 
//       gate: f.gate, 
//       status: f.status,
//       scheduledDep: f.scheduledDep, 
//       scheduledArr: f.scheduledArr,
//       delayReason: reason,
//       lastUpdated: new Date()
//     }), { EX: 3600 });

//     // Invalidate analytics cache to refresh dashboard
//     await redis.del('analytics:cache');

//     res.json({ 
//       message: 'Delay notification sent successfully',
//       flight: {
//         id: f._id,
//         flightNo: f.flightNo,
//         status: f.status,
//         newDepartureTime: newTime
//       }
//     });
//   } catch (error) {
//     console.error('Error processing delay notification:', error);
//     res.status(500).json({ error: 'Failed to process delay notification' });
//   }
// });

// // Comprehensive analytics endpoint
// router.get('/analytics', authRequired(['admin','airline']), async (req, res) => {
//   try {
//     // Check cache first
//     const cached = await redis.get('analytics:cache');
//     if (cached) {
//       return res.json(JSON.parse(cached));
//     }

//     const now = new Date();
//     const todayStart = new Date(); 
//     todayStart.setHours(0, 0, 0, 0);
//     const todayEnd = new Date(); 
//     todayEnd.setHours(23, 59, 59, 999);

//     // Get date ranges for trends
//     const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//     const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//     // === FLIGHT ANALYTICS ===
    
//     // Today's flight counts
//     const totalFlightsToday = await Flight.countDocuments({ 
//       createdAt: { $gte: todayStart, $lte: todayEnd } 
//     });

//     // Flight status breakdown (for pie charts)
//     const flightStatusCounts = await Flight.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: todayStart, $lte: todayEnd }
//         }
//       },
//       {
//         $group: {
//           _id: '$status',
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     // Convert to object for easier frontend access
//     const statusMap = {};
//     flightStatusCounts.forEach(item => {
//       statusMap[item._id || 'Scheduled'] = item.count;
//     });

//     const onTimeFlights = statusMap['On Time'] || 0;
//     const delayedFlights = statusMap['Delayed'] || 0;
//     const cancelledFlights = statusMap['Cancelled'] || 0;
//     const boardingFlights = statusMap['Boarding'] || 0;

//     // Calculate on-time rate
//     const onTimeRate = totalFlightsToday > 0 ? 
//       Math.round((onTimeFlights / totalFlightsToday) * 100) : 0;

//     // Average delay calculation
//     const delayedFlightsList = await Flight.find({
//       status: 'Delayed',
//       createdAt: { $gte: todayStart, $lte: todayEnd }
//     });

//     let totalDelayMinutes = 0;
//     if (delayedFlightsList.length > 0) {
//       delayedFlightsList.forEach(flight => {
//         if (flight.scheduledDep && flight.delayedAt) {
//           const delay = Math.abs(new Date(flight.scheduledDep) - new Date(flight.delayedAt));
//           totalDelayMinutes += Math.round(delay / (1000 * 60));
//         }
//       });
//     }
//     const averageDelay = delayedFlights > 0 ? 
//       Math.round(totalDelayMinutes / delayedFlights) : 0;

//     // === BAGGAGE ANALYTICS ===
    
//     const totalBaggageProcessed = await Baggage.countDocuments({ 
//       updatedAt: { $gte: todayStart, $lte: todayEnd }, 
//       status: { $in: ['loaded', 'unloaded', 'atBelt'] } 
//     });

//     // Baggage status breakdown
//     const baggageStatusCounts = await Baggage.aggregate([
//       {
//         $match: {
//           updatedAt: { $gte: todayStart, $lte: todayEnd }
//         }
//       },
//       {
//         $group: {
//           _id: '$status',
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     const baggageMap = {};
//     baggageStatusCounts.forEach(item => {
//       baggageMap[item._id] = item.count;
//     });

//     const baggageProcessed = (baggageMap['loaded'] || 0) + 
//                             (baggageMap['unloaded'] || 0) + 
//                             (baggageMap['atBelt'] || 0);
//     const baggagePending = baggageMap['pending'] || baggageMap['checking'] || 0;
//     const baggageLost = baggageMap['lost'] || baggageMap['delayed'] || 0;

//     // === HOURLY FLIGHT DATA (for bar chart) ===
    
//     const hourlyData = await Flight.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: todayStart, $lte: todayEnd }
//         }
//       },
//       {
//         $project: {
//           hour: { $hour: '$createdAt' },
//           status: 1
//         }
//       },
//       {
//         $group: {
//           _id: '$hour',
//           totalFlights: { $sum: 1 },
//           delays: {
//             $sum: {
//               $cond: [{ $eq: ['$status', 'Delayed'] }, 1, 0]
//             }
//           }
//         }
//       },
//       {
//         $sort: { _id: 1 }
//       }
//     ]);

//     // Format hourly data for frontend
//     const hourlyFlights = [
//       { hour: '6AM', flights: 0, delays: 0 },
//       { hour: '9AM', flights: 0, delays: 0 },
//       { hour: '12PM', flights: 0, delays: 0 },
//       { hour: '3PM', flights: 0, delays: 0 },
//       { hour: '6PM', flights: 0, delays: 0 },
//       { hour: '9PM', flights: 0, delays: 0 }
//     ];

//     // Map database results to hourly slots
//     hourlyData.forEach(item => {
//       const hour = item._id;
//       let slotIndex = -1;
      
//       if (hour >= 6 && hour < 9) slotIndex = 0;        // 6-9 AM
//       else if (hour >= 9 && hour < 12) slotIndex = 1;  // 9-12 PM
//       else if (hour >= 12 && hour < 15) slotIndex = 2; // 12-3 PM
//       else if (hour >= 15 && hour < 18) slotIndex = 3; // 3-6 PM
//       else if (hour >= 18 && hour < 21) slotIndex = 4; // 6-9 PM
//       else if (hour >= 21 || hour < 6) slotIndex = 5;  // 9 PM - 6 AM
      
//       if (slotIndex >= 0) {
//         hourlyFlights[slotIndex].flights += item.totalFlights;
//         hourlyFlights[slotIndex].delays += item.delays;
//       }
//     });

//     // === DAILY TRENDS (for area chart) ===
    
//     const dailyTrends = await Flight.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: weekAgo }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: '$createdAt' },
//             month: { $month: '$createdAt' },
//             day: { $dayOfMonth: '$createdAt' },
//             dayOfWeek: { $dayOfWeek: '$createdAt' }
//           },
//           flights: { $sum: 1 },
//           delays: {
//             $sum: {
//               $cond: [{ $eq: ['$status', 'Delayed'] }, 1, 0]
//             }
//           }
//         }
//       },
//       {
//         $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
//       }
//     ]);

//     // Get baggage trends
//     const baggageTrends = await Baggage.aggregate([
//       {
//         $match: {
//           updatedAt: { $gte: weekAgo }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: '$updatedAt' },
//             month: { $month: '$updatedAt' },
//             day: { $dayOfMonth: '$updatedAt' }
//           },
//           baggage: { $sum: 1 }
//         }
//       }
//     ]);

//     // Format for frontend (last 7 days)
//     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const last7Days = [];
    
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
//       const dayName = dayNames[date.getDay()];
      
//       // Find matching data
//       const flightData = dailyTrends.find(item => 
//         item._id.year === date.getFullYear() &&
//         item._id.month === date.getMonth() + 1 &&
//         item._id.day === date.getDate()
//       );
      
//       const baggageData = baggageTrends.find(item =>
//         item._id.year === date.getFullYear() &&
//         item._id.month === date.getMonth() + 1 &&
//         item._id.day === date.getDate()
//       );
      
//       last7Days.push({
//         day: dayName,
//         flights: flightData ? flightData.flights : 0,
//         delays: flightData ? flightData.delays : 0,
//         baggage: baggageData ? Math.floor(baggageData.baggage / 100) : 0 // Scale down for chart
//       });
//     }

//     // === TREND CALCULATIONS ===
    
//     // Compare with previous periods for trend indicators
//     const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
//     const yesterdayEnd = new Date(todayEnd.getTime() - 24 * 60 * 60 * 1000);
    
//     const yesterdayFlights = await Flight.countDocuments({
//       createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd }
//     });
    
//     const yesterdayBaggage = await Baggage.countDocuments({
//       updatedAt: { $gte: yesterdayStart, $lte: yesterdayEnd },
//       status: { $in: ['loaded', 'unloaded', 'atBelt'] }
//     });
    
//     const flightsTrend = yesterdayFlights > 0 ? 
//       Math.round(((totalFlightsToday - yesterdayFlights) / yesterdayFlights) * 100) : 0;
    
//     const baggageTrend = yesterdayBaggage > 0 ? 
//       Math.round(((totalBaggageProcessed - yesterdayBaggage) / yesterdayBaggage) * 100) : 0;

//     // Compile analytics response
//     const analytics = {
//       // Main metrics
//       totalFlightsToday,
//       totalBaggageProcessed,
//       averageDelay,
//       onTimeRate,
      
//       // Flight status breakdown
//       onTimeFlights,
//       delayedFlights,
//       cancelledFlights,
//       boardingFlights,
      
//       // Baggage breakdown
//       baggageProcessed,
//       baggagePending,
//       baggageLost,
      
//       // Chart data
//       hourlyFlights,
//       dailyTrends: last7Days,
      
//       // Trend indicators
//       flightsTrend,
//       baggageTrend,
//       delayTrend: Math.round(Math.random() * 10 - 5), // You can calculate actual delay trend
//       onTimeRateTrend: Math.round(Math.random() * 10 - 5), // You can calculate actual trend
      
//       // Meta info
//       lastUpdated: new Date(),
//       totalFlights: await Flight.countDocuments(),
//       cacheExpiry: 300 // 5 minutes
//     };

//     // Cache for 5 minutes
//     await redis.set('analytics:cache', JSON.stringify(analytics), { EX: 300 });

//     res.json(analytics);
    
//   } catch (error) {
//     console.error('Error fetching analytics:', error);
//     res.status(500).json({ 
//       error: 'Failed to fetch analytics data',
//       details: error.message 
//     });
//   }
// });

// // Get flight list for operations
// router.get('/flights', authRequired(['admin','airline']), async (req, res) => {
//   try {
//     const { page = 1, limit = 50, status, search } = req.query;
    
//     let query = {};
    
//     // Filter by status if provided
//     if (status && status !== 'all') {
//       query.status = status;
//     }
    
//     // Search by flight number, origin, or destination
//     if (search) {
//       query.$or = [
//         { flightNo: { $regex: search, $options: 'i' } },
//         { origin: { $regex: search, $options: 'i' } },
//         { destination: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     const flights = await Flight.find(query)
//       .sort({ createdAt: -1 })
//       .limit(parseInt(limit))
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .select('flightNo origin destination status gate terminal scheduledDep scheduledArr delayReason');
    
//     const total = await Flight.countDocuments(query);
    
//     res.json({
//       data: flights,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / parseInt(limit))
//       }
//     });
    
//   } catch (error) {
//     console.error('Error fetching flights:', error);
//     res.status(500).json({ error: 'Failed to fetch flights' });
//   }
// });

// // Clear analytics cache (for admin use)
// router.delete('/analytics/cache', authRequired(['admin']), async (req, res) => {
//   try {
//     await redis.del('analytics:cache');
//     res.json({ message: 'Analytics cache cleared successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to clear cache' });
//   }
// });

// export default router;
import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import Flight from "../models/Flight.js";
import Baggage from "../models/Baggage.js";
import { producer } from "../config/kafka.js";
import { redis } from "../config/redis.js";

const router = Router();

/**
 * Delay notification
 */
router.post(
  "/flights/:id/delay",
  authRequired(["admin", "airline"]),
  async (req, res) => {
    const { id } = req.params;
    const { reason, newTime } = req.body;

    try {
      const f = await Flight.findByIdAndUpdate(
        id,
        {
          status: "Delayed",
          actualDep: newTime || undefined, // ✅ keep scheduledDep intact
          delayReason: reason,
          delayedAt: new Date(),
        },
        { new: true }
      );

      if (!f) return res.status(404).json({ error: "Flight not found" });

      // Kafka event
      await producer.send({
        topic: "flight-events",
        messages: [
          {
            key: f.flightNo,
            value: JSON.stringify({
              type: "flight",
              subtype: "delayed",
              flightId: f._id,
              flightNo: f.flightNo,
              payload: { reason, newTime, timestamp: new Date() },
            }),
          },
        ],
      });

      // Redis cache
      await redis.set(
        `flight:${f._id}:status`,
        JSON.stringify({
          flightNo: f.flightNo,
          gate: f.gate,
          status: f.status,
          scheduledDep: f.scheduledDep,
          actualDep: f.actualDep,
          scheduledArr: f.scheduledArr,
          delayReason: reason,
          lastUpdated: new Date(),
        }),
        { EX: 3600 }
      );

      // Invalidate analytics cache
      await redis.del("analytics:cache");

      res.json({
        message: "Delay notification sent successfully",
        flight: {
          id: f._id,
          flightNo: f.flightNo,
          status: f.status,
          newDepartureTime: newTime,
        },
      });
    } catch (error) {
      console.error("Error processing delay notification:", error);
      res.status(500).json({ error: "Failed to process delay notification" });
    }
  }
);

/**
 * Analytics dashboard
 */
router.get(
  "/analytics",
  authRequired(["admin", "airline"]),
  async (req, res) => {
    try {
      const cached = await redis.get("analytics:cache");
      if (cached) return res.json(JSON.parse(cached));

      const now = new Date();
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // === Flight analytics ===
      const totalFlightsToday = await Flight.countDocuments({
        createdAt: { $gte: todayStart, $lte: todayEnd },
      });

      const flightStatusCounts = await Flight.aggregate([
        { $match: { createdAt: { $gte: todayStart, $lte: todayEnd } } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]);

      const statusMap = {};
      flightStatusCounts.forEach((item) => {
        statusMap[item._id || "Scheduled"] = item.count;
      });

      const onTimeFlights = statusMap["On Time"] || 0;
      const delayedFlights = statusMap["Delayed"] || 0;
      const cancelledFlights = statusMap["Cancelled"] || 0;
      const boardingFlights = statusMap["Boarding"] || 0;

      const onTimeRate =
        totalFlightsToday > 0
          ? Math.round((onTimeFlights / totalFlightsToday) * 100)
          : 0;

      // Average delay
      const delayedFlightsList = await Flight.find({
        status: "Delayed",
        createdAt: { $gte: todayStart, $lte: todayEnd },
      });

      let totalDelayMinutes = 0;
      delayedFlightsList.forEach((flight) => {
        if (flight.scheduledDep && flight.actualDep) {
          const delay =
            (new Date(flight.actualDep) - new Date(flight.scheduledDep)) /
            (1000 * 60);
          if (!isNaN(delay)) totalDelayMinutes += delay;
        }
      });

      const averageDelay =
        delayedFlights > 0
          ? Math.round(totalDelayMinutes / delayedFlights)
          : 0;

      // === Baggage analytics ===
      const baggageStatusCounts = await Baggage.aggregate([
        { $match: { updatedAt: { $gte: todayStart, $lte: todayEnd } } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]);

      const baggageMap = {};
      baggageStatusCounts.forEach((item) => {
        baggageMap[item._id] = item.count;
      });

      const baggageProcessed =
        (baggageMap["loaded"] || 0) +
        (baggageMap["unloaded"] || 0) +
        (baggageMap["atBelt"] || 0);

      const baggagePending =
        (baggageMap["checkin"] || 0) + (baggageMap["inTransit"] || 0);

      const baggageLost = baggageMap["lost"] || 0;

      // === Hourly flight data ===
      const hourlyData = await Flight.aggregate([
        { $match: { createdAt: { $gte: todayStart, $lte: todayEnd } } },
        {
          $project: { hour: { $hour: "$createdAt" }, status: 1 },
        },
        {
          $group: {
            _id: "$hour",
            totalFlights: { $sum: 1 },
            delays: {
              $sum: { $cond: [{ $eq: ["$status", "Delayed"] }, 1, 0] },
            },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const hourlyFlights = [
        { hour: "6AM", flights: 0, delays: 0 },
        { hour: "9AM", flights: 0, delays: 0 },
        { hour: "12PM", flights: 0, delays: 0 },
        { hour: "3PM", flights: 0, delays: 0 },
        { hour: "6PM", flights: 0, delays: 0 },
        { hour: "9PM", flights: 0, delays: 0 },
      ];

      hourlyData.forEach((item) => {
        const hour = item._id;
        let slotIndex = -1;
        if (hour >= 6 && hour < 9) slotIndex = 0;
        else if (hour >= 9 && hour < 12) slotIndex = 1;
        else if (hour >= 12 && hour < 15) slotIndex = 2;
        else if (hour >= 15 && hour < 18) slotIndex = 3;
        else if (hour >= 18 && hour < 21) slotIndex = 4;
        else if (hour >= 21 || hour < 6) slotIndex = 5;

        if (slotIndex >= 0) {
          hourlyFlights[slotIndex].flights += item.totalFlights;
          hourlyFlights[slotIndex].delays += item.delays;
        }
      });

      // === Daily trends (last 7 days) ===
      const dailyTrendsRaw = await Flight.aggregate([
        { $match: { createdAt: { $gte: weekAgo } } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            flights: { $sum: 1 },
            delays: {
              $sum: { $cond: [{ $eq: ["$status", "Delayed"] }, 1, 0] },
            },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
      ]);

      const baggageTrendsRaw = await Baggage.aggregate([
        { $match: { updatedAt: { $gte: weekAgo } } },
        {
          $group: {
            _id: {
              year: { $year: "$updatedAt" },
              month: { $month: "$updatedAt" },
              day: { $dayOfMonth: "$updatedAt" },
            },
            baggage: { $sum: 1 },
          },
        },
      ]);

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const last7Days = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dayName = dayNames[date.getDay()];

        const fData = dailyTrendsRaw.find(
          (d) =>
            d._id.year === date.getFullYear() &&
            d._id.month === date.getMonth() + 1 &&
            d._id.day === date.getDate()
        );
        const bData = baggageTrendsRaw.find(
          (d) =>
            d._id.year === date.getFullYear() &&
            d._id.month === date.getMonth() + 1 &&
            d._id.day === date.getDate()
        );

        last7Days.push({
          day: dayName,
          flights: fData ? fData.flights : 0,
          delays: fData ? fData.delays : 0,
          baggage: bData ? Math.floor(bData.baggage / 100) : 0,
        });
      }

      const analytics = {
        totalFlightsToday,
        onTimeFlights,
        delayedFlights,
        cancelledFlights,
        boardingFlights,
        averageDelay,
        onTimeRate,

        baggageProcessed,
        baggagePending,
        baggageLost,

        hourlyFlights,
        dailyTrends: last7Days,

        lastUpdated: new Date(),
      };

      await redis.set("analytics:cache", JSON.stringify(analytics), {
        EX: 300,
      });

      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  }
);

/**
 * Flight list
 */
router.get(
  "/flights",
  authRequired(["admin", "airline"]),
  async (req, res) => {
    try {
      const { page = 1, limit = 50, status, search } = req.query;

      let query = {};
      if (status && status !== "all") query.status = status;
      if (search) {
        query.$or = [
          { flightNo: { $regex: search, $options: "i" } },
          { origin: { $regex: search, $options: "i" } },
          { destination: { $regex: search, $options: "i" } },
        ];
      }

      const flights = await Flight.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .select(
          "flightNo origin destination status gate terminal scheduledDep scheduledArr actualDep delayReason"
        );

      const total = await Flight.countDocuments(query);

      res.json({
        data: flights,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error) {
      console.error("Error fetching flights:", error);
      res.status(500).json({ error: "Failed to fetch flights" });
    }
  }
);

/**
 * Clear analytics cache
 */
router.delete(
  "/analytics/cache",
  authRequired(["admin"]),
  async (req, res) => {
    try {
      await redis.del("analytics:cache");
      res.json({ message: "Analytics cache cleared" });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cache" });
    }
  }
);

export default router;
