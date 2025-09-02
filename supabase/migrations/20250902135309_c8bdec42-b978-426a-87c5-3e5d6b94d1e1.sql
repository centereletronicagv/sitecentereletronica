-- Primeiro, vamos buscar os IDs das categorias
-- Atualizar produtos de ar-condicionado (Tools, Cables)
UPDATE products 
SET category_id = (
  SELECT id FROM categories WHERE name = 'Ar Condicionado' LIMIT 1
)
WHERE subcategory IN ('Ferramentas', 'Cabos') 
  AND created_at > '2025-09-02 13:30:00';

-- Atualizar produtos de instalações elétricas
UPDATE products 
SET category_id = (
  SELECT id FROM categories WHERE name = 'Instalações Elétricas' LIMIT 1
)
WHERE subcategory IN ('Disjuntores', 'DPS', 'IDR') 
  AND created_at > '2025-09-02 13:30:00';