# poc-nodejs
POC Rest API using nodejs and expressjs that allows you to create, update and retrieve Person objects stored in a MongoDB NoSQL database.

## Configuration
Default MongoDB config in app.js file:

```
mongoose.connect('mongodb://localhost:27017/poc');
```

## How to run
Install packages/dependencies: 
```
npm install
```

Run grunt, you should be able to visit the rest service at http://localhost:3000 and get an "OK" status.
```
grunt
```

## Rest API examples
GET
```
curl http://localhost:3000/persons
curl http://localhost:3000/persons/{ID}
```

POST
```
curl -i -X POST -H "Content-Type:application/json" -d '{  "firstName" : "Marty",  "lastName" : "McFly" }' http://localhost:3000/persons
```

PUT
```
curl -X PUT -H "Content-Type:application/json" -d '{ "firstName": "Emmett", "lastName": "Brown" }' http://localhost:3000/persons/{ID}
```

DELETE
```
curl -X DELETE http://localhost:3000/persons/{ID}
```
    
