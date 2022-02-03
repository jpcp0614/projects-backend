const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /recipes', () => {
  describe('quando é possível consultar uma lista de receitas', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      connectionMock
        .db('Cookmaster')
        .collection('recipes')
        .insertMany([
          {
            _id: '61e88aa7152585d9a885f0bb',
            name: 'admin',
            ingredients: 'admin',
            preparation: 'admin',
            userId: '61e8649d8c3f1682e0d76081',
          },
          {
            _id: '61e88aa7152585d9a885f0bb',
            name: 'admin',
            ingredients: 'admin',
            preparation: 'admin',
            userId: '61e8649d8c3f1682e0d76081',
          },
        ]);

      response = await chai.request(server).get('/recipes');
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('array');
    });
  });
});
