import { pool  } from '../db.js';


//Obtener todos los empleados
export const getEmployees = async (req, res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows);
        
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
};

//Obtener un solo empleado
export const getEmployee = async (req, res) => {

    try {
        //const id = req.params.id;
        const [ rows ] = await pool.query ('SELECT * FROM employee WHERE id = ?', [req.params.id]);
        if(rows.length <= 0) return res.status(404).json({ message: 'Employee not found'})
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
}


//Creando un empleado
export const createEmployee = async (req, res) => {

    try {
        const { name, salary } = req.body;
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary])
        //rest.send({rows})
        res.send({
         id: rows.insertId,
         name,
         salary
        })
        
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }

};

//Actualizar un empleado o un dato u otro o los dos
export const updateEmployee = async (req, res) => { 
    const { id } = req.params
    const { name, salary } = req.body  // es lo que se va a enviar x body

    try {
        const [ result ] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])
        //console.log(result)
        if(result.affectedRows === 0) return res.status(404).json({message: 'Employee not found'})
        const [rows] = await pool.query ('SELECT * FROM employee WHERE id = ?', [id])
        res.json(rows[0])
        
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
};


//Borrando un empleado
export const deleteEmployee = async (req, res) => {

    try {  
            const [ result ] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);
            if(result.affectedRows <= 0) return res.status(404).json({message: 'Employee not found'})
            res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({message: 'Something goes wrong'})
    }
};


