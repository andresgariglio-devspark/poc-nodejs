##Requirements:
    - MongoDB https://www.mongodb.org/downloads#production
    - Node.js
    - NPM (should be configured on the system PATH variable)

##Commands to execute before start the application:
    - npm install

*Application will start on http://localhost:3000
    
##Grunt tasks:
    - To start the application: grunt
    - To clean and load the date: grunt loadData
    
##End points:
    - GET http://localhost:3000/api/movies/ #returns all the movies
    - GET http://localhost:3000/api/movies/:id #return a single movie by id
    - POST http://localhost:3000/api/movies #insert a movie. Remember to add the fields on the payload
    - PUT  http://localhost:3000/api/movies/:id #modifies a movie. Remember to add the fields on the payload
    - DELETE http://localhost:3000/api/movies/:id #Deletes a movie