const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6ded1ff223100cd6aa1';

describe('PUT /recipes/:id', () => {
  describe('quando é atualizado com sucesso', () => {
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

      const { insertedId } = await connectionMock
        .db('Cookmaster')
        .collection('recipes')
        .insertOne({
          name: 'admin',
          ingredients: 'admin',
          preparation: 'admin',
        });

      response = await chai
        .request(server)
        .put(`/recipes/${insertedId}`)
        .send({
          name: 'xablau',
          ingredients: 'xablau',
          preparation: 'xablau',
        })
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('a propriedade "name" retornado seja igual a "name', () => {
      expect(response.body.name).to.be.equal('xablau');
    });
  });

  describe('quando não há uma das informações da receita', () => {
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

      connectionMock.db('Cookmaster').collection('recipes').insertOne({
        _id: EXAMPLE_ID,
        name: 'admin',
        ingredients: 'admin',
        preparation: 'admin',
        userId: '61e8649d8c3f1682e0d76081',
      });

      response = await chai
        .request(server)
        .put(`/recipes/${EXAMPLE_ID}`)
        .send({
          ingredients: 'xablau',
          preparation: 'xablau',
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
