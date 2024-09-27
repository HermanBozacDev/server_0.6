import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String }
});

// Crea el modelo para la colección 'clientes'
const Cliente = mongoose.model('Cliente', clienteSchema, 'clientes');

export default Cliente;

