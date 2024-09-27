import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  eventoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento', required: true },
  fechaVenta: { type: Date, default: Date.now },
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true }
});

// Crea el modelo para la colección 'ventas'
const Venta = mongoose.model('Venta', ventaSchema, 'ventas');

export default Venta;

