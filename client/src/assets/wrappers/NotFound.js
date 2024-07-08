import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  padding: 2rem;

  .not-found-container {
    text-align: center;
    max-width: 600px;
  }

  h1 {
    font-size: 2.5rem;
    color: var(--text-color);
    margin-bottom: 2rem;
  }

  .link-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-500);
    color: var(--white);
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
    font-weight: 500;

    &:hover {
      background-color: var(--primary-700);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }

    .link-button {
      padding: 0.5rem 1rem;
    }
  }
`;

export default Wrapper;