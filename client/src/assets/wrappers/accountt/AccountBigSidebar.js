import styled from "styled-components";

const Wrapper = styled.section`
  height: 580pt;
  width: 258pt;
  padding: 0 1rem;
  margin: 0 1rem;
  border-radius: 1.3rem;
  border: 1px solid var(--black-20);
  box-shadow: var(--shadow);
  background-color: var(--bg-primary);
  box-sizing: border-box;

  .sidebar-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .logo-container {
    width: 100%;
    padding: 2rem 3rem;
    border-bottom: 1px solid var(--slate-200);
    display: flex;
    justify-content: center;
    box-sizing: border-box;

    img {
      width: 120px;
    }
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    width: 100%;
  }

  .primary,
  .secondary {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    padding: 2rem 0;
  }

  .secondary {
    .nav-link:nth-last-child(2) {
      border-bottom: 1px solid var(--green-blue);
      margin-bottom: 0.5rem;
      padding-bottom: 1.5rem;
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    color: var(--color-odg-gb);
    padding: 1rem;
    width: 100%;
    transition: padding-left 0.3s ease-in-out, background-color 0.3s ease-in-out;

    &.active {
      color: var(--text-ocean);
      background-color: var(--bg-secondary);
      border-radius: 0.5rem;
    }

    &:hover {
      padding-left: 2rem;
      color: var(--text-ocean);
      transition: var(--transition);
    }
  }

  .icon {
    font-size: 2rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
  }

  @media (min-width: 992px) {
    width: 220pt;
  }
`;

export default Wrapper;
