import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
  qrId: { type: String, required: true, unique: true },  // ID único para el QR
  email: { type: String, required: true },                // Email del cliente
  fechaHora: { type: Date, default: Date.now },          // Fecha y hora de la venta
  cantidad: { type: Number, required: true, min: 1 },    // Cantidad de entradas
  fechaConcierto: { type: Date, required: true },        // Fecha del concierto
  informacionPago: { type: Object, required: true },      // Información del pago de Mercado Pago
  title: { type: String, required: true },                // Título del ítem
  quantity: { type: Number, required: true, min: 1 },    // Cantidad de ítems
  unit_price: { type: Number, required: true },           // Precio unitario
  itemId: { type: String, required: true },               // ID del ítem
  description: { type: String, required: true }           // Descripción del ítem
});

// Crea el modelo para la colección 'ventas'
const Venta = mongoose.model('Venta', ventaSchema, 'ventas');

export default Venta;


