SELECT 
    CONCAT(emp.FirstName, ' ', emp.LastName) AS `Nome completo`,
    COUNT(*) AS `Total de pedidos`
FROM
    w3schools.employees emp
        INNER JOIN
    w3schools.orders orde ON orde.EmployeeID = emp.EmployeeID
GROUP BY emp.EmployeeID
ORDER BY 2;
