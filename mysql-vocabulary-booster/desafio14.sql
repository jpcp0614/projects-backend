SELECT 
    cus.Country AS País
FROM
    w3schools.customers cus 
UNION SELECT 
    sup.Country AS País
FROM
    w3schools.suppliers sup
ORDER BY 1
LIMIT 5;
