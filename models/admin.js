import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true } // Definir role con un valor predeterminado
});

// Crea el modelo para la colección 'superadmin'
const Admin = mongoose.model('Admin', adminSchema, 'superadmin');

export default Admin;
