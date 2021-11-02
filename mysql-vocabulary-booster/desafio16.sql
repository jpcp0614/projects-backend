DELIMITER $$
CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario(email VARCHAR(50))
RETURNS INT READS SQL DATA
BEGIN
RETURN
(SELECT 
    COUNT(*) AS total_empregos
FROM
    hr.job_history job
        INNER JOIN
    hr.employees emp ON emp.EMPLOYEE_ID = job.EMPLOYEE_ID
WHERE
    emp.EMAIL = email);
END $$
DELIMITER ;
