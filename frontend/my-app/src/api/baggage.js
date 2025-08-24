// src/api/baggage.js
import api from "./axios";

// Create baggage
export const createBaggage = (data) => api.post("/baggage", data);

// Update baggage (accepts _id or tagId)
export const updateBaggage = (idOrTag, data) =>
  api.patch(`/baggage/${idOrTag}`, data);

// Get all baggage
export const getAllBaggage = () => api.get("/baggage");

// Get baggage by Mongo _id
export const getBaggageById = (id) => api.get(`/baggage/id/${id}`);

// Get baggage by tagId
export const getBaggageByTag = (tagId) => api.get(`/baggage/tag/${tagId}`);

// Get baggage by _id + tagId
export const getBaggageByIdAndTag = (id, tagId) =>
  api.get(`/baggage/${id}/${tagId}`);

// Delete baggage (by _id)
export const deleteBaggage = (id) => api.delete(`/baggage/${id}`);
