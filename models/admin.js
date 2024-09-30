import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['superadmin', 'producer'] } // Campo de rol sin default
});

// Crea el modelo para la colección 'superadmin'
const Admin = mongoose.model('Admin', adminSchema, 'superadmin');

export default Admin;
