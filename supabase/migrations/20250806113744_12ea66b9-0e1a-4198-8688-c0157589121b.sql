-- Limpar produtos existentes para evitar duplicados
DELETE FROM products;

-- Inserir todos os produtos do ar-condicionado
INSERT INTO products (name, code, price, image_url, category_id, description, in_stock, is_featured, popularity) 
SELECT 
  p.name,
  p.code,
  p.price,
  p.image_url,
  c.id as category_id,
  COALESCE(p.description, ''),
  COALESCE(p.in_stock, true),
  COALESCE(p.is_featured, false),
  COALESCE(p.popularity, 0)
FROM (VALUES
  -- Ar Condicionado - Suportes
  ('SUPORTE 400MM', '13160', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 400mm', true, true, 5),
  ('SUPORTE 450MM', '12602', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 450mm', true, true, 5),
  ('SUPORTE 500MM', '7204', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 500mm', true, true, 5),
  ('SUPORTE 550MM', '13309', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 550mm', true, true, 5),
  ('SUPORTE 900MM', '12945', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 900mm', true, true, 5),
  
  -- Ar Condicionado - Tubulação
  ('TUBULACAO DE COBRE 1/4 ROLO 15M', '04375', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 1/4 em rolo de 15 metros', true, false, 8),
  ('TUBULACAO DE COBRE 3/8 ROLO 15M', '04372', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 3/8 em rolo de 15 metros', true, false, 8),
  ('TUBULACAO DE COBRE 1/2 ROLO 15M', '04377', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 1/2 em rolo de 15 metros', true, false, 8),
  ('TUBULACAO DE COBRE 5/8 ROLO 15M', '04379', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 5/8 em rolo de 15 metros', true, false, 8),
  ('TUBULACAO DE COBRE 3/4 ROLO 15M', '04380', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 3/4 em rolo de 15 metros', true, false, 8),
  
  -- Ar Condicionado - Capacitores
  ('CAPACITOR 25UF', '05027', 0, '/lovable-uploads/capacitor.png', 'ar-condicionado', 'Capacitor 25UF para motores de ar condicionado', true, false, 6),
  ('CAPACITOR 30UF', '05028', 0, '/lovable-uploads/capacitor.png', 'ar-condicionado', 'Capacitor 30UF para motores de ar condicionado', true, false, 6),
  ('CAPACITOR 35UF', '13134', 0, '/lovable-uploads/capacitor.png', 'ar-condicionado', 'Capacitor 35UF para motores de ar condicionado', true, false, 6),
  ('CAPACITOR 40UF', '05030', 0, '/lovable-uploads/capacitor.png', 'ar-condicionado', 'Capacitor 40UF para motores de ar condicionado', true, false, 6),
  ('CAPACITOR 45UF', '05031', 0, '/lovable-uploads/capacitor.png', 'ar-condicionado', 'Capacitor 45UF para motores de ar condicionado', true, false, 6),
  
  -- Automação - Botões de Impulso
  ('BOTÃO DE IMPULSO ILUM. 1NA 24V AZUL', '7898623749054', NULL, '/lovable-uploads/impulsoazul.png', 'automacao', 'Botão de impulso iluminado azul com contato normalmente aberto para 24V', true, true, 8),
  ('BOTÃO DE IMPULSO ILUM. 1NA 24V VERDE', '7898623748996', NULL, '/lovable-uploads/impulsoverde.png', 'automacao', 'Botão de impulso iluminado verde com contato normalmente aberto para 24V', true, false, 7),
  ('BOTÃO DE IMPULSO ILUM. 1NF 24V VERMELHO', '7898623749016', NULL, '/lovable-uploads/impulsovermelho.png', 'automacao', 'Botão de impulso iluminado vermelho com contato normalmente fechado para 24V', true, false, 7),
  ('BOTÃO DE IMPULSO 1NA VERMELHO', '7891435935745', NULL, '/lovable-uploads/impulsovermelho1na.png', 'automacao', 'Botão de impulso vermelho com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1NA AMARELO', '7891435935769', NULL, '/lovable-uploads/impulsoamarelo1na.png', 'automacao', 'Botão de impulso amarelo com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1NA AZUL', '7891435935752', NULL, '/lovable-uploads/impulsoazul1na.png', 'automacao', 'Botão de impulso azul com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1NA VERDE', '7891435935783', NULL, '/lovable-uploads/impulsoverde1na.png', 'automacao', 'Botão de impulso verde com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1NA BRANCO', '7891435935776', NULL, '/lovable-uploads/impulsobranco1na.png', 'automacao', 'Botão de impulso branco com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1NA PRETO', '7891435935790', NULL, '/lovable-uploads/impulsopreto1na.png', 'automacao', 'Botão de impulso preto com contato normalmente aberto', true, false, 6),
  
  -- Automação - Emergência
  ('BOTÃO DE EMERGENCIA VERMELHO 1NF', '7891435935806', NULL, '/lovable-uploads/emergencia.png', 'automacao', 'Botão de emergência vermelho com contato normalmente fechado', true, true, 9),
  ('BOTÃO COGUMELO EMERGENCIA', '7891435935813', NULL, '/lovable-uploads/cogumelo.png', 'automacao', 'Botão cogumelo de emergência', true, true, 9),
  
  -- Automação - Seletoras
  ('CHAVE SELETORA 3P PRETA', '7891435935820', NULL, '/lovable-uploads/seletora3ppreta.png', 'automacao', 'Chave seletora de 3 posições preta', true, false, 7),
  ('CHAVE SELETORA ILUM. VERDE', '7891435935837', NULL, '/lovable-uploads/seletorailumverde.png', 'automacao', 'Chave seletora iluminada verde', true, false, 7),
  ('CHAVE SELETORA ILUM. VERMELHA', '7891435935844', NULL, '/lovable-uploads/seletorailumvermelha.png', 'automacao', 'Chave seletora iluminada vermelha', true, false, 7),
  ('CHAVE SELETORA 1NA RETORNO', '7891435935851', NULL, '/lovable-uploads/seletora1naretorno.png', 'automacao', 'Chave seletora com 1NA e retorno automático', true, false, 7),
  ('CHAVE SELETORA RETORNO', '7891435935868', NULL, '/lovable-uploads/seletoraretorno.png', 'automacao', 'Chave seletora com retorno automático', true, false, 7),
  
  -- Instalações Elétricas - Disjuntores WEG
  ('DISJUNTOR MONO 6A C WEG', '7909522567707', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 6A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 10A C WEG', '7909522567714', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 10A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 16A C WEG', '7909522567721', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 16A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 20A C WEG', '7909522567738', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 20A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 25A C WEG', '7909522567745', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 25A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 32A C WEG', '7909522567752', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 32A curva C WEG', true, true, 8),
  ('DISJUNTOR BIP 16A C WEG', '7909522567769', 0, '/lovable-uploads/wegbif.png', 'instalacoes-eletricas', 'Disjuntor bipolar 16A curva C WEG', true, false, 7),
  ('DISJUNTOR BIP 20A C WEG', '7909522567776', 0, '/lovable-uploads/wegbif.png', 'instalacoes-eletricas', 'Disjuntor bipolar 20A curva C WEG', true, false, 7),
  ('DISJUNTOR BIP 25A C WEG', '7909522567783', 0, '/lovable-uploads/wegbif.png', 'instalacoes-eletricas', 'Disjuntor bipolar 25A curva C WEG', true, false, 7),
  ('DISJUNTOR TRIF 16A C WEG', '7909522567790', 0, '/lovable-uploads/wegtrif.png', 'instalacoes-eletricas', 'Disjuntor tripolar 16A curva C WEG', true, false, 7),
  ('DISJUNTOR TRIF 20A C WEG', '7909522567807', 0, '/lovable-uploads/wegtrif.png', 'instalacoes-eletricas', 'Disjuntor tripolar 20A curva C WEG', true, false, 7),
  ('DISJUNTOR TRIF 25A C WEG', '7909522567814', 0, '/lovable-uploads/wegtrif.png', 'instalacoes-eletricas', 'Disjuntor tripolar 25A curva C WEG', true, false, 7),
  
  -- Cabos - Cabo PP
  ('CABO PP 2X1,00MM', '04071', NULL, '/lovable-uploads/pp2vias.png', 'cabos', 'Cabo paralelo PP 2x1,00mm para uso geral', true, false, 6),
  ('CABO PP 2X1,50MM', '04452', NULL, '/lovable-uploads/pp2vias.png', 'cabos', 'Cabo paralelo PP 2x1,50mm para uso geral', true, false, 6),
  ('CABO PP 2X2,50MM', '03429', NULL, '/lovable-uploads/pp2vias.png', 'cabos', 'Cabo paralelo PP 2x2,50mm para uso geral', true, false, 6),
  ('CABO PP 3X1,00MM', '7340', NULL, '/lovable-uploads/pp3vias.png', 'cabos', 'Cabo paralelo PP 3x1,00mm para uso geral', true, false, 6),
  ('CABO PP 3X1,50MM', '052205', NULL, '/lovable-uploads/pp3vias.png', 'cabos', 'Cabo paralelo PP 3x1,50mm para uso geral', true, false, 6),
  ('CABO PP 3X2,50MM', '04454', NULL, '/lovable-uploads/pp3vias.png', 'cabos', 'Cabo paralelo PP 3x2,50mm para uso geral', true, false, 6),
  
  -- Cabos - Cabo Flex
  ('CABO FLEX 0,50MM AMARELO', '01075', NULL, '/lovable-uploads/flex05.png', 'cabos', 'Cabo flexível 0,50mm amarelo', true, false, 5),
  ('CABO FLEX 1,00MM AMARELO', '01076', NULL, '/lovable-uploads/flex1.png', 'cabos', 'Cabo flexível 1,00mm amarelo', true, false, 5),
  ('CABO FLEX 1,50MM AMARELO', '01077', NULL, '/lovable-uploads/flex15.png', 'cabos', 'Cabo flexível 1,50mm amarelo', true, false, 5),
  ('CABO FLEX 2,50MM AMARELO', '01078', NULL, '/lovable-uploads/flex25.png', 'cabos', 'Cabo flexível 2,50mm amarelo', true, false, 5),
  ('CABO FLEX 4,00MM AMARELO', '01079', NULL, '/lovable-uploads/flex4.png', 'cabos', 'Cabo flexível 4,00mm amarelo', true, false, 5),
  ('CABO FLEX 6,00MM AMARELO', '01080', NULL, '/lovable-uploads/flex6.png', 'cabos', 'Cabo flexível 6,00mm amarelo', true, false, 5),
  ('CABO FLEX 10,00MM AMARELO', '01081', NULL, '/lovable-uploads/flex10.png', 'cabos', 'Cabo flexível 10,00mm amarelo', true, false, 5),
  ('CABO FLEX 16,00MM AMARELO', '01082', NULL, '/lovable-uploads/flex16.png', 'cabos', 'Cabo flexível 16,00mm amarelo', true, false, 5),
  
  -- Terminais - WAGO
  ('CONECTOR WAGO 221 4MM 32A 2P', '10154', 0, '/lovable-uploads/wagoemenda.png', 'terminais', 'Conector tipo WAGO 221 4MM 32A 2P para emendas', true, true, 9),
  ('CONECTOR WAGO DERIVACAO 3P', '10155', 0, '/lovable-uploads/wagoderivacao.png', 'terminais', 'Conector WAGO para derivação 3P', true, false, 8),
  
  -- Terminais - Perfurantes
  ('CONECTOR PERFURANTE AMARELO', '10156', 0, '/lovable-uploads/perfuranteamarelo.png', 'terminais', 'Conector perfurante amarelo para cabos de até 6mm', true, false, 7),
  ('CONECTOR PERFURANTE AZUL', '10157', 0, '/lovable-uploads/perfuranteazul.png', 'terminais', 'Conector perfurante azul para cabos de até 10mm', true, false, 7),
  ('CONECTOR PERFURANTE VERMELHO', '10158', 0, '/lovable-uploads/perfurantevermelho.png', 'terminais', 'Conector perfurante vermelho para cabos de até 16mm', true, false, 7),
  
  -- Terminais - Olhais
  ('OLHAL 10MM AMARELO', '10159', 0, '/lovable-uploads/olhalamarelo.png', 'terminais', 'Terminal olhal 10mm amarelo', true, false, 6),
  ('OLHAL 10MM AZUL', '10160', 0, '/lovable-uploads/olhalazul.png', 'terminais', 'Terminal olhal 10mm azul', true, false, 6),
  ('OLHAL 10MM VERMELHO', '10161', 0, '/lovable-uploads/olhalvermelho.png', 'terminais', 'Terminal olhal 10mm vermelho', true, false, 6),
  ('OLHAL 16MM', '10162', 0, '/lovable-uploads/olhal16.png', 'terminais', 'Terminal olhal 16mm', true, false, 6),
  
  -- Tomadas Industriais - Plugs
  ('PLUG 2P + T 16A 200-250V', '7898942135019', NULL, '/lovable-uploads/femea16.png', 'tomadas-industriais', 'Plug industrial 2P + T 16A 200-250V', true, true, 8),
  ('PLUG 2P + T 32A 200-250V', '7898942135026', NULL, '/lovable-uploads/femea32.png', 'tomadas-industriais', 'Plug industrial 2P + T 32A 200-250V', true, false, 7),
  ('PLUG 3P + T 16A 380-415V', '7898942135033', NULL, '/lovable-uploads/femea16.png', 'tomadas-industriais', 'Plug industrial 3P + T 16A 380-415V', true, false, 7),
  ('PLUG 3P + T 32A 380-415V', '7898942135040', NULL, '/lovable-uploads/femea32.png', 'tomadas-industriais', 'Plug industrial 3P + T 32A 380-415V', true, false, 7),
  
  -- Tomadas Industriais - Acopladores
  ('ACOPLADOR 2P + T 16A 200-250V', '7898942135057', NULL, '/lovable-uploads/acoplador.png', 'tomadas-industriais', 'Acoplador industrial 2P + T 16A 200-250V', true, false, 6),
  ('ACOPLADOR 2P + T 32A 200-250V', '7898942135064', NULL, '/lovable-uploads/acoplador.png', 'tomadas-industriais', 'Acoplador industrial 2P + T 32A 200-250V', true, false, 6),
  
  -- Informática
  ('CABO DE REDE CAT6', 'CAT6-001', 2.50, '/lovable-uploads/cat6.png', 'informatica', 'Cabo de rede Cat6 UTP para conexões Ethernet de alta velocidade', true, true, 8),
  ('CONECTOR RJ45', 'RJ45-001', 0.50, '/lovable-uploads/generico.png', 'informatica', 'Conector RJ45 para cabos de rede Ethernet', true, false, 6),
  
  -- Monitoramento
  ('CABO COAXIAL RG59', 'RG59-001', 3.20, '/lovable-uploads/rg59.png', 'monitoramento', 'Cabo coaxial RG59 para sistemas de CFTV e monitoramento', true, false, 7),
  ('CAMERA CFTV', 'CFTV-001', 120.00, '/lovable-uploads/cftv.png', 'monitoramento', 'Câmera para sistema de circuito fechado de TV', true, true, 8)
  
) AS p(name, code, price, image_url, category_name, description, in_stock, is_featured, popularity)
JOIN categories c ON c.name = p.category_name;