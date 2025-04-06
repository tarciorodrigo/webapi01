const { v4 } = require("uuid");
const fs = require("fs");
const FILE_PATH = require("path").join(__dirname, "users.json");

function findUsers() {
    try {
        return require("./users.json");        
    }
    catch(ex) {
        return [];
    }
}

function findUser(id) {
    return findUsers.find(item => item.id === id);
}

function insertUser(user) {
    const users = findUsers();
    user.id = v4();
    users.push(user);
    fs.writeFileSync(FILE_PATH, JSON.stringify(users));
    return user;
}

function updateUser(id, user) {
    global.users.forEach((item, index, array) => {
        if (item.id === id) {
            user.id = id;
            array[index] = user;
        }
    });

    return user;
}

function deleteUser(id) {
    return global.users.forEach((item, index, array) => {
        if (item.id === id)
            array.splice(index, 1);
    });
}

module.exports = {
    findUsers,
    findUser,
    insertUser,
    updateUser,
    deleteUser
}