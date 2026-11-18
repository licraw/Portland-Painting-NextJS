create table public.resource_pages (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  summary text,
  category text not null,
  introduction text,
  sections jsonb not null default '[]'::jsonb,
  hero_image_url text,
  hero_image_alt text,
  download_label text,
  download_url text,
  related_service_label text,
  related_service_url text,
  status text not null default 'draft',
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint resource_pages_slug_format check (char_length(slug) between 1 and 160 and slug = lower(slug) and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint resource_pages_title_length check (char_length(btrim(title)) between 3 and 160),
  constraint resource_pages_summary_length check (summary is null or char_length(summary) <= 500),
  constraint resource_pages_category_length check (char_length(btrim(category)) between 2 and 80),
  constraint resource_pages_sections_shape check (jsonb_typeof(sections) = 'array' and jsonb_array_length(sections) <= 8),
  constraint resource_pages_status_value check (status in ('draft', 'published')),
  constraint resource_pages_publish_state check ((status = 'draft' and published_at is null) or (status = 'published' and published_at is not null)),
  constraint resource_pages_hero_image_pair check ((hero_image_url is null and hero_image_alt is null) or (hero_image_url is not null and hero_image_alt is not null)),
  constraint resource_pages_download_pair check ((download_url is null and download_label is null) or (download_url is not null and download_label is not null)),
  constraint resource_pages_related_service_pair check ((related_service_url is null and related_service_label is null) or (related_service_url is not null and related_service_label is not null))
);

comment on table public.resource_pages is 'HTML-first Resource Center pages with optional photography, PDF downloads, and service links.';
comment on column public.resource_pages.sections is 'Ordered JSON array of objects with heading and body string properties.';

create index resource_pages_public_index on public.resource_pages (published_at desc) where status = 'published';
create index resource_pages_category_index on public.resource_pages (category, published_at desc) where status = 'published';

create trigger set_resource_pages_updated_at before update on public.resource_pages for each row execute function public.set_current_timestamp_updated_at();

alter table public.resource_pages enable row level security;
revoke all on table public.resource_pages from anon, authenticated;
grant select on table public.resource_pages to anon, authenticated;

create policy "published resource pages are public"
on public.resource_pages for select to anon, authenticated
using (status = 'published' and published_at <= now());
