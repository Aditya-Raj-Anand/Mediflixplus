import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from "cloudinary";

// ---------------- REGISTER USER ----------------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ success: false, message: "Missing Details" });

    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Invalid email" });

    if (password.length < 8)
      return res.json({ success: false, message: "Password too short" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------- LOGIN USER ----------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------- GET PROFILE ----------------
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------- UPDATE PROFILE ----------------
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !dob || !gender)
      return res.json({ success: false, message: "Missing fields" });

    await userModel.findByIdAndUpdate(req.userId, {
      name,
      phone,
      dob,
      gender,
      address: JSON.parse(address),
    });

    if (imageFile) {
      const upload = await cloudinary.uploader.upload(imageFile.path);
      await userModel.findByIdAndUpdate(req.userId, {
        image: upload.secure_url,
      });
    }

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------- BOOK APPOINTMENT ----------------
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData?.available)
      return res.json({ success: false, message: "Doctor not available" });

    const slots = docData.slots_booked || {};
    if (slots[slotDate]?.includes(slotTime))
      return res.json({ success: false, message: "Slot already booked" });

    slots[slotDate] = slots[slotDate] || [];
    slots[slotDate].push(slotTime);

    const userData = await userModel.findById(req.userId).select("-password");

    const appointment = new appointmentModel({
      userId: req.userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    });

    await appointment.save();
    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slots });

    res.json({ success: true, message: "Appointment booked" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------- CANCEL APPOINTMENT ----------------
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment)
      return res.json({ success: false, message: "Not found" });

    if (appointment.userId.toString() !== req.userId)
      return res.json({ success: false, message: "Unauthorized" });

    appointment.cancelled = true;
    await appointment.save();

    const doc = await doctorModel.findById(appointment.docId);
    const slots = doc.slots_booked;
    slots[appointment.slotDate] = slots[appointment.slotDate].filter(
      (t) => t !== appointment.slotTime
    );

    await doctorModel.findByIdAndUpdate(doc._id, { slots_booked: slots });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------- LIST USER APPOINTMENTS ----------------
const listAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.userId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};
