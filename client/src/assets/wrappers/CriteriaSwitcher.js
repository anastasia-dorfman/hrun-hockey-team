import styled from "styled-components";

const Wrapper = styled.ul`
  list-style-type: none;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 3rem;
  padding: 0;
  border-bottom: 1px solid var(--grey-200);

  li {
    position: relative;
    cursor: pointer;
    padding-bottom: 0.5rem;
    transition: color 0.3s ease;
  }

  li::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-500);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  li:hover,
  li.active {
    color: var(--primary-500);
  }

  li:hover::after,
  li.active::after {
    transform: scaleX(1);
  }

  li.active::after {
    height: 3px;
  }
`;

export default Wrapper;