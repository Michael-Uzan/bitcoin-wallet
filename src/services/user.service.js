import { asyncStorageService } from './async-storage.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUserDB'
const STORAGE_KEY_USERS = 'usersDB'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    addMove,
}

window.userService = userService


function getUsers() {
    return asyncStorageService.query(STORAGE_KEY_USERS)
}

async function getById(userId) {
    const user = await asyncStorageService.get(STORAGE_KEY_USERS, userId)
    return user;
}
function remove(userId) {
    return asyncStorageService.remove(STORAGE_KEY_USERS, userId)
}

async function update(user) {
    await asyncStorageService.put(STORAGE_KEY_USERS, user)
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function addMove(amount, contact = null) {
    const user = getLoggedinUser()
    if (contact) {
        user.moves.unshift({
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount,
        });
        user.coins -= amount
    } else {
        user.lotteryMoves.unshift({
            at: Date.now(),
            amount,
        });
        user.coins += amount
    }
    const updatedUser = await update(user)
    return updatedUser
}


async function login(userCred) {
    const users = await asyncStorageService.query(STORAGE_KEY_USERS)
    const user = users.find(user => {
        return ((user.password === userCred.password) && (user.email === userCred.email))
    })
    return _saveLocalUser(user)
}

async function signup(userCred) {
    userCred = _createDummyData(userCred)
    const user = await asyncStorageService.post(STORAGE_KEY_USERS, userCred)
    return _saveLocalUser(user)
}

function _createDummyData(userCred) {
    userCred.coins = 100;
    userCred.moves = [
        {
            toId: 'dsfsf4th54yh67i45eghdf6',
            to: 'David Santana',
            at: (Date.now() - 20058965),
            amount: 0.4,
        },
        {
            toId: 'dsf809j3e4i5980g7i45eghdf6',
            to: 'Dj Ranji',
            at: (Date.now() - 53672365),
            amount: 0.28,
        }
    ];
    userCred.lotteryMoves = [
        { at: Date.now(), amount: 5 },
        { at: (Date.now() - 5000000), amount: -2 },
        { at: (Date.now() - 346200), amount: -3 }
    ]
    return userCred
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
    return user
}