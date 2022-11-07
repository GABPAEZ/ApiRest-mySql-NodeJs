import { Router  } from "express";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee } from '../controllers/employees.controller.js';
const router = Router();

//aclaracion, put permiete actualizar todos los datos y envia nulos aquello que no ponemos, entonces conviene usar patch que podemos
//actualizar datos parciales pero persisten el resto
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployee);
router.post('/employees', createEmployee);
router.patch('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);



export default router;
