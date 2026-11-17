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
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

export type ProjectStory =
  Database["public"]["Tables"]["project_stories"]["Row"];
