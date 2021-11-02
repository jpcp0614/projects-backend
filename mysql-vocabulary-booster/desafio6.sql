SELECT 
    CONCAT(emp.FIRST_NAME, ' ', emp.LAST_NAME) AS `Nome completo`,
    job.JOB_TITLE AS `Cargo`,
    histo.START_DATE AS `Data de início do cargo`,
    dpto.DEPARTMENT_NAME AS Departamento
FROM
    hr.job_history histo
        INNER JOIN
    hr.employees emp ON emp.EMPLOYEE_ID = histo.EMPLOYEE_ID
        INNER JOIN
    hr.departments dpto ON dpto.DEPARTMENT_ID = histo.DEPARTMENT_ID
        INNER JOIN
    hr.jobs job ON job.JOB_ID = histo.JOB_ID
ORDER BY 1 DESC , 2;
