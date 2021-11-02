CREATE VIEW cancoes_premium AS
SELECT 
ca.cancao AS nome, COUNT(*) AS reproducoes
FROM
SpotifyClone.historico_de_reproducoes hr
INNER JOIN SpotifyClone.cancoes ca ON ca.cancao_id = hr.cancao_id
INNER JOIN SpotifyClone.usuarios us ON us.usuario_id = hr.usuario_id
INNER JOIN SpotifyClone.planos pl ON pl.plano_id = us.plano_id
WHERE pl.plano IN('familiar', 'universitário')
GROUP BY ca.cancao ORDER BY 1;
