import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--bg-secondary);
  margin-top: 2rem;
  padding: 1rem 1rem;
  display: flex;
  align-items: start;
  justify-content: start;
  box-sizing: border-box;

  .account-container {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;
export default Wrapper;
