CREATE VIEW top_2_hits_do_momento AS
    SELECT 
        ca.cancao, COUNT(*) AS reproducoes
    FROM
        SpotifyClone.historico_de_reproducoes hr
            INNER JOIN
        SpotifyClone.cancoes ca ON ca.cancao_id = hr.cancao_id
    GROUP BY ca.cancao
    ORDER BY 2 DESC , 1
    LIMIT 2;
