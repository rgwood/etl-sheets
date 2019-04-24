import '../styles/index.css'
import Layout from '../components/Layout'
import RecentArticles from '../components/RecentArticles';
import Grid from '../components/Grid';
import Clock from '../components/Clock';

export default () => {
  return <Layout title="ETLSheets">
    <p>Test test test...</p>

    <div className="mt-4">
      <Clock />
    </div>
    <div className="m-2 text-lg text-blue">
      Input Data
    </div>
    <Grid/>
  </Layout>
}
