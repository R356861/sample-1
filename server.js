const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// in-memory data store
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: '  bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];
let nextId = 4;
// utility function to find user by id
const findUserById = (id) => users.find(user => user.id ===parseInt(id));
// utility function to validate user index by id
const findUserIndexById = (id) => users.findIndex(user => user.id === parseInt(id));
//Routes
app.get('/users', (req, res) => {
    try{
        const {search,sort,order} = req.query;
        let filteredUsers = [...users];
        if(search){
            filteredUsers = filteredUsers.filter(user => 
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
            );
        }
        // Sort users
        if(sort){
           const sortOrder = (order || 'asc').toLowerCase();
              filteredUsers.sort((a,b) => {
                if(sortOrder === 'asc'){
                    return a[sort]>b[sort] ? 1 : -1;
                }
                else{
                    return a[sort]<b[sort] ? 1 : -1;
                }
            });
        }
        res.json({
            success: true,
            count: filteredUsers.length,
            data: filteredUsers
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
        });
app.get('/users/:id', (req, res) => {
    try{
        const user = findUserById(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            data: user
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });

    }
});
app.post('/users', (req, res) => {
    try{
        const {name,email} = req.body;
        if(!name || !email){
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }
        const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        const newUser = {
            id: nextId++,
            name,
            email,
            age:age||null
        };
        users.push(newUser);
        res.status(201).json({
            success: true,
            message:'user create successfully',
            data: newUser
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});
app.put('/users/:id', (req, res) => {
    try{
        const userIndex = findUserIndexById(req.params.id);
        if(userIndex === -1){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const {name,age,email} = req.body;
        if(!name || !email){
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }
        const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.id !== parseInt(req.params.id));
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        users[userIndex] = {
            ...users[userIndex],
            name,
            email,
            age:age||users[userIndex].age
        };
        res.json({
            success: true,
            message: 'User updated successfully',
            data: users[userIndex]
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});
app.delete('/users/:id', (req, res) => {
    try {
        const userIndex = findUserIndexById(req.params.id);
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
       const deletedUser = users.splice(userIndex, 1);
        res.json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});
 app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({  
        success: false,
        message: 'Something went wrong',
        error: err.message
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;