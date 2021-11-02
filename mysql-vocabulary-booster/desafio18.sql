SELECT 
    CONCAT(emp.FIRST_NAME, ' ', emp.LAST_NAME) AS `Nome completo`,
    DATE_FORMAT(histo.START_DATE, '%d/%m/%Y') AS `Data de início`,
    DATE_FORMAT(histo.END_DATE, '%d/%m/%Y') AS `Data de rescisão`,
    ROUND(DATEDIFF(histo.END_DATE, histo.START_DATE) / 365,
            2) AS `Anos trabalhados`
FROM
    hr.job_history histo
        INNER JOIN
    hr.employees emp ON emp.EMPLOYEE_ID = histo.EMPLOYEE_ID
ORDER BY 1 , 4;
