import asyncHandler from "express-async-handler";
import { Need } from "../models/need.model.js";
import { Institute } from "../models/institute.model.js";
import { Supplier } from "../models/supplier.model.js";
import { Feedback } from "../models/feedback.model.js";
import {calculateDistance} from '../utils/minDistance.js'
import { sendEmailToSuppliers } from "../utils/SendMail.js";

export const raiseRequest = asyncHandler(async (req, res) => {
  const { id, type } = req.user;
  const { items } = req.body;

  if (type !== "institute") {
    return res
      .status(403)
      .json({ message: "Only institutes can raise requests" });
  }

  console.log(req.body);
  console.log("Req.user", req.user);

  const institute = await Institute.findById(id);
  console.log("Institute ", institute);

  if (!institute) {
    return res.status(404).json({ message: "Institute not found" });
  }

  const newItems = await Need.create({
    instituteId: institute._id,
    items: items,
  });

  res.status(201).json({ message: "Request raised successfully", newItems });

  const locInstitute = await Institute.findById(id).populate("location");
  const { longitude, latitude } = locInstitute.location;

  const allSuppliers = await Supplier.find().populate("location");
  const nearBySuppliers = allSuppliers.map((supplier) => {
    const { latitude: supLat, longitude: supLon } = supplier.location;
    const distance = calculateDistance(longitude, latitude, supLat, supLon);
    return { supplier, distance };
  });

  console.log(nearBySuppliers);
  const suppliers = await Supplier.find();
  const suppliersEmails = suppliers.map(supplier => supplier.email);
  console.log(suppliersEmails)
     await sendEmailToSuppliers(suppliersEmails, items)
  

});

export const getNeeds = asyncHandler(async (req, res) => {
  const { id, type } = req.user;

  const needs = await Need.find({ id })
    .select("items.name items.quanity items.isFullfilled")
    .lean();

  if (!needs) {
    return res.status(404).json({ message: "needs not found" });
  }

});

export const giveFeedback = asyncHandler(async (req, res) => {
  const { supplierId } = req.params;
  const { id } = req.user;
  const { feedback, rating } = req.body;

  const supplier = await Supplier.findById(supplierId);
  if (!supplier) {
    return res.status(404).json({ message: "Supplier not found" });
  }

  // create new feedback
  const newFeedback = await Feedback.create({
    instituteId: id,
    supplierId: supplier._id,
    feedback,
    rating,
  });

  if (!newFeedback) {
    return res.status(500).json({ message: "Error while adding feeback" });
  }

  // calculate new rating
  const feedbacks = await Feedback.find(supplier._id);

  const totalRating = feedbacks.reduce((acc, feedback) => {
    return acc + feedback.rating;
  });

  const updatedRating = totalRating / feedbacks.length;

  supplier.rating = updatedRating;
  supplier.save();
});
