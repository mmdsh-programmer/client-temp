import { EArticleSchemaAuthorType, EArticleSchemaImageType, EArticleSchemaPublisherType, EArticleSchemaType } from "./enums";

export interface IOpenGraph {
  title: string;
  description: string;
  URL: string;
  author: string;
}

export interface ISeoIndexing {
  indexing: string;
  following: string;
  noarchive: boolean;
  nosnippet?: boolean;
}

export interface IArticleSchema {
  "@context": string;
  "@type": EArticleSchemaType;
  headline: string;
  image: {
    "@type": EArticleSchemaImageType;
    url: string;
    width?: string;
    height?: string;
  };
  author: {
    "@type": EArticleSchemaAuthorType;
    name: string;
  };
  publisher: {
    "@type": EArticleSchemaPublisherType;
    name: string;
    logo: {
      "@type": EArticleSchemaImageType;
      url: string;
      width?: string;
      height?: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  description?: string;
}

export interface ISeo {
  title: string;
  description: string;
  keywords: string;
  language: string;
  openGraph?: IOpenGraph;
  seoIndexing?: ISeoIndexing;
  canonicalUrl?: string;
  articleSchema?: IArticleSchema;
}

export type ISeoForm = ISeo & { pageUrl: string };

// Form data types for each SEO form component
export type SeoFormData = {
  title: string;
  description: string;
  keywords: string;
  language: string;
  canonicalUrl?: string;
};

export type OpenGraphFormData = {
  openGraph: {
    title: string;
    description: string;
    URL: string;
    author: string;
  };
};

export type IndexingFormData = {
  indexing: string;
  following: string;
  noarchive: boolean;
  nosnippet: boolean;
};

export type ArticleSchemaFormData = {
  "@type": EArticleSchemaType;
  headline: string;
  description?: string;
  image: {
    url: string;
    width?: string;
    height?: string;
  };
  author: {
    "@type": EArticleSchemaAuthorType;
    name: string;
  };
  publisher: {
    "@type": EArticleSchemaPublisherType;
    name: string;
    logo: {
      url: string;
      width?: string;
      height?: string;
    };
  };
  datePublished: string;
  dateModified?: string;
}; 