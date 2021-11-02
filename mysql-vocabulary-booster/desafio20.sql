DELIMITER $$
CREATE PROCEDURE exibir_historico_completo_por_funcionario(IN email VARCHAR(20))
BEGIN
SELECT 
CONCAT(emp.FIRST_NAME, ' ', emp.LAST_NAME) AS 'Nome completo',
dep.DEPARTMENT_NAME AS 'Departamento',
job.JOB_TITLE AS 'Cargo'
FROM
hr.job_history histo
INNER JOIN
hr.employees emp ON emp.EMPLOYEE_ID = histo.EMPLOYEE_ID
INNER JOIN
hr.departments dep ON dep.DEPARTMENT_ID = histo.DEPARTMENT_ID
INNER JOIN
hr.jobs job ON job.JOB_ID = histo.JOB_ID
WHERE emp.EMAIL = email ORDER BY 2, 3;
END $$
DELIMITER ;
