const mongoose = require('mongoose');
const customer = require('./model/customer');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to db
const db = mongoose.connect('mongodb://localhost:27017/CLI');

// Import model
const Customer = require('./model/customer')

// Add Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.log('New customer created');
        db.close();
    });
}

// Find customer
const findCustomer = (name) => {
    // Make case insensitive
    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstname: search}, {lastname: search}]})
        .then(customer => {
            console.info(customer);
            console.info(`${customer.length} matches`)
            db.close();
        });
}

// Update Customer
const updateCustomer = (_id, customer) => {
    Customer.update({_id}, customer)
        .then(customer => {
            console.info('Customer updated')
            db.close();
        })
}

// Remove Customer
const removeCustomer = (_id) => {
    Customer.remove({_id})
        .then(customer => {
            console.info('Customer removed')
            db.close();
        })
}

// List customers
const listCustomers = () => {
    Customer.find()
        .then(customers => {
            console.info(customers)
            console.info(`${customer.length} customers`)
            db.close
        })
}

// Export all methods 
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}