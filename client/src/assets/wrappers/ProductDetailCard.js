import styled from "styled-components";

const Wrapper = styled.div`
  /* padding: 1rem; */
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;

  .left-part {
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 1rem;
    height: 155px;

    img {
      width: 170px;
    }

    .details-section {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: space-between;
      height: 100%;

      h4,
      p {
        margin: 0;
      }

      .product-name {
        margin-bottom: 0.5rem;
      }
      .size-wrapper {
        margin-bottom: 0.3rem;
      }

      .size-title,
      .color-title {
        color: var(--text-secondary);
      }

      .size-name,
      .color-name {
        color: var(--color-b60-od);
      }
    }
  }

  .actions-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;

    .trash-icon {
      font-size: 1.5rem;
      color: var(--color-b-bl);
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      background-color: var(--black-10);
      color: #000;
      border-radius: 2rem;
      overflow: hidden;

      button {
        width: 3rem;
        height: 3rem;
        padding: 0 1rem;
        font-size: 2rem;
        background-color: var(--black-10);
        color: #000;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
        outline: none;
        user-select: none;

        &:hover {
          font-weight: bold;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      input {
        background-color: var(--black-10);
        color: black;
        width: 1.6rem;
        text-align: center;
        border: none;
        padding: 0;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .left-part,
    .actions-section {
      width: 100%;
    }

    .actions-section {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }
  }

  @media (max-width: 510px) {
  }
`;

export default Wrapper;
