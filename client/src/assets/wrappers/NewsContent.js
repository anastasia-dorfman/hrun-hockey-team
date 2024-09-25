import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1,
  h2,
  h3 {
    margin: 0;
  }

  .title-container,
  .main-container {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }

  .title-container {
    align-items: flex-end;
    margin-top: 2rem;

    h1 {
      flex: 5;
    }

    .top-news-title {
      flex: 3;
      h2 {
        text-align: center;
      }
    }
  }

  .main-container {
    .main-news {
      flex: 5;

      img {
        width: 100%;
        height: auto;
      }
    }

    .top-news {
      flex: 3;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      div {
        display: flex;
        flex-direction: column;
        height: fit-content;

        .button-container {
          margin-top: auto;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .title-container,
    .main-container {
      flex-direction: column;
    }
  }

  @media (max-width: 510px) {
    padding: 0 2rem;
  }
`;

export default Wrapper;
