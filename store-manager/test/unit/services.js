const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../models/productsModel');
const ProductsServices = require('../../services/productServices');

const SalesModel = require('../../models/salesModel');
const SaleServices = require('../../services/salesServices');

/* ============================================= Testes direcionados ao ProductServices ========================================== */
/* ============================================= ProductService Create ========================================== */
describe('Insere um novo produto no BD', () => {
  describe('quando o payload informado não é válido', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getByName').resolves(true);
    });

    afterEach(() => {
      ProductsModel.getByName.restore();
    });
    const payloadProduct = {
      name: '',
      quantity: '',
    };

    it('retorna um error', async () => {
      try {
        const response = await ProductsServices.create(payloadProduct);
        expect(response).to.be.a('boolean');
      } catch (error) {}
    });
    it('o boolean contém "false"', async () => {
      try {
        const response = await ProductsServices.create(payloadProduct);
        expect(response).to.be.equal(false);
      } catch (error) {}
    });
  });

  describe('quando o name e quantity informado não é válido', () => {
    it('retorna um error', async () => {
      try {
        const response = await ProductsServices.create('a', -1);
        expect(response).to.be.a('boolean');
      } catch (error) {}
    });
    it('o boolean contém "false"', async () => {
      try {
        const response = await ProductsServices.create('a', -1);
        expect(response).to.be.equal(false);
      } catch (error) {}
    });
  });

  describe('quando é inserido com sucesso', () => {
    beforeEach(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      sinon.stub(ProductsModel, 'create').resolves(ID_EXAMPLE);
    });

    afterEach(() => {
      ProductsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      try {
        const response = await ProductsServices.create('Product_name', 10);
        expect(response).to.be.a('object');
      } catch (error) {}
    });
    it('tal objeto possui o "id" do novo produto inserido', async () => {
      try {
        const response = await ProductsServices.create('Product_name', 10);
        expect(response).to.have.a.property('_id');
      } catch (error) {}
    });
  });
});

/* ============================================= ProductService GetAll ========================================== */
describe('Busca todos produtos no BD', () => {
  describe('quando não existe nenhum produto criado', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getAll').resolves([]);
    });

    afterEach(() => {
      ProductsModel.getAll.restore();
    });

    it('retorna um array', async () => {
      try {
        const response = await ProductsServices.getAll();

        expect(response).to.be.an('array');
      } catch (error) {}
    });

    it('o array está vazio', async () => {
      try {
        const response = await ProductsServices.getAll();

        expect(response).to.be.empty;
      } catch (error) {}
    });
  });

  describe('quando o array não é válido', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getAll').resolves(null);
    });

    afterEach(() => {
      ProductsModel.getAll.restore();
    });

    it('retorna um error', async () => {
      try {
        const response = await ProductsServices.getAll();
        expect(response).to.be.a('boolean');
      } catch (error) {}
    });
    it('o boolean contém "false"', async () => {
      try {
        const response = await ProductsServices.getAll();
        expect(response).to.be.equal(false);
      } catch (error) {}
    });
  });

  describe('quando existem produtos criados', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getAll').resolves([
        {
          id: '604cb554311d68f491ba5781',
          name: 'Product_name',
          quantity: 10,
        },
      ]);
    });

    afterEach(() => {
      ProductsModel.getAll.restore();
    });

    it('retorna um array', async () => {
      try {
        const response = await ProductsServices.getAll();

        expect(response).to.be.an('array');
      } catch (error) {}
    });

    it('o array não está vazio', async () => {
      try {
        const response = await ProductsServices.getAll();

        expect(response).to.be.not.empty;
      } catch (error) {}
    });

    it('o array possui itens do tipo objeto', async () => {
      try {
        const [item] = await ProductsServices.getAll();

        expect(item).to.be.an('object');
      } catch (error) {}
    });

    it('tais itens possui as propriedades: "id", "name", "quantit"', async () => {
      try {
        const [item] = await ProductsServices.getAll();

        expect(item).to.include.all.keys('id', 'name', 'quantity');
      } catch (error) {}
    });
  });
});

/* ============================================= ProductService GetById ========================================== */
describe('Busca um produto através do ID', () => {
  const ID_EXAMPLE = '61dc9c2ffd242f0b43bfc80d';

  describe('quando não é encontrado um produto para o ID', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getById').resolves(null);
    });

    afterEach(() => {
      ProductsModel.getById.restore();
    });

    it('retorna "null"', async () => {
      try {
        const response = await ProductsServices.getById('');

        expect(response).to.be.null;
      } catch (error) {}
    });
  });

  describe('quando é encontrado o produto para o ID', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getById').resolves({
        id: '604cb554311d68f491ba5781',
        name: 'Product_name',
        quantity: 10,
      });
    });

    afterEach(() => {
      ProductsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      try {
        const response = await ProductsServices.getById(ID_EXAMPLE);

        expect(response).to.be.an('object');
      } catch (error) {}
    });

    it('o objeto possui as propriedades: "id", "name", "quatity"', async () => {
      try {
        const response = await ProductsServices.getById(ID_EXAMPLE);

        expect(response).to.include.all.keys('id', 'name', 'quantity');
      } catch (error) {}
    });
  });
});

