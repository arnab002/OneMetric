import NewsFeed from './SingleNews'

export async function generateStaticParams() {
  const stocks = [
    { stockName: 'AAPL', scripCd: '123456', Id: '33c5fdcf-4fb9-45c9-b612-563413c94649' },
    { stockName: 'GOOGL', scripCd: '789012', Id: '33c5fdcf-4fb9-45c9-b612-563413c94769' }
  ];

  return stocks.map((stock) => ({
    stockName: stock.stockName,
    scripCd: stock.scripCd,
    Id: stock.Id
  }));
}

export default function Page({ params }: { params: { stockName: string, scripCd: string, Id: string } }) {
  return <NewsFeed initialStockName={params.stockName} initialScripCd={params.scripCd} initialId={params.Id}/>;
}