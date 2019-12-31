# Red Samurai

### Installation instructions
#### Install Node
Install Node.js using the instructions on [the Node web site](https://nodejs.org/en/)

#### Install dependencies
Clone this git repository into a local directory. From the root of the project, run `npm install`

### Running the server locally
From the root of the project, run `node index.js`

### Postman collection
The Postman collection found [here](https://www.getpostman.com/collections/2564ab728a1ecbb55e3d) can be used to call the API when it is running locally.

The API has the following endpoints:

`GET /agents`  Returns a list of all agents   
`GET /agents/:id` Returns details of the agent with the given ID  
`GET /agents/:id/customers`  Get all customers associated with the given agent. Returns customer name, city and address  
`POST /agents` Add new agent  
`POST /customers` Add new customer  
`PUT /agents/:id` Update agent  
`PUT /customers/:id` Update customer   
`DELETE /customers/:id` Delete customer  

### Assumptions and open questions for the business
See the text files in the repo containing [questions](./questions.txt) and [assumptions](./assumptions.txt) about the API functionality.
