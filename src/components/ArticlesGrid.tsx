import React from 'react';
import { Article } from '../types/article';
import styled from 'styled-components';

interface ArticleGridProps {
  articles: Article[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  gap: 2px;
  margin: 6px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const GridItem = styled.div`
  padding: 4px;
`;

const Heading = styled.h2`
  font-size: 1rem;
  color: white;
  text-align: start;
  text-overflow: ellipsis;
  padding-right: 5px;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
  margin-bottom: 5px;

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Subtitle = styled.h3`
  text-align: start;
  font-size: 0.75rem;
  margin: 0 0 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  color: white;
  opacity: 60%;
`;

const Image = styled.img`
  object-fit: cover;
  height: 150px;
  width: 100%;
  border-radius: 5px;
`;

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  if (articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <Grid>
      {articles.map((article) => (
        <GridItem key={article.id}>
          <Image src={article.image_url} alt={article.title} />
          <Heading>
            <a href={article.url} target='_blank' rel='noopener noreferrer'>
              {article.title}
            </a>
          </Heading>
          <Subtitle>{article.news_site}</Subtitle>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ArticleGrid;
