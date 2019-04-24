import '../styles/index.css'
import Layout from '../components/Layout'
import RecentArticles from '../components/RecentArticles';
import Grid  from '../components/Grid';
import Clock from '../components/Clock';
import { Formula } from '../models/formula';

export default () => {

  var range: number[] = [];
  range.push(1);
  range.push(2);
  range.push(3);

  let initialData = [{
    ticker: "AAPL", bid: 3400, ask: 3500
}, {
    ticker: "GOOG", bid: 310, ask: 320
}, {
    ticker: "MSFT", bid: 700, ask: 720
}];

  return <Layout title="ETLSheets">
    <p>Test test test...</p>

    <div className="mt-4">
      <Clock />
    </div>
{/* 
    {range.map(i => <Grid key={i} title={`Initial Data ${i}`} rowData={[{
            ticker: "AAPL", bid: 3400, ask: 3500
        }, {
            ticker: "GOOG", bid: 310, ask: 320
        }, {
            ticker: "MSFT", bid: 700, ask: 720
        }]} />)} */}

    <Grid title="Initial Data" rowData={initialData} />
        
    <Grid title="Transformation 1 " rowData={initialData} formula={new Formula('mid','($bid + $ask) / 2')} />
  </Layout>
}
