-- Add air conditioning products (Ferramentas and Cabos subcategories)
INSERT INTO public.products (name, code, price, image_url, subcategory, in_stock, is_featured) VALUES
('SERRA COPO AÇO RÁPIDO 32MM 1.1/4', '6883A', 20.00, '/lovable-uploads/serracopo32mm.png', 'Ferramentas', true, false),
('SERRA COPO DIAMANTADA 40MM ASTE 175MM', '7899807214153', 100.00, '/lovable-uploads/serracopo40mm.png', 'Ferramentas', true, false),
('SERRA COPO DIAMANTADA 53MM', '7897143401442', 268.00, '/lovable-uploads/serracopo53mm.png', 'Ferramentas', true, false),
('FLANGEADOR PARA TUBO DE COBRE', '7895315001131', 132.00, '/lovable-uploads/flangeador.png', 'Ferramentas', true, false),
('CABO PARALELO 2x2,5MM', '03856A', 6.50, '/lovable-uploads/paralelo2x25mm.png', 'Cabos', true, false),
('CABO PARALELO PRETO 2x2,5MM', '13320A', 7.50, '/lovable-uploads/paralelopreto2x25mm.png', 'Cabos', true, false);

-- Add electrical installation products (Disjuntores subcategory) - excluding all duplicates
INSERT INTO public.products (name, code, price, image_url, subcategory, in_stock, is_featured) VALUES
('DISJUNTOR MONO 6A C WEG', '7909522567707', 23.00, '/lovable-uploads/wegmono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 16A C WEG', '7909522567714', 14.00, '/lovable-uploads/wegmono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 20A C WEG', '7909522567721', 12.00, '/lovable-uploads/wegmono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 20A C TRAMONTINA', '7891435964288', 27.00, '/lovable-uploads/tramontinamono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 25A C WEG', '7909522667738', 24.00, '/lovable-uploads/wegmono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 25A B SCHNEIDER', '7891341466937', 14.00, '/lovable-uploads/schneidermono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 32A C WEG', '7909522567745', 14.00, '/lovable-uploads/wegmono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 32A C TRAMONTINA', '7891435094329', 15.70, '/lovable-uploads/tramontinamono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 40A C WEG', '7909522567752', 19.80, '/lovable-uploads/wegmono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 40A C TRAMONTINA - Modelo 1', '7891435094336A', 19.90, '/lovable-uploads/tramontinamono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 40A C TRAMONTINA - Modelo 2', '7891435964318', 28.70, '/lovable-uploads/tramontinamono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 40A B SCHNEIDER', '7891341467224', 28.00, '/lovable-uploads/schneidermono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 50A C WEG', '7891435094336B', 19.00, '/lovable-uploads/wegmono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 50A C TRAMONTINA', '100232514A', 20.00, '/lovable-uploads/tramontinamono.png', 'Disjuntores', true, false),
('DISJUNTOR MONO 63A C WEG', '7909522567776', 20.00, '/lovable-uploads/wegmono.png', 'Disjuntores', true, false),
('DISJUNTOR BIF. 16A C WEG', '7909522567820', 45.00, '/lovable-uploads/wegbif.png', 'Disjuntores', true, false),
('DISJUNTOR BIF. 20A C WEG', '7909522567837', 45.00, '/lovable-uploads/wegbif.png', 'Disjuntores', true, false),
('DISJUNTOR BIF. 32A C WEG', '7909522567851', 45.00, '/lovable-uploads/wegbif.png', 'Disjuntores', true, false),
('DISJUNTOR BIF. 40A C WEG', '7909522567868', 48.00, '/lovable-uploads/wegbif.png', 'Disjuntores', true, false),
('DISJUNTOR BIF. 50A C TRAMONTINA', '7891435964486', 85.00, '/lovable-uploads/tramontinabif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 20A C SCHNEIDER', '00426C', 65.00, '/lovable-uploads/schneidertrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 25A C WEG', '7909522567950', 55.00, '/lovable-uploads/wegtrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 32A C TRAMONTINA', '7891435964622', 98.00, '/lovable-uploads/tramontinatrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 40A C WEG', '7890355193693', 54.00, '/lovable-uploads/wegtrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 40A C SCHNEIDER', '04926C', 65.00, '/lovable-uploads/schneidertrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 40A C SOPRANO', '7892327540320', 79.00, '/lovable-uploads/sopranotrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 50A C WEG', '7909522567981', 54.00, '/lovable-uploads/wegtrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 50A C SOPRANO', '7892327540351', 72.00, '/lovable-uploads/sopranotrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 63A C WEG', '7909522567998', 68.00, '/lovable-uploads/wegtrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 80A C WEG', '7890355193938', 199.00, '/lovable-uploads/wegtrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 100A C WEG', '10062A', 246.00, '/lovable-uploads/wegtrif.png', 'Disjuntores', true, false),
('DISJUNTOR TRIF. 125A CAIXA MOLDADA TRAMONTINA', '7891435963335', 268.00, '/lovable-uploads/caixamoldada.png', 'Disjuntores', true, false);

-- Add DPS and IDR products
INSERT INTO public.products (name, code, price, image_url, subcategory, in_stock, is_featured) VALUES
('DPS CLAMPER 275VAC 20Ka', '7897348049548', 52.00, '/lovable-uploads/dps.png', 'DPS', true, false),
('DPS CLAMPER 275VAC 20Ka - Modelo 2', '7899495242964', 60.00, '/lovable-uploads/dps.png', 'DPS', true, false),
('IDR 2P 25A 30Ma SOPRANO', '7892327542454', 105.00, '/lovable-uploads/drmono.png', 'IDR', true, false),
('IDR 2P 40A 30Ma SOPRANO', '7892327542478', 105.00, '/lovable-uploads/drmono.png', 'IDR', true, false),
('IDR 2P 63A 30Ma SOPRANO', '7892327542492', 125.00, '/lovable-uploads/drmono.png', 'IDR', true, false),
('IDR 4P 25A 30Ma SOPRANO', '12715A', 159.00, '/lovable-uploads/drtetra.png', 'IDR', true, false),
('IDR 4P 25A 30Ma TRAMONTINA', '7891435960952', 175.00, '/lovable-uploads/drtramontina.png', 'IDR', true, false),
('IDR 4P 40A 30Ma SOPRANO', '7892327542485', 159.00, '/lovable-uploads/drtetra.png', 'IDR', true, false),
('IDR SOPRANO 63A 30Ma SOPRANO', '7892327542508', 175.00, '/lovable-uploads/drtetra.png', 'IDR', true, false);