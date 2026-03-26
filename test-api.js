const axios = require('axios');
const baseURL = 'http://localhost:3000';
async function tesstEndpoints() {
    try{
        console.log('testing user mangement API!...\n');
        // Test GET /users
        let response = await axios.get(`${baseURL}/users`);
        console.log('GET /users response:', response.data);

        // Test GET /users with search
        response = await axios.get(`${baseURL}/users`, {params: {search: 'john'}});
        console.log('GET /users with search response:', response.data);
    } catch (error) {
        console.error('Error testing API endpoints:', error.message);


    }
}tesstEndpoints();
