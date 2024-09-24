import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 5rem;
  width: 36vw;
  box-sizing: border-box;
  background-color: var(--bg-blue);
  border: 1px solid var(--text-ocean);
  border-radius: 1rem;

  .icon {
    font-size: 7rem;
    margin: 0;
  }

  p,
  h3 {
    margin: 0;
    text-align: center;
    color: #000;
  }

  .b1 {
    color: #000;
  }

  .confirmation-buttons {
    display: flex;
    justify-content: space-around;
    align-items: start;
    gap: 1rem;
    border-radius: var(--border-radius-lg);
  }

  @media (max-width: 1600px) {
    width: 45vw;
  }

  @media (max-width: 1450px) {
    padding: 2rem 4rem;
    width: 50vw;
  }

  @media (max-width: 1200px) {
    width: 65vw;
  }

  @media (max-width: 768px) {
    margin-top: 4rem;
    padding: 2rem;
    width: 90vw;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-top: 3rem;
    width: 95vw;
    padding: 1rem;
  }
`;

export default Wrapper;
