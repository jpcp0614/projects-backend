const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6ded1ff223100cd6aa1';

describe('POST /recipes', () => {
  describe('quando é possível cadastrar uma receita após login com token válido', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      connectionMock.db('Cookmaster').collection('users').insertOne({
        _id: EXAMPLE_ID,
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        role: 'admin',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'admin',
        })
        .then((res) => res.body.token);

      response = await chai
        .request(server)
        .post('/recipes')
        .send({
          name: 'example',
          ingredients: 'ingredients_examplo',
          preparation: 'preparation_example',
        })
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('a propriedade "name" retornado seja igual a "example"', () => {
      expect(response.body.recipe.name).to.be.equal('example');
    });
  });

  describe('quando não é possível cadastrar uma receita sem um token válido', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      connectionMock.db('Cookmaster').collection('users').insertOne({
        _id: EXAMPLE_ID,
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        role: 'admin',
      });

      const token = '';

      response = await chai
        .request(server)
        .post('/recipes')
        .send({
          name: 'example',
          ingredients: 'ingredients_examplo',
          preparation: 'preparation_example',
        })
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('quando não é possível cadastrar uma receita sem um dos campos obrigatórios', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      connectionMock.db('Cookmaster').collection('users').insertOne({
        _id: EXAMPLE_ID,
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        role: 'admin',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'admin',
        })
        .then((res) => res.body.token);

      response = await chai
        .request(server)
        .post('/recipes')
        .send({
          ingredients: 'ingredients_examplo',
          preparation: 'preparation_example',
        })
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});
