SELECT 
    pro.ProductName AS Produto,
    MIN(ord.Quantity) AS Mínima,
    MAX(ord.Quantity) AS Máxima,
    ROUND(AVG(ord.Quantity), 2) AS Média
FROM
    w3schools.order_details ord
        INNER JOIN
    w3schools.products pro ON ord.ProductID = pro.ProductID
GROUP BY ord.ProductID
HAVING Média > 20.00
ORDER BY 4 , 1;