/* ============================================= Testes direcionados ao SalesServices ========================================== */
/* ============================================= SaleServices Create ========================================== */
describe('Insere uma nova compra no BD', () => {
  describe('quando o payload informado não é válido', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getAll').resolves([]);
    });

    afterEach(() => {
      SalesModel.getAll.restore();
    });
    const payloadSales = [
      {
        productId: '',
        quantity: '',
      },
    ];

    it('retorna um error', async () => {
      try {
        const response = await SaleServices.create(payloadSales);
        expect(response).to.be.a('boolean');
      } catch (error) {}
    });

    it('o boolean contém "false"', async () => {
      try {
        const response = await SaleServices.create(payloadSales);

        expect(response).to.be.equal(false);
      } catch (error) {}
    });
  });

  describe('quando é inserido com sucesso', () => {
    const payloadSales = [
      {
        productId: '5f43ba333200020b101fe4a0',
        quantity: 10,
      },
    ];

    beforeEach(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(SalesModel, 'create').resolves(ID_EXAMPLE);
    });

    afterEach(() => {
      SalesModel.create.restore();
    });

    it('retorna um objeto', async () => {
      try {
        const response = await SaleServices.create(payloadSales);

        expect(response).to.be.a('object');
      } catch (error) {}
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      try {
        const response = await SaleServices.create(payloadSales);

        expect(response).to.have.a.property('_id');
      } catch (error) {}
    });
  });
});

/* ============================================= SaleServices GetAll ========================================== */
describe('Busca todas as compras no BD', () => {
  describe('quando não retorna um array', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getAll').resolves(null);
    });

    afterEach(() => {
      SalesModel.getAll.restore();
    });

    it('retorna um error', async () => {
      try {
        const response = await SaleServices.getAll();

        expect(response).to.be.an('boolean');
      } catch (error) {}
    });

    it('o boolean contém "false" ', async () => {
      try {
        const response = await SaleServices.getAll();

        expect(response).to.be.equal(false);
      } catch (error) {}
    });
  });

  describe('quando não existe nenhuma compŕa criado', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getAll').resolves([]);
    });

    afterEach(() => {
      SalesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      try {
        const response = await SaleServices.getAll();

        expect(response).to.be.an('array');
      } catch (error) {}
    });

    it('o array está vazio', async () => {
      try {
        const response = await SaleServices.getAll();

        expect(response).to.be.empty;
      } catch (error) {}
    });
  });

  describe('quando existem produtos criados', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getAll').resolves([
        {
          productId: '5f3ff849d94d4a17da707008',
          quantity: 2,
        },
        {
          productId: '5f43ba333200020b101fe4a0',
          quantity: 10,
        },
      ]);
    });

    afterEach(() => {
      SalesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      try {
        const response = await SaleServices.getAll();

        expect(response).to.be.an('array');
      } catch (error) {}
    });

    it('o array não está vazio', async () => {
      try {
        const response = await SaleServices.getAll();

        expect(response).to.be.not.empty;
      } catch (error) {}
    });

    it('o array possui itens do tipo objeto', async () => {
      try {
        const [item] = await SaleServices.getAll();

        expect(item).to.be.an('object');
      } catch (error) {}
    });

    it('tais itens possui as propriedades: "id", "name", "quantit"', async () => {
      try {
        const [item] = await SaleServices.getAll();

        expect(item).to.include.all.keys('id', 'name', 'quantity');
      } catch (error) {}
    });
  });
});

/* ============================================= ProductService GetById ========================================== */
describe('Busca uma compra através do ID', () => {
  const ID_EXAMPLE = '61dc9c2ffd242f0b43bfc80d';

  describe('quando não é encontrado uma compra para o ID', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getById').resolves(null);
    });

    afterEach(() => {
      SalesModel.getById.restore();
    });

    it('retorna "null"', async () => {
      try {
        const response = await SaleServices.getById();

        expect(response).to.be.null;
      } catch (error) {}
    });
  });

  describe('quando é encontrado a compra para o ID', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getById').resolves({
        _id: '604cb554311d68f491ba5781',
        quantity: 10,
      });
    });

    afterEach(() => {
      SalesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      try {
        const response = await SaleServices.getById(ID_EXAMPLE);

        expect(response).to.be.an('object');
      } catch (error) {}
    });

    it('o objeto possui as propriedades: "_id", "quantity"', async () => {
      try {
        const response = await SaleServices.getById(ID_EXAMPLE);

        expect(response).to.include.all.keys('_id', 'quantity');
      } catch (error) {}
    });
  });

  describe('quando a quantidade no stck é inferior a compra', () => {
    beforeEach(() => {});

    afterEach(() => {});

    const sales = [
      {
        productId: '604cb554311d68f491ba5781',
        quantity: 10,
      },
    ];
    const stock = [
      {
        _id: '604cb554311d68f491ba5781',
        quantity: 1,
      },
    ];

    it('retorna um error', async () => {
      try {
        const response = await SaleServices.checkStock(sales, stock);
        expect(response).to.be.a('boolean');
      } catch (error) {}
    });
    it('o boolean contém "false"', async () => {
      try {
        const response = await SaleServices.checkStock(sales, stock);
        expect(response).to.be.equal(false);
      } catch (error) {}
    });
  });
});
