-- Create platforms table
create table public.platforms (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    type text not null,
    status text not null,
    api_key text,
    api_secret text,
    last_sync timestamp with time zone,
    sync_status text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create analytics table
create table public.analytics (
    id uuid default uuid_generate_v4() primary key,
    platform_id uuid references public.platforms(id) on delete cascade,
    type text not null,
    date_range text not null,
    data jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create realtime_data table
create table public.realtime_data (
    id uuid default uuid_generate_v4() primary key,
    platform_id uuid references public.platforms(id) on delete cascade,
    data jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index analytics_platform_id_type_date_range_idx on public.analytics(platform_id, type, date_range);
create index realtime_data_platform_id_idx on public.realtime_data(platform_id);

-- Enable Row Level Security
alter table public.platforms enable row level security;
alter table public.analytics enable row level security;
alter table public.realtime_data enable row level security;

-- Create RLS policies
create policy "Enable read access for authenticated users"
on public.platforms for select
to authenticated
using (true);

create policy "Enable read access for authenticated users"
on public.analytics for select
to authenticated
using (true);

create policy "Enable read access for authenticated users"
on public.realtime_data for select
to authenticated
using (true);