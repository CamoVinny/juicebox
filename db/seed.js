// grab our client with destructuring from the export in index.js
const { client, getAllUsers, createUser } = require('./index');

// this function should call a query which drops all tables from our database
async function dropTables() {
    try {
        console.log("starting to drop tables...")
      await client.query(`
        DROP TABLE IF EXISTS users;
      `);
      console.log("finished dropping tables!")
    } catch (error) {
        console.error("error dropping tables!")
      throw error; // we pass the error up to the function that calls dropTables
    }
  }
  
  // this function should call a query which creates all tables for our database 
  async function createTables() {
    try {
        console.log("starting to build tables...")
      await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL
            );
      `);
      console.log("finished building the tables!")
    } catch (error) {
        console.log("error building the tables!")
      throw error; // we pass the error up to the function that calls createTables
    }
  }
  
  async function createInitialUsers() {
    try {
      console.log("Starting to create users...");
  
      const albert = await createUser({ username: 'albert', password: 'bertie99' });
      const sandra = await createUser({ username: 'sandra', password: '2sandy4me' });
      const glamgal = await createUser({ username: 'glamgal', password: 'soglam' });
      
  
      console.log("Finished creating users!");
    } catch(error) {
      console.error("Error creating users!");
      throw error;
    }
  }
  
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      console.error(error);
    } 
  }
  async function testDB() {
    try {
        console.log("Starting to test database...");
    
        const users = await getAllUsers();
        console.log("getAllUsers:", users);
    
        console.log("Finished database tests!");
      } catch (error) {
        console.error("Error testing database!");
        throw error;
  }
  }
   rebuildDB()
        .then(testDB)
        .catch(console.error)
        .finally(() => client.end());
