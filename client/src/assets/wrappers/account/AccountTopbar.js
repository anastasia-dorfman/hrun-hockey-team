import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .welcome-message-container {
    flex: 1 1 70%;
    min-width: fit-content;
    max-width: 800px;
    padding: 2rem;
    padding-right: 0;
    border-radius: 1.3rem;
    border: 1px solid var(--black-20);
    box-shadow: var(--shadow);
    background-color: var(--bg-primary);
    margin-right: 1rem;

    h3 {
      text-align: start;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .image-container {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;

    .username {
      padding: 0;
      margin: 0;
      white-space: nowrap;
    }

    img {
      width: 70px;
      flex-shrink: 0;
    }
  }

  @media (max-width: 1024px) {
    .welcome-message-container {
      padding: 2rem 1rem;

      h3 {
        white-space: unset;
      }
    }

    .image-container {
      flex-direction: column;
      width: fit-content;
      align-items: end;
      gap: 0;

      .username {
        white-space: normal;
        text-align: right;
        max-width: 100px;
      }
    }
  }

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: end;

    .welcome-message-container {
      display: none;
    }

    .image-container {
      flex-direction: row;
      align-items: center;
      justify-content: end;
      gap: 1rem;

      .username {
        white-space: nowrap;
        text-align: right;
        max-width: unset;
        /* place-items: center; */
      }

      img {
        /* place-items: center; */
      }
    }
  }

  @media (max-width: 768px) {
    .welcome-message-container,
    .image-container {
    }

    .image-container {
      justify-content: center;
      margin-top: 1rem;

      .username {
      }
    }
  }
  @media (max-width: 510px) {
    .image-container {
      .username {
        white-space: normal;
        text-align: right;
      }
    }
  }
`;
export default Wrapper;
