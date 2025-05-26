export interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    private: boolean;
    updated_at: string;
}
