CREATE VIEW perfil_artistas AS
    SELECT 
        ar.artista, al.album, COUNT(*) AS seguidores
    FROM
        SpotifyClone.albuns al
            INNER JOIN
        SpotifyClone.artistas ar ON ar.artista_id = al.artista_id
            INNER JOIN
        SpotifyClone.seguindo_artistas sa ON sa.artista_id = ar.artista_id
    GROUP BY ar.artista_id , al.album
    ORDER BY 3 DESC , 1 , 2;
