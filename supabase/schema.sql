-- Cole este script uma vez no SQL Editor do projeto.
-- O site só lê a tabela. Cadastro, edição e exclusão ficam no Supabase Studio.

-- 1. Criação do tipo ENUM para garantir a integridade do status
CREATE TYPE cat_status AS ENUM ('disponivel', 'em_processo', 'adotado');

-- 2. Criação da tabela de gatos
CREATE TABLE cats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE,
    name TEXT NOT NULL,
    age_description TEXT,
    sex TEXT,
    description TEXT,
    personality TEXT,
    health_info TEXT,
    photos TEXT[] DEFAULT '{}',
    whatsapp_contacts TEXT[] DEFAULT '{}', -- Números de quem cuida deste gato (DDI + DDD + número)
    status cat_status DEFAULT 'disponivel',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Função e Trigger para gerar o slug automaticamente
CREATE OR REPLACE FUNCTION generate_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog
AS $$
BEGIN
  -- Minúsculas, sem acento, espaços viram hífen e um sufixo curto evita slug repetido
  NEW.slug := lower(translate(
    NEW.name,
    'ÁÀÂÃÄáàâãäÉÈÊËéèêëÍÌÎÏíìîïÓÒÔÕÖóòôõöÚÙÛÜúùûüÇçÑñ',
    'AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuCcNn'
  ));
  NEW.slug := regexp_replace(NEW.slug, '\s+', '-', 'g');
  NEW.slug := regexp_replace(NEW.slug, '[^a-z0-9\-]', '', 'g');
  NEW.slug := NEW.slug || '-' || substr(md5(random()::text), 1, 4);
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_cat_slug
BEFORE INSERT ON cats
FOR EACH ROW
WHEN (NEW.slug IS NULL)
EXECUTE FUNCTION generate_slug();

-- 4. Comentários na tabela para facilitar o entendimento no painel
COMMENT ON TABLE cats IS 'Catálogo principal de gatos para adoção';
COMMENT ON COLUMN cats.slug IS 'Gerado automaticamente. Parte legível da URL (ex: mingau-a1b2)';
COMMENT ON COLUMN cats.photos IS 'Array contendo as URLs absolutas das fotos';
COMMENT ON COLUMN cats.whatsapp_contacts IS 'Números de WhatsApp de quem cuida do gato. Cada item é somente números + DDI + DDD';

-- 5. Segurança (RLS - Row Level Security)
-- O RLS é ativado. Nenhuma política de escrita (INSERT/UPDATE/DELETE) será criada via API.
ALTER TABLE cats ENABLE ROW LEVEL SECURITY;

-- 6. Política de Leitura Pública
-- Permite que o Next.js consulte a tabela via Data API de forma anônima.
CREATE POLICY "Permitir leitura publica dos gatos"
ON cats FOR SELECT
USING (true);

GRANT ALL ON public.cats TO service_role;
-- Garante que o anon possa ler no nível da tabela (em conjunto com o RLS)
GRANT SELECT ON public.cats TO anon;
-- Garante uso geral ao postgres (admin do painel)
GRANT ALL ON public.cats TO postgres;

-- A função do slug não fica exposta como RPC. O trigger do painel continua a chamá-la.
REVOKE ALL ON FUNCTION public.generate_slug() FROM PUBLIC, anon, authenticated;
