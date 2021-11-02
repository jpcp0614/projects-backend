SELECT 
    a.ContactName AS `Nome`,
    b.Country AS `País`,
    COUNT(b.Country) AS `Número de compatriotas`
FROM
    w3schools.customers a,
    w3schools.customers b
WHERE
    a.Country = b.Country
        AND a.CustomerID <> b.CustomerID
GROUP BY  `Nome`, `País`
ORDER BY `Nome`;
