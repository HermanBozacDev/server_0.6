import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  lugar: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  capacidad: { type: Number, required: true }
});

// Crea el modelo para la colección 'eventos'
const Evento = mongoose.model('Evento', eventoSchema, 'eventos');

export default Evento;

