import chai from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const expect = chai.expect

const requester = supertest('http://127.0.0.1:8080')

let sessionCookie


describe('API Tests', () => { 

    describe('Products ENDPOINT', () => {
        describe('Should return products with querys and pagination', async () => {

            it('GET of Products with querys', async () =>{
                try {
                    
                    const response = await requester.get('/api/products')
                      .query({ limit: 4, page: 1, query: 'your_search_query', sort: 'asc' });
              
                    expect(response.status).to.equal(200);
                    expect(response.body).to.have.property('status', 'success');
                    expect(response.body).to.have.property('payload');
              
                    const payload = response.body.payload;
                    expect(payload).to.have.property('products');
                    expect(payload.products).to.be.an('array');
                    if (response.body.payload.length > 0) {
                        expect(response.body.payload[0]).to.have.property('title');
                        expect(response.body.payload[0]).to.have.property('description');
                        expect(response.body.payload[0]).to.have.property('price');
                        expect(response.body.payload[0]).to.have.property('stock');
                        expect(response.body.payload[0]).to.have.property('category');
                        expect(response.body.payload[0]).to.have.property('thumbnail');
                        expect(response.body.payload[0]).to.have.property('id');
                    }
              
                  } catch (error) {
                    console.error(error);
                    throw error;
                  }
            
            });
        });

        describe('GET /api/products/:id', () => {
            it('should return a single product by ID', async () => {
              try {
                const product_id = '647a179ff5a778f8f5a34356';

                const response = await requester.get(`/api/products/${product_id}`);

                expect(response.status).to.equal(200);
          
                expect(response.body).to.have.property('status', 'success');
                expect(response.body).to.have.property('payload');
                expect(response.body.payload).to.have.property('title');
                expect(response.body.payload).to.have.property('description');
          
              } catch (error) {
                console.error(error);
                throw error;
              }
            });
          });

        //   describe('POST /api/products', () => {
        //     it('should add a new product', async () => {
        //       try {
        //         const newProduct = {
        //           title: 'New Product',
        //           description: 'Product Description',
        //           price: 19.99,
        //           thumbnail: 'product.jpg',
        //           code: 'ABC12asdaa3',
        //           stock: 10,
        //           category: 'Electronics',
        //           owner: 'admin',
        //         };
          
        //         const response = await requester.post('/api/products').send(newProduct);
          
        //         expect(response.status).to.equal(201);
          
        //         expect(response.body).to.have.property('status', 'success');
        //         expect(response.body).to.have.property('message', 'Added successfully');
        //         expect(response.body).to.have.property('payload');
        //         expect(response.body.payload).to.deep.equal(newProduct);
          
        //       } catch (error) {
        //         console.error(error);
        //         throw error;
        //       }
        //     });
        //   });

        //   describe('PUT /api/products/:id', () => {
        //     it('should update an existing product by ID', async () => {
        //       try {
        //         const product_id = '64f6614c1668437dc916b55a';
 
        //         const updatedProduct = {
        //           title: 'Updated Product',
        //           description: 'Updated Description',
        //           price: 29.99,
        //           thumbnail: 'updated.jpg',
        //           code: 'XYZ4asdaa56',
        //           stock: 20,
        //           category: 'Home & Garden'
        //         };
          
        //         const response = await requester.put(`/api/products/${product_id}`).send(updatedProduct);
          
        //         expect(response.status).to.equal(200);
          
        //         expect(response.body).to.have.property('status', 'success');
        //         expect(response.body).to.have.property('message', `The product with id: ${product_id} was updated successfully`);
        //         expect(response.body).to.have.property('payload');
        //         expect(response.body.payload).to.deep.equal(updatedProduct);
          
        //       } catch (error) {
        //         console.error(error);
        //         throw error;
        //       }
        //     });
        //   });

        //   describe('DELETE /api/products/:id', () => {
        //     it('should delete an existing product by ID', async () => {
        //       try {
        //         const product_id = '64f661271668437dc916b554';
          
        //         const response = await requester.delete(`/api/products/${product_id}`);
          
        //         expect(response.status).to.equal(200);
          
        //         expect(response.body).to.have.property('status', 'success');
        //         expect(response.body).to.have.property('message', `The product with id: ${product_id} was deleted successfully`);
        //         expect(response.body).to.have.property('payload');
          
        //       } catch (error) {
        //         console.error(error);
        //         throw error;
        //       }
        //     });
        //   });


        });

    describe('Carts ENDPOINT', () => {
        
        beforeEach(async () => {
            // Antes de cada prueba, puedes establecer un estado inicial o crear registros de carritos si es necesario
          });
        
          afterEach(async () => {
            // Después de cada prueba, puedes limpiar o eliminar registros de carritos si es necesario
          });
        
          describe('GET /api/carts', () => {
            it('should return a list of carts', async () => {
              const response = await requester.get('/api/carts');
              expect(response.status).to.equal(200);
              expect(response.body).to.have.property('status', 'success');
              expect(response.body).to.have.property('payload');
              expect(response.body.payload).to.be.an('array');
            });
          });
        
        //   describe('POST /api/carts', () => {
        //     it('should create a new cart', async () => {
        //       const response = await requester.post('/api/carts');
        //       expect(response.status).to.equal(201);
        //       expect(response.body).to.have.property('status', 'success');
        //       expect(response.body).to.have.property('message', 'Cart created successfully');
        //       expect(response.body).to.have.property('payload');
 
        //     });
        //   });
        
          describe('GET /api/carts/:id', () => {
            it('should return a single cart by ID', async () => {
              const cartId = '6501c581d0dcf039cf6bd081';
              const response = await requester.get(`/api/carts/${cartId}`);
              expect(response.status).to.equal(200);
              expect(response.body).to.have.property('status', 'success');
              expect(response.body).to.have.property('payload');
            });
          });

    })

    describe('API Tests', () => { 
        describe('Session ENDPOINT', () => {
            const mockUser = {
                firstName: 'TEST', 
                lastName: 'SUPERTEST',
                email: faker.internet.email(),
                password: 'asd123',
                rol: 'user', 
                cart: 'cartId', 
            };
        
            it('should register an user', async () => {
                const response = await requester.post('/session/register').send(mockUser);
                expect(response.status).to.equal(302);
            });
    
            it('Should login an user and return a cookie', async () => {
                const response = await requester.post('/session/login').send({
                    email: mockUser.email,
                    password: mockUser.password,
                });
            
                expect([200, 302]).to.include(response.status);
            
                if (response.status === 302 || response.status === 200) {
                    const redirectLocation = response.headers.location;
                    const cookieMatch = redirectLocation.match(/coderCookie=([^;]+)/);
                    if (cookieMatch && cookieMatch.length > 1) {
                        sessionCookie = cookieMatch[1]; // Asigna la cookie a sessionCookie
                    }
                    expect(redirectLocation).to.equal('/session/profile');
                }
            });
            
            // it('Send a cookie to see user content', async () => {
            //     expect(sessionCookie).to.be.ok; // Verifica que sessionCookie esté definido
            
            //     const response = await requester.get('/session/current').set('Cookie', `coderCookie=${sessionCookie}`);
            
            //     expect([200, 401]).to.include(response.status);
            
            //     if (response.status === 200) {
            //         expect(response.body.user.email).to.be.eql(mockUser.email);
            //     }
            // });
        });
    });
})
