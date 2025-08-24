// src/pages/BaggageTracker.jsx
import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { getBaggageByTag } from "../api/baggage";
import { toast } from "react-toastify";

export default function BaggageTracker() {
  const [tagId, setTagId] = useState("");
  const [bag, setBag] = useState(null);

  const onSearch = async () => {
    if (!tagId.trim()) {
      toast.error("Enter a Tag ID");
      return;
    }
    try {
      const res = await getBaggageByTag(tagId.trim()); // requires auth as per backend
      setBag(res.data);
      toast.success("Baggage found");
    } catch (e) {
      setBag(null);
      toast.error(e.response?.data?.error || "Baggage not found");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Track Your Baggage
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Enter Tag ID"
            value={tagId}
            onChange={(e) => setTagId(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={onSearch}>
            Search
          </Button>
        </Box>

        {bag && (
          <Card sx={{ mt: 4, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Baggage Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>Tag ID: {bag.tagId}</Typography>
              <Typography>Flight: {bag.flightId?.flightNo || "-"}</Typography>
              <Typography>Status: {bag.status}</Typography>
              <Typography>
                Weight: {bag.weight !== undefined ? `${bag.weight} kg` : "-"}
              </Typography>
              <Typography>Last Location: {bag.lastLocation || "-"}</Typography>
              <Typography sx={{ mt: 1 }} color="text.secondary">
                Updated:{" "}
                {bag.updatedAt ? new Date(bag.updatedAt).toLocaleString() : "-"}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
}
