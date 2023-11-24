// userService.js
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const usersFilePath = path.join(__dirname, '../../data/users.js');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = {
    getUsers: () => {
        return users;
    },
    createUser : (user) => {
        user.id = users[users.length - 1].id + 1;
        user.password = bcrypt.hashSync(user.password, salt);
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
        const user = users.find(user => user.email === email);
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            }else{
                return undefined;
            }
        }else{
            return undefined;
        }
    }
    
}
