const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6ded1ff223100cd6aa1';

describe('GET /recipes/:id', () => {
  describe('quando é não possível consultar uma receita sem o id correto', () => {
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

      response = await chai.request(server).get(`/recipes/${EXAMPLE_ID}`);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "recipe not found"', () => {
      expect(response.body.message).to.be.equal('recipe not found');
    });
  });

  describe('Quando a receita é encontrada com sucesso', () => {
    let response;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock
        .db('Cookmaster')
        .collection('recipes')
        .insertOne({
          name: 'admin',
          ingredients: 'admin',
          preparation: 'admin',
        });

      response = await chai.request(server).get(`/recipes/${insertedId}`);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('que tenha a propriedade _id', () => {
      expect(response.body).to.have.a.property('_id');
    });
  });
});
