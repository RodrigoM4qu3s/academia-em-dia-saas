
-- Tabela de usuários que se vincula à tabela de autenticação do Supabase
create table public.usuarios (
  id uuid primary key references auth.users on delete cascade,
  nome text,
  role text default 'Administrador',
  academy_id uuid,
  created_at timestamp default now()
);

-- Tabela de academias para implementação multi-tenant
create table public.academias (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cnpj text,
  endereco text,
  created_at timestamp default now()
);

-- Políticas de segurança (Row Level Security)
alter table usuarios enable row level security;
create policy "seleciona_próprio_usuario"
  on usuarios for select using ( auth.uid() = id );

alter table academias enable row level security;
create policy "academia_visível_para_usuários_vinculados"
  on academias for select using (
    id IN (
      SELECT academy_id FROM usuarios WHERE id = auth.uid()
    )
  );
