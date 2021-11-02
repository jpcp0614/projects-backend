CREATE VIEW historico_reproducao_usuarios AS
    SELECT 
        us.usuario, ca.cancao AS nome
    FROM
        SpotifyClone.historico_de_reproducoes hi
            INNER JOIN
        SpotifyClone.usuarios us ON us.usuario_id = hi.usuario_id
            INNER JOIN
        SpotifyClone.cancoes ca ON ca.cancao_id = hi.cancao_id
    ORDER BY 1 , 2;
