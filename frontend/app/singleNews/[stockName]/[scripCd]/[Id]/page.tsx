import axios from 'axios';
import NewsFeed from './SingleNews';

interface StockNewsItem {
  stock_long_name: string;
  scrip_cd: string;
  news_id: string;
}

interface StockNewsResponse {
  data: StockNewsItem[];
}

export async function generateStaticParams(): Promise<Array<{
  stockName: string;
  scripCd: string;
  Id: string;
}>> {
  const stockNews = await fetchStocksFromAPI();

  // Ensure we have unique combinations of stockName, scripCd, and Id
  const uniqueParams = Array.from(new Set(stockNews.map(item => {
    const sanitizedStockName = sanitizeAndCapitalizeStockName(item.stock_long_name);
    
    // console.log('Generating Params:', { sanitizedStockName, scripCd: item.scrip_cd, Id: item.news_id }); // Debugging

    return JSON.stringify({
      stockName: sanitizedStockName,
      scripCd: item.scrip_cd,
      Id: item.news_id
    });
  }))).map(item => JSON.parse(item));

  return uniqueParams;
}

// Helper function to capitalize each word and sanitize the stock name
function sanitizeAndCapitalizeStockName(stockName: string): string {
  // Remove any trailing period and ensure no trailing special characters
  const trimmedName = stockName.trim().replace(/\.$/, '');

  // Capitalize each word and replace spaces or special characters with dashes
  return trimmedName
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, ''); // Remove any remaining non-alphanumeric characters except for dashes
}

async function fetchStocksFromAPI(): Promise<StockNewsItem[]> {
  try {
    // Implement pagination or increase limit if necessary
    const response = await axios.get<StockNewsResponse>(`${process.env.NEXT_PUBLIC_API_URL}/news`);

    if (!response.data || !Array.isArray(response.data.data)) {
      console.error('Unexpected API response structure:', response.data);
      return [];
    }

    return response.data.data.map(item => ({
      stock_long_name: String(item.stock_long_name),
      scrip_cd: String(item.scrip_cd),
      news_id: String(item.news_id)
    }));
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return [];
  }
}

interface PageProps {
  params: {
    stockName: string;
    scripCd: string;
    Id: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  try {
    // Decode and format stock name by replacing dashes with spaces for display
    const decodedStockName = decodeURIComponent(params.stockName).replace(/-/g, ' ');

    return <NewsFeed initialStockName={decodedStockName} initialScripCd={params.scripCd} initialId={params.Id} />;
  } catch (error) {
    console.error('Error rendering page:', error);
    return <div>Error: Could not load the news page. Please try again later.</div>;
  }
}
