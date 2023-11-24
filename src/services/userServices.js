// userService.js
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data/users.js');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = {
    getUsers: () => {
        return users;
    },
    createUser : (user) => {
        user.id = users[users.length - 1].id + 1;
        users.push(user);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
    },
    getUserByEmail: (email) => {
        return users.find(user => user.email === email);
    },
    getUserById: (id) => {
        return users.find(user => user.id === id);
    },
    getUserByEmailAndPass : (email, password) => {
        return users.find(user => user.email === email && user.password === password);
    }
    
}
