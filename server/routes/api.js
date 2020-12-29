const express = require('express')
const router = express.Router()
const TransactionModel = require('../model/TransactionModel')

router.get('/transactions', async function(req, res) {
    try {
        const data = await TransactionModel.find({}).sort('-date')
        res.send(data)
    } catch {
        res.send('error')
    }
})

router.post('/transaction', async function(req, res) {
    try {
        const toSave = {...req.body,
        vendor: req.body.vendor[0].toUpperCase()+req.body.vendor.slice(1),
        category: req.body.category[0].toUpperCase()+req.body.category.slice(1)}
        const newTransaction = new TransactionModel(toSave)
        await newTransaction.save()
        const data = await TransactionModel.find({}).sort('-date')
        res.send(data)
    } catch {
        res.send('error')
    }
})

router.delete('/transaction', async function(req, res) {
    try {
        const id = req.body.id
        await TransactionModel.findByIdAndDelete(id)
        const data = await TransactionModel.find({}).sort('-date')
        res.send(data)
    } catch {
        res.send('error')
    }
})

module.exports = router