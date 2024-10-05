import asyncHandler from "express-async-handler";
import { Need } from "../models/need.model.js";
import { Supplier } from "../models/supplier.model.js";
import { Institute } from "../models/institute.model.js";
import { calculateDistance } from "../utils/minDistance.js";

export const fetchRequests = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const locSupplier = await Supplier.findById(id).populate("location");
  const { longitude, latitude } = locSupplier.location;

  const allInstitutes = await Institute.find().populate("location");

  const nearByInstitutes = allInstitutes.map((institute) => {
    const { latitude: supLat, longitude: supLon } = institute.location;
    const distance = calculateDistance(longitude, latitude, supLat, supLon);
    return { institute, distance };
  });

  console.log(nearByInstitutes);

  const instituteNeeds = await Need.find({ instituteId: institute.id })
    .select("items.name items.quantity items.isFullfilled")
    .lean();

  return res
    .status(200)
    .json({ message: "needs fetched successfully", instituteNeeds });
});

export const addBid = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { needId, itemName, price, deliveryTime } = req.body;

  const need = await Need.findById(needId);
  if (!need) {
    return res.status(404).json({ message: "Need not found" });
  }

  needs.bids = [
    ...{
      supplierId: id,
      name: itemName,
      price,
      deliveryTime,
    },
  ];

  await need.save();
});
