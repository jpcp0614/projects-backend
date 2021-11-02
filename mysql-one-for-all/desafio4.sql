CREATE VIEW top_3_artistas AS
    SELECT 
        ar.artista, COUNT(*) AS seguidores
    FROM
        SpotifyClone.seguindo_artistas sa
            INNER JOIN
        SpotifyClone.artistas ar ON ar.artista_id = sa.artista_id
    GROUP BY ar.artista
    ORDER BY 2 DESC , 1
    LIMIT 3;
