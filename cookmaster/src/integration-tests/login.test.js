const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /login', () => {
  describe('quando é criado com sucesso', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send({
        name: 'user',
        email: 'user@user.com',
        password: 'senha123',
      });

      response = await chai.request(server).post('/login').send({
        email: 'user@user.com',
        password: 'senha123',
      });
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

    it('o objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('quando não passa um dos campos obrigatórios', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send({
        name: 'user',
        email: 'user@user.com',
        password: 'senha123',
      });

      response = await chai.request(server).post('/login').send({
        password: 'senha123',
      });
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

    it('a propriedade "message" possui o texto "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('quando a inforamaçao para login é incorreta', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send({
        name: 'user',
        email: 'user@user.com',
        password: 'senha123',
      });

      response = await chai.request(server).post('/login').send({
        email: 'user@',
        password: 'senha123',
      });
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

    it('a propriedade "message" possui o texto "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal(
        'Incorrect username or password',
      );
    });
  });
});
