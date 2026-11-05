create table if not exists site_copy (
  id integer primary key check (id = 1),
  body text not null,
  updated_at timestamptz not null default now()
);

create table if not exists site_admins (
  user_id text primary key,
  created_at timestamptz not null default now()
);
