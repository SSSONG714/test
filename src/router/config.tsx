import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import NewsListPage from "../pages/news/page";
import ArticleDetailPage from "../pages/article/page";
import WordCloudPage from "../pages/wordcloud/page";
import TrendsPage from "../pages/trends/page";
import TimelinePage from "../pages/timeline/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/news",
    element: <NewsListPage />,
  },
  {
    path: "/news/:id",
    element: <ArticleDetailPage />,
  },
  {
    path: "/wordcloud",
    element: <WordCloudPage />,
  },
  {
    path: "/trends",
    element: <TrendsPage />,
  },
  {
    path: "/timeline",
    element: <TimelinePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
