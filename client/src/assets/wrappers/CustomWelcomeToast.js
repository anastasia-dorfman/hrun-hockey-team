import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 6rem;
  display: flex;
  width: 40vw;
  max-width: 90vw;
  overflow: hidden;
  background-color: var(--bg-blue);
  border: 1px solid var(--text-ocean);
  border-radius: 1rem;

  .image-container {
    width: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content-container {
    width: 50%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--bg-blue);
  }

  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-gray);
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: var(--text-dark-gray);
    }
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--text-dark);
  }

  .subtitle {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--text-dark);
  }

  .description {
    font-size: 0.875rem;
    margin-bottom: 1rem;
    color: var(--text-gray);
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .sign-up-button {
  }

  .sign-in-button {
  }

  .divider {
    display: flex;
    align-items: center;
    color: var(--text-gray);
    font-size: 0.75rem;
    margin-bottom: 1rem;
    &::before,
    &::after {
      content: "";
      flex-grow: 1;
      background-color: var(--border-gray);
      height: 1px;
      margin: 0 0.5rem;
    }
  }

  .social-button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .social-button {
    padding: 0.5rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &.facebook {
      background-color: var(--bg-facebook);
      color: var(--text-white);
      &:hover {
        background-color: var(--bg-dark-facebook);
      }
    }
    &.google {
      background-color: var(--bg-google);
      color: var(--text-white);
      &:hover {
        background-color: var(--bg-dark-google);
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .image-container,
    .content-container {
      width: 100%;
    }
    .image-container {
      height: 200px;
    }
  }
`;

export default Wrapper;
