export type News = {
  articlesDescription: ArticlesDescription;
  articlesName: string;
  articlesShortDescription: string;
  authors: Authors[];
  canonicalSupplier: string;
  dateModified: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  files: Files[];
  minutesToRead: number;
  publishedAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
};

export type Files = {
  contentType: string;
  filesDescription: string;
  filesName: null;
  filesTitle: null;
  urlCdn: string;
};

export type Authors = {
  authorName: string;
};

export type ArticlesDescription = string;
