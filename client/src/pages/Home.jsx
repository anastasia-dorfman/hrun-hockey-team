import { useLoaderData } from "react-router-dom";
import Socials from "../components/shared/Socials";
import HeroSection from "../components/HeroSection";
import UpdatesSection from "../components/UpdatesSection";
import ProductsSection from "../components/ProductsSection";
import NewsSection from "../components/NewsSection";
import ContactFormSection from "../components/shared/ContactFormSection";
import customFetch from "../utils/customFetch.js";
import { shouldUseMockData } from "../utils/environment.js";
import { mockNews, mockProducts } from "../data/mockData.js";

export const loader = async ({ request }) => {
  try {
    if (shouldUseMockData) {
      return {
        data: {
          news: mockNews,
          products: mockProducts,
        },
      };
    }

    const [newsResponse, productsResponse] = await Promise.all([
      customFetch.get("/news"),
      customFetch.get("/products"),
    ]);

    return {
      data: {
        news: newsResponse.data.news,
        products: productsResponse.data.products,
      },
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Home = () => {
  const { data } = useLoaderData();
  const allNews = data.news || [];
  const allProducts = data.products || [];

  const sortedNews = allNews.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const latestNews = sortedNews.slice(0, 3);

  // Calculate total sold quantity and find most popular variant for each product
  const productsWithTotalSold = allProducts.map((product) => {
    const totalSoldQuantity = product.variants.reduce(
      (total, variant) => total + variant.soldQuantity,
      0
    );
    const mostPopularVariant = product.variants.reduce(
      (popular, variant) =>
        variant.soldQuantity > popular.soldQuantity ? variant : popular,
      product.variants[0]
    );

    return {
      ...product,
      totalSoldQuantity,
      mostPopularVariantPrice: mostPopularVariant.price,
    };
  });

  const sortedProducts = productsWithTotalSold.sort(
    (a, b) => b.totalSoldQuantity - a.totalSoldQuantity
  );

  const topProducts = sortedProducts.slice(0, 3);

  return (
    <div className="bg-primary">
      <HeroSection />
      <UpdatesSection />
      <ProductsSection topProducts={topProducts} />
      <NewsSection latestNews={latestNews} />
      <div id="contact-us-section">
        <ContactFormSection />
      </div>
    </div>
  );
};

export default Home;
