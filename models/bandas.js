import mongoose from 'mongoose';

const bandaSchema = new mongoose.Schema({
  clasificacion: { type: String, required: true },         // Clasificación del evento (+18, etc.)
  description: { type: String, required: true },           // Descripción del evento
  dia: { type: String, required: true },                   // Día del evento
  fecha: { type: String, required: true },                 // Fecha del evento
  hora: { type: String, required: true },                  // Hora del evento
  image: { type: String, required: true },                 // URL de la imagen principal
  image2: { type: String },                                // URL de la segunda imagen (opcional)
  imageDetail: { type: String },                           // URL de la imagen detallada (opcional)
  lugar: { type: String, required: true },                 // Lugar del evento
  price: { type: Number, required: true },                 // Precio de la entrada
  quantity: { type: Number, required: true },              // Cantidad de entradas disponibles
  title: { type: String, required: true }                  // Título del evento
});

// Crea el modelo para la colección 'bandas'
const Banda = mongoose.model('Banda', bandaSchema, 'bandas');

export default Banda;
