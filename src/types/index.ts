export interface Video {
  id: string;
  title: string;
  concept: string;
  description: string;
  duration: string;
  source: string;
  thumbnail?: string;
  helpful?: boolean;
}