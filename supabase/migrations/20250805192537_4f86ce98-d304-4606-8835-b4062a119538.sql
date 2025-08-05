-- Inserir categorias primeiro
INSERT INTO categories (name, description) VALUES
('ar-condicionado', 'Produtos para ar condicionado e refrigeração'),
('automacao', 'Produtos para automação industrial e residencial'),
('instalacoes-eletricas', 'Produtos para instalações elétricas'),
('cabos', 'Cabos e condutores elétricos'),
('terminais', 'Terminais e conectores elétricos'),
('tomadas-industriais', 'Tomadas e plugs industriais'),
('informatica', 'Produtos para redes e informática'),
('monitoramento', 'Produtos para CFTV e monitoramento')
ON CONFLICT (name) DO NOTHING;

-- Inserir alguns produtos de exemplo de cada categoria
INSERT INTO products (name, code, price, image_url, category_id, description, in_stock, is_featured, popularity) 
SELECT 
  p.name,
  p.code,
  p.price,
  p.image_url,
  c.id as category_id,
  p.description,
  COALESCE(p.in_stock, true),
  COALESCE(p.is_featured, false),
  COALESCE(p.popularity, 0)
FROM (VALUES
  ('SUPORTE 400MM', '13160', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 400mm', true, false, 5),
  ('BOTÃO DE IMPULSO ILUM. 1NA 24V', '7898623749054', NULL, '/lovable-uploads/impulsoazul.png', 'automacao', 'Botão de impulso iluminado azul com contato normalmente aberto para 24V', true, true, 8),
  ('DISJUNTOR MONO 6A C WEG', '7909522567707', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 6A curva C WEG', true, false, 7),
  ('CABO PP 2X1,00MM', '04071', NULL, '/lovable-uploads/pp2vias.png', 'cabos', 'Cabo paralelo PP 2x1,00mm para uso geral', true, false, 6),
  ('CONECTOR WAGO 221 4MM 32A 2P', '10154', 0, '/lovable-uploads/wagoemenda.png', 'terminais', 'Conector tipo WAGO 221 4MM 32A 2P para emendas', true, false, 9),
  ('PLUG 2P + T 16A 200-250V', '7898942135019', NULL, '/lovable-uploads/femea16.png', 'tomadas-industriais', 'Plug industrial 2P + T 16A 200-250V', true, false, 4),
  ('Cabo de Rede Cat6', 'CAT6-001', 2.50, '/lovable-uploads/cat6.png', 'informatica', 'Cabo de rede Cat6 UTP para conexões Ethernet de alta velocidade', true, true, 8),
  ('Cabo Coaxial RG59', 'RG59-001', 3.20, '/lovable-uploads/rg59.png', 'monitoramento', 'Cabo coaxial RG59 para sistemas de CFTV e monitoramento', true, false, 5)
) AS p(name, code, price, image_url, category_name, description, in_stock, is_featured, popularity)
JOIN categories c ON c.name = p.category_name;