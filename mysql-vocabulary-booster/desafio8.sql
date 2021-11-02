SELECT 
    cust.ContactName AS `Nome de contato`,
    ship.ShipperName AS `Empresa que fez o envio`,
    orde.OrderDate AS `Data do pedido`
FROM
    w3schools.orders orde
        INNER JOIN
    w3schools.customers cust ON cust.CustomerID = orde.CustomerID
        INNER JOIN
    w3schools.shippers ship ON ship.ShipperID = orde.ShipperID
WHERE
    ship.ShipperName IN ('Speedy Express' , 'United Package')
ORDER BY 1 , 2 , 3;
