-- 创建规则相关表
create table public.platform_rules (
    id uuid default uuid_generate_v4() primary key,
    platform_id uuid references public.platforms(id) on delete cascade,
    title text not null,
    category text not null,
    summary text,
    content text,
    scope text,
    severity text not null,
    effective_date timestamp with time zone,
    status text not null default 'active',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.rule_categories (
    id uuid default uuid_generate_v4() primary key,
    platform_id uuid references public.platforms(id) on delete cascade,
    name text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.rule_changes (
    id uuid default uuid_generate_v4() primary key,
    platform_id uuid references public.platforms(id) on delete cascade,
    rule_id uuid references public.platform_rules(id) on delete cascade,
    type text not null,
    title text not null,
    description text,
    old_value jsonb,
    new_value jsonb,
    affected_products integer,
    conversion_impact text,
    date timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.rule_impacts (
    id uuid default uuid_generate_v4() primary key,
    platform_id uuid references public.platforms(id) on delete cascade,
    date_range text not null,
    affected_products integer not null,
    product_percentage numeric not null,
    conversion_change numeric not null,
    traffic_impact numeric not null,
    compliance_rate numeric not null,
    compliance_improvement numeric not null,
    trends jsonb not null,
    category_impacts jsonb not null,
    risk_analysis jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.operation_guides (
    id uuid default uuid_generate_v4() primary key,
    platform_id uuid references public.platforms(id) on delete cascade,
    category_id uuid references public.guide_categories(id) on delete cascade,
    title text not null,
    description text,
    priority text not null,
    action text,
    impact text,
    deadline timestamp with time zone,
    is_summary boolean default false,
    icon text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.guide_categories (
    id uuid default uuid_generate_v4() primary key,
    platform_id uuid references public.platforms(id) on delete cascade,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.rule_guide_relations (
    guide_id uuid references public.operation_guides(id) on delete cascade,
    rule_id uuid references public.platform_rules(id) on delete cascade,
    primary key (guide_id, rule_id)
);

-- 创建索引
create index platform_rules_platform_id_idx on public.platform_rules(platform_id);
create index rule_changes_platform_id_idx on public.rule_changes(platform_id);
create index rule_impacts_platform_id_idx on public.rule_impacts(platform_id);
create index operation_guides_platform_id_idx on public.operation_guides(platform_id);

-- 启用 RLS
alter table public.platform_rules enable row level security;
alter table public.rule_categories enable row level security;
alter table public.rule_changes enable row level security;
alter table public.rule_impacts enable row level security;
alter table public.operation_guides enable row level security;
alter table public.guide_categories enable row level security;
alter table public.rule_guide_relations enable row level security;

-- 创建策略
create policy "Enable read access for authenticated users"
on public.platform_rules for select
to authenticated
using (true);

-- 对其他表创建类似的策略...