const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../api/app');

const path = require('path');
const fs = require('fs');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6ded1ff223100cd6aa1';

describe('PUT /recipes/:id/image', () => {
  describe('quando é possivel fazer um upload de imagem', () => {
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
        .put(`/recipes/${insertedId}/image`)
        .set('authorization', token)
        .set('content-type', 'multipart/form-data')
        .attach(
          'image',
          fs.readFileSync(
            `${path.resolve(__dirname, '..', 'uploads')}/ratinho.jpg`,
          ),
          'file',
        );
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna a propriedade image', () => {
      expect(response.body).to.have.a.property('image');
    });
  });
});
