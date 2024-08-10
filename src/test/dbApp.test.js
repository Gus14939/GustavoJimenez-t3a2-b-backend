const mongoose = require('mongoose');
const request = require('supertest');
const { dbApp } = require('../server'); // Import your Express app

// Set Mongoose timeout
mongoose.set('bufferTimeoutMS', 20000); // Adjust timeout to 20 seconds

// Before all tests, connect to the database
beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_LOCAL_URL);
});

// After all tests, close the database connection
afterAll(async () => {
    await mongoose.connection.close();
});


describe('Testing Planthora Backend', () => {

    // Test the root endpoint
    it('GET / should return Planthora is AAAALIVE!!', async () => {
        const response = await request(dbApp).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Planthora is AAAALIVE!!');
    });
    
});

describe('GET /profile/:id', () => {
    it('should return user profile by id', async () => {
        const validUserId = '66b707252f0f80c86a148c2c'; // Replace with an actual valid ID
        const response = await request(dbApp).get(`/profile/${validUserId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Viewing profile by id');
        expect(response.body.data).toHaveProperty('_id', validUserId);
    });

    it('should return 404 for non-existent user id', async () => {
        const invalidUserId = '';
        const response = await request(dbApp).get(`/profile/${invalidUserId}`);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', 'This URL path does not exist');
    });
});

// // Testing User Registration
describe('POST /profile/signup', () => {
    it('should create a new user', async () => {
        const newUser = {
            name: "John",
            lastname: "McClean",
            username: "johnnyCacti",
            email: "john.mc@email.com",
            password: "123456",
            address: { suburb: "Sydney", postcode: 2000 },
            favouritePlant: "Cactus"
        };

        const response = await request(dbApp).post('/profile/signup').send(newUser);

        // Debugging: log the response body to see what's returned
        console.log(response.body);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Creating profile');
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data).toHaveProperty('username', newUser.username);
        
        // Delete the created user to avoid conflict with unique: true
        const userId = response.body.data._id;
        const deleteResponse = await request(dbApp).delete(`/profile/${userId}`);
    });

    it('should return 400 for invalid data', async () => {
        const invalidUser = {
            name: "John"
            // Missing required fields on purpose
        };

        const response = await request(dbApp).post('/profile/signup').send(invalidUser);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('An error has occurred!');
    });
});

// Testing User Login
describe('POST /profile/login', () => {
    it('should log in an existing user', async () => {
        const credentials = {
            username: "Jakowhito",
            password: "123456"
        };

        const response = await request(dbApp).post('/profile/login').send(credentials);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Log in successful!');
    });

    it('should return 404 for non-existent user', async () => {
        const invalidCredentials = {
            username: "nonexistentuser",
            password: "password"
        };

        const response = await request(dbApp).post('/profile/login').send(invalidCredentials);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it('should return 401 for wrong password', async () => {
        const wrongPasswordCredentials = {
            username: "Jakowhito",
            password: "wrongpassword"
        };

        const response = await request(dbApp).post('/profile/login').send(wrongPasswordCredentials);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Wrong Password');
    });
});
