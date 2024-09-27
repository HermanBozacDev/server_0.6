import mongoose from 'mongoose';

const productorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Crea el modelo para la colección 'productores'
const Productor = mongoose.model('Productor', productorSchema, 'productores');

export default Productor;

