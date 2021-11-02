SELECT 
    UCASE(CONCAT(emp.FIRST_NAME, ' ', emp.LAST_NAME)) AS `Nome completo`,
    histo.START_DATE AS `Data de início`,
    emp.SALARY AS Salário
FROM
    hr.job_history histo
        INNER JOIN
    hr.employees emp ON emp.EMPLOYEE_ID = histo.EMPLOYEE_ID
        AND MONTH(histo.START_DATE) IN (01 , 02, 03)
ORDER BY 1 , 2;
