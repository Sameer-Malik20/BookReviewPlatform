import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

const Admin = mongoose.model("User", AdminSchema);
export default Admin;
