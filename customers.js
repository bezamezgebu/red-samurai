const fileUtilities = require('./fileUtilities')
const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(express.static('data'))

const agentsJsonFile = './data/agents.json'
const customersJsonFile = './data/customers.json'
router.use(bodyParser.json())

function checkAgentId (agentId) {
  const agentList = fileUtilities.readJsonObjectsFromFile(agentsJsonFile)
  var agentFound = false
  agentList.forEach(function (agent) {
    if (parseInt(agent._id) === parseInt(agentId)) {
      agentFound = true
    }
  })
  return agentFound
}

function createCustomer (requestBody) {
  var customer = {}
  customer._id = fileUtilities.generateId(customersJsonFile)
  customer.agent_id = requestBody.agent_id
  if (requestBody.guid) {
    customer.guid = requestBody.guid
  }
  if (requestBody.isActive) {
    customer.isActive = requestBody.isActive
  }
  if (requestBody.balance) {
    customer.balance = requestBody.balance
  }
  if (requestBody.age) {
    customer.age = requestBody.age
  }
  if (requestBody.eyeColor) {
    customer.eyeColor = requestBody.eyeColor
  }
  customer.name = {}
  if (requestBody.name && requestBody.name.first) {
    customer.name.first = requestBody.name.first
  }
  if (requestBody.name && requestBody.name.last) {
    customer.name.last = requestBody.name.last
  }
  if (requestBody.company) {
    customer.company = requestBody.company
  }
  if (requestBody.eyeColor) {
    customer.email = requestBody.email
  }
  if (requestBody.phone) {
    customer.phone = requestBody.phone
  }
  if (requestBody.address) {
    customer.address = requestBody.address
  }
  if (requestBody.registered) {
    customer.registered = requestBody.registered
  }
  if (requestBody.lattitude) {
    customer.lattitude = requestBody.lattitude
  }
  if (requestBody.longitude) {
    customer.longitude = requestBody.longitude
  }
  customer.tags = []
  if (requestBody.tags) {
    requestBody.tags.forEach(element => {
      customer.tags.push(element)
    })
  }
  return customer
}

router.post('/', (req, resp) => {
  console.log('Handling POST request /customers ....')

  if (!req.body.agent_id || req.body.agent_id === '' ||
      !req.body.name ||
      !req.body.name.first || req.body.name.first === '') {
    resp.status(400).json({ error: 'agent id and first name field is required.' })
    return
  }
  if (!checkAgentId(req.body.agent_id)) {
    resp.status(404).json({ error: 'agent id does not exist.' })
    return
  }
  var customer = createCustomer(req.body)
  console.log('created a new customer:')
  console.dir(customer)
  const customerList = fileUtilities.readJsonObjectsFromFile(customersJsonFile)

  customerList.push(customer)
  console.log('after new customer is added')
  console.dir(customerList)

  fileUtilities.writeJsonObjectsToFile(customerList, customersJsonFile)

  resp.header('Content-Type', 'application/json')
  resp.send(JSON.stringify(customer, null, 4))
})

router.get('/', (req, resp) => {
  console.log('Handling GET /customers request....')
  const customerList = fileUtilities.readJsonObjectsFromFile(customersJsonFile)
  console.dir(customerList)
  resp.header('Content-Type', 'application/json')
  resp.send(JSON.stringify(customerList, null, 4))
})

router.put('/:id', (req, resp) => {
  console.log('Handling PUT /customers/:id request....')

  if (!req.params.id || req.params.id === '') {
    resp.status(400).json({ error: 'ID field is required.' })
    return
  }

  const customerList = fileUtilities.readJsonObjectsFromFile(customersJsonFile)
  var updatedcustomerList = []
  const customerIdToUpdate = req.params.id
  var foundMatchingId = false
  customerList.forEach(function (customer) {
    if (parseInt(customer._id) === parseInt(customerIdToUpdate)) {
      foundMatchingId = true
      if (req.body.agent_id) {
        customer.agent_id = req.body.agent_id
      }
      if (req.body.guid) {
        customer.guid = req.body.guid
      }
      if (req.body.isActive) {
        customer.isActive = req.body.isActive
      }
      if (req.body.balance) {
        customer.balance = req.body.balance
      }
      if (req.body.age) {
        customer.age = req.body.age
      }
      if (req.body.eyeColor) {
        customer.eyeColor = req.body.eyeColor
      }
      if (req.body.name && req.body.name.first) {
        customer.name.first = req.body.name.first
      }
      if (req.body.name && req.body.name.last) {
        customer.name.last = req.body.name.last
      }
      if (req.body.company) {
        customer.company = req.body.company
      }
      if (req.body.eyeColor) {
        customer.email = req.body.email
      }
      if (req.body.phone) {
        customer.phone = req.body.phone
      }
      if (req.body.address) {
        customer.address = req.body.address
      }
      if (req.body.registered) {
        customer.registered = req.body.registered
      }
      if (req.body.lattitude) {
        customer.lattitude = req.body.lattitude
      }
      if (req.body.longitude) {
        customer.longitude = req.body.longitude
      }
      if (req.body.tags) {
        customer.tags = req.body.tags
      }
    }
    updatedcustomerList.push(customer)
  })
  if (!foundMatchingId) {
    resp.status(404).json({ error: 'No agent found with ID ' + customerIdToUpdate })
    return
  }
  fileUtilities.writeJsonObjectsToFile(updatedcustomerList, customersJsonFile)
  resp.status(200).json({ message: 'Customer ' + customerIdToUpdate + ' updated.' })
})

router.delete('/:id', (req, resp) => {
  console.log('Handling DELETE request...')
  const customerList = fileUtilities.readJsonObjectsFromFile(customersJsonFile)
  const customerIdToDelete = req.params.id
  var foundMatchingId = false
  let customerToDelete = null
  customerList.forEach(function (customer, index) {
    if (parseInt(customer._id) === parseInt(customerIdToDelete)) {
      foundMatchingId = true
      console.log('i have found the id to update ' + customerIdToDelete)
      customerToDelete = index
    }
  })

  if (!foundMatchingId) {
    resp.status(404).json({ error: 'No customer found with ID ' + customerIdToDelete })
    return
  }

  if (customerIdToDelete) {
    customerList.splice(customerToDelete)
  }

  fileUtilities.writeJsonObjectsToFile(customerList, customersJsonFile)
  resp.status(200).json({ message: 'Customer ' + customerIdToDelete + ' Deleted.' })
})

module.exports = router
