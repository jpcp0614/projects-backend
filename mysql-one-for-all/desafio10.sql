DELIMITER $$
CREATE FUNCTION quantidade_musicas_no_historico(codigo_user INT)
RETURNS INT READS SQL DATA
BEGIN
DECLARE result INT;
SELECT 
COUNT(*)
FROM
SpotifyClone.historico_de_reproducoes
WHERE usuario_id = codigo_user
INTO result;
RETURN result;
END $$
DELIMITER ;
