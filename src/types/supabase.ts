export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      project_stories: {
        Row: {
          approach: string | null;
          created_at: string;
          featured: boolean;
          findings: string | null;
          id: number;
          location: string | null;
          preparation: string | null;
          problem: string | null;
          project_date: string | null;
          published_at: string | null;
          result: string | null;
          service_type: string | null;
          slug: string;
          status: string;
          summary: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          approach?: string | null;
          created_at?: string;
          featured?: boolean;
          findings?: string | null;
          id?: never;
          location?: string | null;
          preparation?: string | null;
          problem?: string | null;
          project_date?: string | null;
          published_at?: string | null;
          result?: string | null;
          service_type?: string | null;
          slug: string;
          status?: string;
          summary?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          approach?: string | null;
          created_at?: string;
          featured?: boolean;
          findings?: string | null;
          id?: never;
          location?: string | null;
          preparation?: string | null;
          problem?: string | null;
          project_date?: string | null;
          published_at?: string | null;
          result?: string | null;
          service_type?: string | null;
          slug?: string;
          status?: string;
          summary?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_story_images: {
        Row: {
          alt_text: string;
          caption: string | null;
          created_at: string;
          height: number | null;
          id: number;
          is_cover: boolean;
          project_story_id: number;
          sort_order: number;
          storage_path: string;
          updated_at: string;
          width: number | null;
        };
        Insert: {
          alt_text?: string;
          caption?: string | null;
          created_at?: string;
          height?: number | null;
          id?: never;
          is_cover?: boolean;
          project_story_id: number;
          sort_order?: number;
          storage_path: string;
          updated_at?: string;
          width?: number | null;
        };
        Update: {
          alt_text?: string;
          caption?: string | null;
          created_at?: string;
          height?: number | null;
          id?: never;
          is_cover?: boolean;
          project_story_id?: number;
          sort_order?: number;
          storage_path?: string;
          updated_at?: string;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_story_images_project_story_id_fkey";
            columns: ["project_story_id"];
            isOneToOne: false;
            referencedRelation: "project_stories";
            referencedColumns: ["id"];
          },
        ];
      };
      resource_pages: {
        Row: {
          category: string;
          created_at: string;
          download_label: string | null;
          download_url: string | null;
          featured: boolean;
          hero_image_alt: string | null;
          hero_image_url: string | null;
          id: number;
          introduction: string | null;
          published_at: string | null;
          related_service_label: string | null;
          related_service_url: string | null;
          sections: Json;
          slug: string;
          status: string;
          summary: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: string;
          download_label?: string | null;
          download_url?: string | null;
          featured?: boolean;
          hero_image_alt?: string | null;
          hero_image_url?: string | null;
          id?: never;
          introduction?: string | null;
          published_at?: string | null;
          related_service_label?: string | null;
          related_service_url?: string | null;
          sections?: Json;
          slug: string;
          status?: string;
          summary?: string | null;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["resource_pages"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

export type ProjectStory =
  Database["public"]["Tables"]["project_stories"]["Row"];
export type ProjectStoryImage =
  Database["public"]["Tables"]["project_story_images"]["Row"];
export type ResourcePage =
  Database["public"]["Tables"]["resource_pages"]["Row"];
