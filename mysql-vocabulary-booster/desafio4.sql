SELECT 
    job.JOB_TITLE AS `Cargo`,
    ROUND(AVG(emp.SALARY), 2) AS `Média salarial`,
    CASE
        WHEN ROUND(AVG(emp.SALARY), 2) BETWEEN (2000) AND (5800) THEN 'Júnior'
        WHEN ROUND(AVG(emp.SALARY), 2) BETWEEN (5801) AND (7500) THEN 'Pleno'
        WHEN ROUND(AVG(emp.SALARY), 2) BETWEEN (7501) AND (10500) THEN 'Sênior'
        WHEN ROUND(AVG(emp.SALARY), 2) > (10500) THEN 'CEO'
        ELSE 'Não encontrado'
    END AS 'Senioridade'
FROM
    hr.employees AS emp
        INNER JOIN
    hr.jobs AS job ON emp.JOB_ID = job.JOB_ID
GROUP BY `Cargo`
ORDER BY `Média salarial`, `Cargo`;
