import mongoose from 'mongoose';

// URL de conexión a MongoDB
const uri = 'mongodb://localhost:27017/imperioticket';

// Opciones de conexión (asegurándote de que no haya advertencias de uso de opciones deprecadas)
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Puedes agregar otras opciones como `useCreateIndex`, `useFindAndModify`, etc., si es necesario
};

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('Conectado a la base de datos MongoDB: imperioticket');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1); // Terminar la aplicación si hay un error
  }
};

// Exporta la función de conexión
export default connectDB;

