db.resumoVoos.insertOne({
  empresa: "PASSAREDO",
  totalVoosDomesticos: db.voos.count({ 
    natureza: { $eq: "Doméstica" }, 
    "empresa.nome": { $eq: "PASSAREDO" }, 
  }),
});

db.resumoVoos.findOne({
  empresa: { $eq: "PASSAREDO" } }, 
  { _id: 0, empresa: 1, totalVoosDomesticos: 1, 
});