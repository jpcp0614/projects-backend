const sinon = require('sinon');
const { expect } = require('chai');

const ProductServices = require('../../services/productServices');
const ProductController = require('../../controllers/productController');

const SalesServices = require('../../services/salesServices');
const SlaesController = require('../../controllers/salesController');

/* ====================================== ProductController Create ===================================== */
describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductServices, 'create').resolves(false);
    });

    afterEach(() => {
      ProductServices.create.restore();
    });

    it('é chamado o status com o código 500', async () => {
      await ProductController.createProduct(request, response);
      expect(response.status.calledWith(422)).to.be.equal(false);
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async () => {
      await ProductController.createProduct(request, response);
      expect(
        response.json.calledWith({ message: 'Internal Server Error' }),
      ).to.be.equal(false);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    const payload = {
      products: [
        {
          _id: '61dc9c2ffd242f0b43bfc80d',
          name: 'Examplo_Product',
          quantity: 10,
        },
      ],
    };

    beforeEach(() => {
      request.body = {
        name: 'Product_name',
        quantity: 10,
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductServices, 'create').resolves(payload);
    });

    afterEach(() => {
      ProductServices.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await ProductController.createProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna o produto criado', async () => {
      await ProductController.createProduct(request, response);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

/* ====================================== ProductController getAll ===================================== */
describe('Ao chamar o controller de getAll', () => {
  describe('quando não existem produtos no banco de dados', () => {
    const request = {};
    const response = {};

    beforeEach(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductServices, 'getAll').resolves([]);
    });

    afterEach(() => {
      ProductServices.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await ProductController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando uma array', async () => {
      await ProductController.getAllProducts(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('é chamado o método "json" passando uma array vazia', async () => {
      await ProductController.getAllProducts(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('quando existem produtos no banco de dados', () => {
    const request = {};
    const response = {};

    const payload = {
      products: [
        {
          _id: '61dc9c2ffd242f0b43bfc80d',
          name: 'Examplo_Product',
          quantity: 10,
        },
      ],
    };

    beforeEach(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductServices, 'getAll').resolves(payload);
    });

    afterEach(() => {
      ProductServices.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await ProductController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando uma array', async () => {
      await ProductController.getAllProducts(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o método "json" com a lista de produtos', async () => {
      await ProductController.getAllProducts(request, response);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

/* ====================================== ProductController findById ===================================== */
describe('Ao chamar o controller de getById', () => {
  describe('quando existem produtos no banco de dados', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = {
        id: '604cb554311d68f491ba5781',
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductServices, 'getById').resolves({
        _id: '604cb554311d68f491ba5781',
        name: 'Product_name',
        quantity: 10,
      });
    });

    afterEach(() => {
      ProductServices.getById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await ProductController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await ProductController.getById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('quando é atualizado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = {
      _id: '604cb554311d68f491ba5781',
      name: 'Product_name',
      quantity: 2,
    };

    beforeEach(() => {
      request.params = {
        id: '604cb554311d68f491ba5781',
      };
      request.body = {
        name: 'Product_name',
        quantity: 2,
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductServices, 'update').resolves(payload);
    });

    afterEach(() => {
      ProductServices.update.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await ProductController.updateProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna o produto criado', async () => {
      await ProductController.updateProduct(request, response);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });

  describe('quando é deletar com sucesso', () => {
    const response = {};
    const request = {};

    const payload = {
      _id: '604cb554311d68f491ba5781',
      name: 'Product_name',
      quantity: 2,
    };

    beforeEach(() => {
      request.params = {
        id: '604cb554311d68f491ba5781',
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductServices, 'exclude').resolves(payload);
    });
    afterEach(() => {
      ProductServices.exclude.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await ProductController.deleteProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna o produto criado', async () => {
      await ProductController.deleteProduct(request, response);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

/* ====================================== SalesController Create ===================================== */
describe('Ao chamar o controller de create', () => {
  describe('quando é atualizado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = {
      _id: '604cb554311d68f491ba5781',
      itensSold: [
        {
          productId: '5f3ff849d94d4a17da707008',
          quantity: 2,
        },
        {
          productId: '5f43ba333200020b101fe4a0',
          quantity: 10,
        },
      ],
    };

    beforeEach(() => {
      request.params = {
        id: '604cb554311d68f491ba5781',
      };
      request.body = [
        {
          productId: '5f3ff849d94d4a17da707008',
          quantity: 2,
        },
        {
          productId: '5f43ba333200020b101fe4a0',
          quantity: 10,
        },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesServices, 'update').resolves(payload);
    });

    afterEach(() => {
      SalesServices.update.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SlaesController.updateSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna o produto criado', async () => {
      await SlaesController.updateSales(request, response);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });

  describe('quando é deletar com sucesso', () => {
    const response = {};
    const request = {};

    const payload = {
      _id: '604cb554311d68f491ba5781',
      itensSold: [
        {
          productId: '5f3ff849d94d4a17da707008',
          quantity: 2,
        },
        {
          productId: '5f43ba333200020b101fe4a0',
          quantity: 10,
        },
      ],
    };

    beforeEach(() => {
      request.params = {
        id: '604cb554311d68f491ba5781',
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesServices, 'exclude').resolves(payload);
    });

    afterEach(() => {
      SalesServices.exclude.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SlaesController.deleteSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna o produto criado', async () => {
      await SlaesController.deleteSales(request, response);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    const payload = {
      _id: '604cb554311d68f491ba5781',
      itensSold: [
        {
          productId: '5f3ff849d94d4a17da707008',
          quantity: 2,
        },
        {
          productId: '5f43ba333200020b101fe4a0',
          quantity: 10,
        },
      ],
    };

    beforeEach(() => {
      request.body = [
        {
          productId: '5f3ff849d94d4a17da707008',
          quantity: 2,
        },
        {
          productId: '5f43ba333200020b101fe4a0',
          quantity: 10,
        },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesServices, 'create').resolves(payload);
    });

    afterEach(() => {
      SalesServices.create.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SlaesController.createSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna o produto criado', async () => {
      await SlaesController.createSales(request, response);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});
/* ====================================== SalesController getAll ===================================== */
describe('Ao chamar o controller de getAll', () => {
  describe('quando não existem produtos no banco de dados', () => {
    const request = {};
    const response = {};

    beforeEach(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesServices, 'getAll').resolves([]);
    });

    afterEach(() => {
      SalesServices.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await SlaesController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando uma array', async () => {
      await SlaesController.getAllSales(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('é chamado o método "json" passando uma array vazia', async () => {
      await SlaesController.getAllSales(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('quando existem produtos no banco de dados', () => {
    const request = {};
    const response = {};

    const payload = {
      products: [
        {
          _id: '61dc9c2ffd242f0b43bfc80d',
          name: 'Examplo_Product',
          quantity: 10,
        },
      ],
    };

    beforeEach(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesServices, 'getAll').resolves(payload);
    });

    afterEach(() => {
      SalesServices.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await SlaesController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando uma array', async () => {
      await SlaesController.getAllSales(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o método "json" com a lista de produtos', async () => {
      await SlaesController.getAllSales(request, response);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

/* ====================================== SalesController findById ===================================== */
describe('Ao chamar o controller de getById', () => {
  describe('quando existem produtos no banco de dados', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = {
        id: '604cb554311d68f491ba5781',
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'getById').resolves({
        _id: '604cb554311d68f491ba5781',
        name: 'Product_name',
        quantity: 10,
      });
    });

    afterEach(() => {
      SalesServices.getById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await SlaesController.getByIdSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await SlaesController.getByIdSales(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
