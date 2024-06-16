export type ArticleLaunch = {
  launch_id: string;
  provider: string;
};

export type ArticleEvent = {
  event_id: number;
  provider: string;
};

export type Article = {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured?: boolean;
  launches: ArticleLaunch[];
  events: ArticleEvent[];
};

export type ApiArticleResponse = {
  count: number;
  next?: string;
  previous?: string;
  results: Article[];
};
