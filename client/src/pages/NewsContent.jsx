import { useLoaderData, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import customFetch from "../utils/customFetch";
import NewsCardNews from "../components/NewsCardNews";
import Wrapper from "../assets/wrappers/NewsContent";

// export const loader = async ({ params }) => {
//   const newsId = params.id;

//   try {
//     const { oneNewsResponse, allNewsResponse } = await Promise.all([
//       customFetch.get(`/news/${newsId}`),
//       customFetch.get("/news"),
//     ]);
//     return {
//       data: {
//         mainNews: oneNewsResponse.data.news,
//         allNews: allNewsResponse.data.news,
//       },
//     };
//   } catch (error) {
//     toast.error(error?.response?.data?.msg);
//     return { error };
//   }
// };

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/news");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const NewsContent = () => {
  const { data, error } = useLoaderData();
  const news = data?.news || null;
  const { id } = useParams();
  const newsId = parseInt(id);

  if (error) return <div>Error loading news: {error.message}</div>;
  if (!news) return <div>Loading...</div>;

  const mainNews = news.find((n) => n.newsId === newsId);
  const topNews = news
    .filter((n) => n.newsId !== newsId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <Wrapper>
      <div className="title-container">
        <h1>{mainNews.title}</h1>
        <div className="top-news-title">
          <h2>Top news</h2>
          <h3>{topNews[0].title}</h3>
        </div>
      </div>
      <div className="main-container">
        <div className="main-news">
          <img src={mainNews.images[0]} alt="News Image" />
          <div className="b1">
            {mainNews.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="top-news">
          <NewsCardNews
            id={topNews[0].newsId}
            img={topNews[0].images[0]}
            date={topNews[0].date}
            title={topNews[0].title}
            content={topNews[0].content}
            showTitle={false}
          />
          <NewsCardNews
            id={topNews[1].newsId}
            img={topNews[1].images[0]}
            date={topNews[1].date}
            title={topNews[1].title}
            content={topNews[1].content}
            showTitle={true}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default NewsContent;
