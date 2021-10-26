'use strict'
import axios from 'axios';
import { utilService } from './util.service.js';
import { storageService } from './storage.service.js';

export const contactsService = {
    query,
    getById,
    getEmptyUser,
    save,
    deleteContact
}

const STORAGE_KEY = 'contactsDB'

async function query() {
    const QUANTITY_OF_CONTACTS = 35;
    let contacts = storageService.loadFromStorage(STORAGE_KEY)
    if (!contacts) {
        const res = await axios.get(`https://randomuser.me/api/?results=${QUANTITY_OF_CONTACTS}`)
        contacts = res.data.results.map(contact => (
            {
                _id: utilService.getRandomId(),
                name: `${contact.name.first} ${contact.name.last}`,
                email: contact.email,
                phone: contact.phone,
                avatar: contact.picture.large,
                location: `${contact.location.country}, ${contact.location.city}`,
                gender: contact.gender,
                age: contact.dob.age
            }
        ))
        storageService.storeToStorage(STORAGE_KEY, contacts)
    }
    return contacts
}

async function getById(contactId) {
    const contacts = await query()
    return contacts.find(contact => contact._id === contactId)
}

async function getEmptyUser() {
    const res = await axios.get(`https://randomuser.me/api/`)
    const dummyContact = res.data.results[0]
    const emptyContact = {
        name: '',
        email: '',
        phone: '',
        avatar: dummyContact.picture.large,
        location: `${dummyContact.location.country}, ${dummyContact.location.city}`
    }
    return emptyContact
}

async function save(contactToSave) {
    const contacts = await query()
    if (contactToSave._id) {
        const idx = contacts.findIndex(contact => contact._id === contactToSave._id)
        if (idx === -1) throw new Error('something went wrong');
        contacts[idx] = contactToSave
    } else {
        contactToSave._id = utilService.getRandomId(),
            contacts.push(contactToSave)
    }
    storageService.storeToStorage(STORAGE_KEY, contacts)
    return contactToSave
}

async function deleteContact(contactId) {
    let contacts = await query()
    contacts = contacts.filter(contact => contact._id !== contactId)
    storageService.storeToStorage(STORAGE_KEY, contacts)
    return contacts
}

