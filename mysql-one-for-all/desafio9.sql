DELIMITER $$
CREATE PROCEDURE albuns_do_artista(IN artista VARCHAR(50))
BEGIN
SELECT 
ar.artista, al.album
FROM
SpotifyClone.albuns al
INNER JOIN SpotifyClone.artistas ar ON ar.artista_id = al.artista_id
WHERE ar.artista = artista
ORDER BY 2;
END $$
DELIMITER ;
