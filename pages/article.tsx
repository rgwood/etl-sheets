import '../styles/index.css'
import Layout from '../components/Layout'
import { loadFullArticle } from '../services/data.service';
import { ArticleModel } from '../models/article';
import * as moment from 'moment';
import { NextFunctionComponent, NextContext } from 'next';
import ReactMarkdown from 'react-markdown';

const Article: NextFunctionComponent<{article: ArticleModel}> = ({article}) => 
{
  return <Layout title={article.name} topRightText={article.date ? moment(article.date).format('MMMM D, YYYY') : undefined}>
    <div className="mt-3" />
    <p><a href='http://localhost:3000/article?id=1'>Link</a></p>
    <p className="mt-3">
      <ReactMarkdown>{article.description}</ReactMarkdown>
    </p>
    <p>{article.url ? article.url : ''}</p>
  </Layout>
};

Article.getInitialProps = async function( {query}: NextContext) {
  const {id} = query;
  if(!id) {
    throw Error("ID not specified");
  }

  const idNum = Number.parseInt(id as string);
  const ret = await loadFullArticle(idNum);
  return {article: ret};
};

export default Article;
