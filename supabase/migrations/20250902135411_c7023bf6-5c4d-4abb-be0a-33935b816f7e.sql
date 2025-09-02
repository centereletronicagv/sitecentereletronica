-- Corrigir os nomes das categorias e atualizar os produtos
-- Atualizar produtos de ar-condicionado (Tools, Cables)
UPDATE products 
SET category_id = (
  SELECT id FROM categories WHERE name = 'ar-condicionado' LIMIT 1
)
WHERE subcategory IN ('Ferramentas', 'Cabos') 
  AND created_at > '2025-09-02 13:30:00';

-- Atualizar produtos de instalações elétricas
UPDATE products 
SET category_id = (
  SELECT id FROM categories WHERE name = 'instalacoes-eletricas' LIMIT 1
)
WHERE subcategory IN ('Disjuntores', 'DPS', 'IDR') 
  AND created_at > '2025-09-02 13:30:00';