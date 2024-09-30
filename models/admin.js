import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Crea el modelo para la colección 'superadmin'
const Admin = mongoose.model('Admin', adminSchema, 'superadmin');

export default Admin;
