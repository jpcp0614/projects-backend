const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6ded1ff223100cd6aa1';

describe('DELETE /recipes/:id', () => {
  describe('quando tenta deleta uma receita que não existe', () => {
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
        .delete(`/recipes/${EXAMPLE_ID}`)
        .set('authorization', token);
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

  describe('quando é deletado com sucesso', () => {
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
          name: 'xablau',
          ingredients: 'xablau',
          preparation: 'xablau',
        });

      response = await chai
        .request(server)
        .delete(`/recipes/${insertedId}`)
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 204', async () => {
      expect(response).to.have.status(204);
    });

    it('que o body seja vazio sem retorno', async () => {
      expect(response.body).to.be.empty;
    });
  });
});
