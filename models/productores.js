import mongoose from 'mongoose';

const productorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  contacto: { type: String, required: true },
  empresa: { type: String }
});

// Crea el modelo para la colección 'productores'
const Productor = mongoose.model('Productor', productorSchema, 'productores');

export default Productor;

