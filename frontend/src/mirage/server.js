import { createServer } from 'miragejs';

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = 'api';
      
       // -------------------------
      // Mocked Users DB (in memory)
      // -------------------------
      let users = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          password: '123456', // Plaintext for mock only (not for production!)
          role: 'patient'
        }
      ];

      // -------------------------
      // User Registration
      // -------------------------
      this.post('/user/register', (schema, request) => {
        const { name, email, password, role } = JSON.parse(request.requestBody);

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          return new Response(400, {}, { message: 'User already exists' });
        }

        const newUser = {
          id: String(users.length + 1),
          name,
          email,
          password,
          role: role || 'patient'
        };

        users.push(newUser);

        return {
          message: 'User registered successfully',
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
          },
          token: 'mock-jwt-token'
        };
      });

      // -------------------------
      // User Login
      // -------------------------
      this.post('/user/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
          return new Response(401, {}, { message: 'Invalid email or password' });
        }

        return {
          message: 'Login successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: 'mock-jwt-token'
        };
      });

      // Example authenticated profile route
      this.get('/user/profile', () => ({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        gender: 'Male',
      }));

      // Mock GET doctors
     this.get('/doctor/list', () => {
  return [
    {
      _id: '1',
      name: 'Dr. Ayesha Khan',
      speciality: 'Dermatologist',
      image: '/images/doctor1.jpg',
      available: true
    },
    {
      _id: '2',
      name: 'Dr. Aditya Raj',
      speciality: 'Neurologist',
      image: '/images/doctor2.jpg',
      available: false
    }
  ];
});
      // You can add more mocked endpoints here
    }
  });
}
