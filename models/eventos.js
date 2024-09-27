import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  descripcion: { type: String, required: true },
});

// Crea el modelo para la colección 'eventos'
const Evento = mongoose.model('Evento', eventoSchema, 'eventos');

export default Evento;

