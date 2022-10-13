const express = require('express')
const Joi = require('joi');
const router = express.Router()

const {listContacts,getContactById,removeContact,addContact,updateContact} = require('../../models/contacts')

const { RequestError } = require('../.././helpers')


const schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    phone:Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw RequestError(404, `Not found contact ${contactId}`);
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
        if(error) {
            throw RequestError(400, error.message)
        }
        const result = await addContact(req.body);
        res.status(201).json(result)
    } catch (error) {
        next(error);
    }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw RequestError(404, `Not found contact ${contactId}`);
    }
    res.json({
      message: "delete success"
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, `Not found contact ${contactId}`);
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

module.exports = router;
