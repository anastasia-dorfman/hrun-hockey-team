import { useEffect } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";
import customFetch from "../utils/customFetch";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";

const Main = styled.main`
  background-color: ${(props) =>
    props.$isAccountPage ? "var(--bg-secondary)" : "inherit"};
`;

// export const loader = async () => {
//   try {
//     const { data } = await customFetch("/user");
//     console.log("User data loaded in Layout:", data);
//     return data;
//   } catch (error) {
//     return null;
//   }
// };

export default function Layout() {
  // const userData = useLoaderData();
  const { theme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAccountPage = location.pathname.includes("/account");

  useEffect(() => {
    const imageUrl = `url(/assets/images/main-picture_${theme}.png)`;
    document.documentElement.style.setProperty("--main-picture", imageUrl);
  }, [theme]);

  return (
    // <UserProvider initialUser={userData}>
    <UserProvider>
      <div className={`site-wrapper ${theme}`}>
        <ScrollToTop />
        <Header isHomePage={isHomePage} />
        <Main $isAccountPage={isAccountPage}>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </UserProvider>
  );
}
