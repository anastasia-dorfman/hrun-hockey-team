import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 1rem;
  height: 100%;

  h3 {
    margin: 0;
    padding-bottom: 0.5rem;
    /* Add these lines */
    display: flex;
    align-items: flex-start;
    min-height: 3em; /* Adjust this value based on your font size and desired maximum title height */
  }

  .image-container {
    position: relative;
    width: 100%;
  }

  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
    border-radius: 10px;
  }

  .date-overlay {
    position: absolute;
    bottom: 1.5rem;
    left: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    color: #000;
    background-color: var(--transparent-white-6);
    border: 1px solid var(--black-60);
  }

  p {
    margin: 0;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
  }

  .button-container {
    align-self: end;
  }

  .read-more {
    display: inline-block;
    margin: 0;
  }
`;

export default Wrapper;
