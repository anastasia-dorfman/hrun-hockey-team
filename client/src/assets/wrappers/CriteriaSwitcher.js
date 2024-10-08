import styled from "styled-components";

const Wrapper = styled.ul`
  list-style-type: none;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 3rem;
  padding: 0;
  border-bottom: 1px solid var(--color-b20-gb);

  li {
    position: relative;
    cursor: pointer;
    padding: 0 1rem 0.5rem 1rem;
    transition: color 0.3s ease;
    color: var(--color-b-gb);
  }

  li::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--text-secondary);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  li:hover,
  li.active {
    font-weight: bold;
    color: var(--text-secondary);
  }

  li:hover::after,
  li.active::after {
    transform: scaleX(1);
  }

  li.active::after {
    height: 3px;
  }

  @media (max-width: 510px) {
    // TODO change style for mobile
    justify-content: space-between;

    li {
      padding: 0 0.5rem 0.5rem 0.5rem;
    }

    .b2 {
      font-size: calc(var(--b2-font-size) * 0.6);
      line-height: calc(var(--b2-line-height) * 0.6);
    }
  }
`;

export default Wrapper;
