const sinon = require('sinon');
const { expect } = require('chai');

const { MongoClient, ObjectId } = require('mongodb');
const { getConnection } = require('../../utils/functions/mongoMockConnection');

const ProductsModel = require('../../models/productsModel');
const SalesModel = require('../../models/salesModel');

/* ============================================= Testes direcionados ao ProductModel ========================================== */
/* ============================================= ProductModel Create ========================================== */
describe('Insere um novo produto', () => {
  const payloadProduct = {
    name: 'Examplo_Product',
    quantity: 10,
  };

  let connectionMock;

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async () => {
    await connectionMock.db('StoreManager').collection('products').drop();
    MongoClient.connect.restore();
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductsModel.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductsModel.create(payloadProduct);
      expect(response).to.have.a.property('id');
    });
    it('deve existir um produto com o name e id cadastrado!', async () => {
      const id = await ProductsModel.create(payloadProduct);
      const productCreated = await connectionMock
        .db('StoreManager')
        .collection('products')
        .findOne({ _id: id });

      expect(productCreated).to.be.not.null;
      expect(productCreated.name.name).to.deep.equal(payloadProduct.name);
    });
  });
});
/* ============================================= ProductModel GetAll ========================================== */
describe('Busca todos os products', () => {
  let connectionMock;

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(() => {
    MongoClient.connect.restore();
  });

  describe('Quando não existe nenhum produto criado', () => {
    it('retorna uma array', async () => {
      const product = await ProductsModel.getAll();

      expect(product).to.be.an('array');
    });

    it('a array está vazia', async () => {
      const product = await ProductsModel.getAll();

      expect(product).to.be.empty;
    });
  });

  describe('Quando existem produtos cadastrados', () => {
    const expectedProduct = {
      _id: '61dc9c2ffd242f0b43bfc80d',
      name: 'Examplo_Product',
      quantity: 10,
    };

    beforeEach(async () => {
      await connectionMock
        .db('StoreManager')
        .collection('products')
        .insertOne({ ...expectedProduct });
    });

    afterEach(async () => {
      await connectionMock.db('StoreManager').collection('products').drop();
    });

    it('retorna uma array', async () => {
      const products = await ProductsModel.getAll();

      expect(products).to.be.an('array');
    });

    it('a array não está vazia!', async () => {
      const products = await ProductsModel.getAll();

      expect(products).to.be.not.empty;
    });

    it('a array possui dados do tipo objeto', async () => {
      const [item] = await ProductsModel.getAll();

      expect(item).to.be.an('object');
    });

    it('tais itens possuem os atributos "_id", "name", "quantity"', async () => {
      const [item] = await ProductsModel.getAll();

      expect(item).to.include.all.keys(['_id', 'name', 'quantity']);
    });

    it('o produto cadastrado está na lista', async () => {
      const [{ _id, name, quantity }] = await ProductsModel.getAll();

      expect({ _id, name, quantity }).to.deep.equal(expectedProduct);
    });
  });
});
/* ============================================= ProductModel GetById ========================================== */
describe('Busca apenas um produto no BD através do ID', () => {
  let connectionMock;

  const ID_EXAMPLE = '61dc9c2ffd242f0b43bfc80d';

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async () => {
    MongoClient.connect.restore();
  });

  describe('quando não existe um produto para o ID informado', () => {
    it('retorna "null"', async () => {
      const response = await ProductsModel.getById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto para o ID informado', () => {
    beforeEach(async () => {
      const moviesCollection = await connectionMock;
      await moviesCollection
        .db('StoreManager')
        .collection('products')
        .insertOne({
          _id: ObjectId(ID_EXAMPLE),
          name: 'Example Product',
          quantity: 10,
        });
    });

    afterEach(async () => {
      await connectionMock.db('StoreManager').collection('products').drop();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsModel.getById(ID_EXAMPLE);

      expect(response).to.be.a('object');
    });

    it('o objeto possui as propriedades: "id", "name", "quantity"', async () => {
      const response = await ProductsModel.getById(ID_EXAMPLE);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});
/* ============================================= ProductModel GetByName ========================================== */
describe('Busca apenas um produto no BD através do Name', () => {
  let connectionMock;
  const ID_EXAMPLE = '61dc9c2ffd242f0b43bfc80d';
  const NAME_EXAMPLE = 'Example Product';

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async () => {
    MongoClient.connect.restore();
  });

  describe('quando não existe um produto para o Name informado', () => {
    it('retorna "null"', async () => {
      const response = await ProductsModel.getByName(NAME_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto para o ID informado', () => {
    beforeEach(async () => {
      const moviesCollection = await connectionMock;
      await moviesCollection
        .db('StoreManager')
        .collection('products')
        .insertOne({
          _id: ObjectId(ID_EXAMPLE),
          name: 'Example Product',
          quantity: 10,
        });
    });

    afterEach(async () => {
      await connectionMock.db('StoreManager').collection('products').drop();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsModel.getByName(NAME_EXAMPLE);

      expect(response).to.be.a('object');
    });

    it('o objeto possui as propriedades: "id", "name", "quantity"', async () => {
      const response = await ProductsModel.getByName(NAME_EXAMPLE);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});
/* ============================================= ProductModel Update ========================================== */
describe('Atualiza um novo produto', () => {
  const payloadProduct = {
    name: 'Examplo_Product',
    quantity: 10,
  };

  let connectionMock;

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async () => {
    await connectionMock.db('StoreManager').collection('products').drop();
    MongoClient.connect.restore();
  });

  describe('quando é atualizado com sucesso', () => {
    it('retorna um objeto', async () => {
      const productId = await ProductsModel.create(payloadProduct);

      const a = {
        id: ObjectId(productId),
        name: 'Examplo_Product',
        quantity: 15,
      };

      const response = await ProductsModel.update(a.id, a.name, a.quantity);
      expect(response).to.be.a('object');
      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });

    it('quantidade alterda', async () => {
      const productId = await ProductsModel.create(payloadProduct);

      const a = {
        id: ObjectId(productId),
        name: 'Examplo_Product',
        quantity: 15,
      };

      const response = await ProductsModel.update(a.id, a.name, a.quantity);

      expect(response).to.be.a('object');
      expect(response.quantity).to.deep.not.equal(payloadProduct.quantity);
    });
  });
});
/* ============================================= ProductModel Delete ========================================== */
describe('Deleta um produto', () => {
  const payloadProduct = {
    name: 'Examplo_Product',
    quantity: 10,
  };

  let connectionMock;

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async () => {
    await connectionMock.db('StoreManager').collection('products').drop();
    MongoClient.connect.restore();
  });

  describe('quando é deletado com sucesso', () => {
    it('consultar se o produto existe', async () => {
      const productId = await ProductsModel.create(payloadProduct);
      const id = ObjectId(productId);
      await ProductsModel.exclude(id);

      const response = await ProductsModel.getById(id);

      expect(response).to.be.equal(null);
    });
  });
});

/* ============================================= Testes direcionados ao ProductSales ========================================== */
/* ============================================= SalesModel Create ========================================== */
describe('Insere uma nova compra', () => {
  const payloadSales = [
    {
      productId: '5f43ba333200020b101fe4a0',
      quantity: 10,
    },
  ];

  let connectionMock;

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async () => {
    await connectionMock.db('StoreManager').collection('sales').drop();
    MongoClient.connect.restore();
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await SalesModel.create(payloadSales);

      expect(response).to.be.a('object');
    });

    it('tal array possui o itens que são objetos com id', async () => {
      const response = await SalesModel.create(payloadSales);

      expect(response).to.have.a.property('id');
    });
    it('deve existir um produto com o name e id cadastrado!', async () => {
      const id = await SalesModel.create(payloadSales);
      const productCreated = await connectionMock
        .db('StoreManager')
        .collection('sales')
        .findOne({ _id: id });

      expect(productCreated).to.be.not.null;
      expect(productCreated.itensSold[0].productId).to.deep.equal(
        payloadSales[0].productId,
      );
    });
  });
});
/* ============================================= SalesModel GetAll ========================================== */
describe('Busca todos as compras', () => {
  let connectionMock;

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(() => {
    MongoClient.connect.restore();
  });

  describe('Quando não existe nenhum produto criado', () => {
    it('retorna uma array', async () => {
      const sale = await SalesModel.getAll();

      expect(sale).to.be.an('array');
    });

    it('a array está vazia', async () => {
      const sale = await SalesModel.getAll();

      expect(sale).to.be.empty;
    });
  });

  describe('Quando existem produtos cadastrados', () => {
    const sales = [
      {
        productId: '5f3ff849d94d4a17da707008',
        quantity: 2,
      },
      {
        productId: '5f43ba333200020b101fe4a0',
        quantity: 10,
      },
    ];

    beforeEach(async () => {
      await connectionMock
        .db('StoreManager')
        .collection('sales')
        .insertMany(sales);
    });

    afterEach(async () => {
      await connectionMock.db('StoreManager').collection('sales').drop();
    });

    it('retorna uma array', async () => {
      const sales = await SalesModel.getAll();

      expect(sales).to.be.an('array');
    });

    it('a array não está vazia!', async () => {
      const sales = await SalesModel.getAll();

      expect(sales).to.be.not.empty;
    });

    it('a array possui dados do tipo objeto', async () => {
      const [item] = await SalesModel.getAll();

      expect(item).to.be.an('object');
    });

    it('tais itens possuem os atributos "_id", "name", "quantity"', async () => {
      const [item] = await SalesModel.getAll();

      expect(item).to.include.all.keys(['productId', 'quantity']);
    });

    it('o produto cadastrado está na lista', async () => {
      const sales = await SalesModel.getAll();
      const { _id, productId, quantity } = sales[0];
      expect({ _id, productId, quantity }).to.deep.equal(sales[0]);
    });
  });
});
/* ============================================= SalesModel GetById ========================================== */
describe('Busca apenas uma compra no BD através do ID', () => {
  let connectionMock;

  const ID_EXAMPLE = '61dc9c2ffd242f0b43bfc80d';

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async () => {
    MongoClient.connect.restore();
  });

  describe('quando não existe uma compra para o ID informado', () => {
    it('retorna "null"', async () => {
      const response = await SalesModel.getById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe uma compra para o ID informado', () => {
    beforeEach(async () => {
      const salesCollection = await connectionMock;
      await salesCollection
        .db('StoreManager')
        .collection('sales')
        .insertOne({
          _id: ObjectId(ID_EXAMPLE),
          quantity: 10,
        });
    });

    afterEach(async () => {
      await connectionMock.db('StoreManager').collection('sales').drop();
    });

    it('retorna um objeto', async () => {
      const response = await SalesModel.getById(ID_EXAMPLE);

      expect(response).to.be.a('object');
    });

    it('o objeto possui as propriedades: "id", "quantity"', async () => {
      const response = await SalesModel.getById(ID_EXAMPLE);

      expect(response).to.include.all.keys('_id', 'quantity');
    });
  });
});
/* ============================================= SalesModel Upadate ========================================== */
describe('Atualiza uma nova compra', () => {
  const ID = '5f43ba333200020b101fe4a0';

  const payloadSales = {
    _id: '5f43ba333200020b101fe4a0',
    itensSold: [
      { _id: '61dc9c2ffd242f0b43bfc80d', quantity: 5 },
      {
        _id: '5f3ff849d94d4a17da707008',
        quantity: 5,
      },
    ],
  };

  const payloadSalesNew = [
    { _id: '61dc9c2ffd242f0b43bfc80d', quantity: 10 },
    { _id: '5f3ff849d94d4a17da707008', quantity: 10 },
  ];

  let connectionMock;

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async () => {
    await connectionMock.db('StoreManager').collection('sales').drop();
    MongoClient.connect.restore();
  });

  describe('quando é atualizado com sucesso', () => {
    it('retorna um objeto', async () => {
      await SalesModel.create(payloadSales);

      const response = await SalesModel.update(ID, payloadSalesNew);
      expect(response).to.be.a('array');
    });

    it('quantidade alterda', async () => {
      await SalesModel.create(payloadSales);

      const response = await SalesModel.update(ID, payloadSalesNew);

      expect(response).to.be.a('array');
      expect(response).to.deep.equal(payloadSalesNew);
    });
  });
});
/* ============================================= SalesModel Delete ========================================== */
describe('Deleta uma compra', () => {
  const payloadSales = [
    {
      productId: '5f43ba333200020b101fe4a0',
      quantity: 10,
    },
  ];

  let connectionMock;

  beforeEach(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async () => {
    await connectionMock.db('StoreManager').collection('sales').drop();
    MongoClient.connect.restore();
  });

  describe('quando é deletado com sucesso', () => {
    it('consultar se o produto existe', async () => {
      const productId = await SalesModel.create(payloadSales);
      const id = ObjectId(productId);
      await SalesModel.exclude(id);

      const response = await SalesModel.getById(id);

      expect(response).to.be.equal(null);
    });
  });
});
