const nomeEmpresa = "LATAM AIRLINES BRASIL";

db.resumoVoos.insertOne({
  empresa: nomeEmpresa,
  totalVoosDomesticos: db.voos.count({ 
    natureza: { $eq: "Doméstica" }, 
    "empresa.nome": { $eq: "LATAM AIRLINES BRASIL" },
  }),
});

db.resumoVoos.findOne({ 
  empresa: { $eq: nomeEmpresa } }, 
  { _id: 0, empresa: 1, totalVoosDomesticos: 1, 
});