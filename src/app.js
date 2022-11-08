import express from 'express';
import morgan from 'morgan';
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';


const app = express();

//tiene que estar antes de las rutas es muy importante
app.use(express.json());
app.use(morgan('tiny'));

//Routes

app.use('/api/', employeesRoutes);
app.use(indexRoutes);

// Sino encuentra esas rutas avisa ue no existe
app.use((req, res, next) => {
  res.status(404).json({ message: 'Enpoint not found' });
});

export default app;
