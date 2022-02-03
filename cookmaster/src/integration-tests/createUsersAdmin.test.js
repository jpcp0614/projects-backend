const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6ded1ff223100cd6aa1';

describe('POST /users/admin', () => {
  describe('quando é criado com sucesso', () => {
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
        .post('/users/admin')
        .send({
          name: 'admin',
          email: 'admin@user.com',
          password: 'senha123',
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

    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "role" retornado seja igual a "user', () => {
      expect(response.body.user.role).to.be.equal('admin');
    });
  });

  describe('quando é criado com sucesso', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      connectionMock.db('Cookmaster').collection('users').insertOne({
        _id: EXAMPLE_ID,
        name: 'user',
        email: 'user@user.com',
        password: 'senha123',
        role: 'user',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'senha123',
        })
        .then((res) => res.body.token);

      response = await chai
        .request(server)
        .post('/users/admin')
        .send({
          name: 'example',
          email: 'examplo@example.com',
          password: 'senha123',
        })
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 403', () => {
      expect(response).to.have.status(403);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Only admins can register new admins"', () => {
      expect(response.body.message).to.be.equal(
        'Only admins can register new admins',
      );
    });
  });

  describe('quando não é passado um dos campos obrigatórios para cadastrar', () => {
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
        .post('/users/admin')
        .send({
          email: 'admin@user.com',
          password: 'senha123',
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

  describe('quando usuário já existe', () => {
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
        .post('/users/admin')
        .send({
          name: 'admin',
          email: 'admin@admin.com',
          password: 'senha123',
        })
        .set('authorization', token);

      response = await chai
        .request(server)
        .post('/users/admin')
        .send({
          name: 'admin',
          email: 'admin@admin.com',
          password: 'senha123',
        })
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
});
