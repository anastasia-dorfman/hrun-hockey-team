import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

  .season {
    margin-top: 1.5rem;
    min-width: fit-content;
    width: 220px;
    height: 60px;
    border-radius: 1rem;
    border: 1px solid var(--black-20);
    box-shadow: var(--shadow);
    background-color: var(--bg-primary);
    align-content: center;
    text-align: center;
  }
  table {
    border-radius: 1rem;
    border: 1px solid var(--black-10);
    background-color: var(--bg-primary);
    padding: 1rem 3rem;
    margin-top: 2rem;
    width: 100%;
    border-spacing: 0;

    th,
    td {
      padding: 1rem;
      vertical-align: top;
      text-align: start;
    }

    th {
      color: var(--text-secondary);
      align-content: center;
    }

    tbody {
      tr {
        padding: 1rem 0;
        border-top: 1px solid var(--color-b40-o);
        border-top: 1px solid black !important;
      }
    }

    td {
      padding-top: 2rem;
      border-top: 2px solid var(--color-b40-o);

      p {
        margin: 0.5rem 0;
      }

      &.checkbox {
        max-width: 5%;
        width: 3%;
      }

      &.class {
        max-width: 45%;
        width: 40%;

        .name {
          margin: 0;
        }
      }

      &.days {
        max-width: 25%;
        width: 20%;
      }

      &.spots,
      &.kids-number {
        max-width: 16%;
        width: 12%;
      }
    }

    .form-row {
      .form-input-container {
        width: 100%;

        &.checkbox {
          input[type="checkbox"] {
            cursor: pointer;
            flex-shrink: 0;
            -moz-appearance: none;
            -webkit-appearance: none;
            -o-appearance: none;
            border: 1px solid var(--text-secondary);
            border-radius: 5px;
            background-color: var(--bg-primary);
            width: 3px;
            aspect-ratio: 1/1;
            width: 26px;
            margin: 0;
            margin-top: 1rem;

            &:checked {
              color: var(--text-secondary);
              background-color: var(--color-b10-od);
            }

            &:checked::after {
              content: "";
              position: relative;
              top: 40%;
              left: 50%;
              width: 50%;
              height: 50%;
              border: solid var(--text-secondary);
              border-width: 0 2px 2px 0;
              transform: translate(-50%, -50%) rotate(45deg);
              display: block;
            }

            &:disabled {
              cursor: not-allowed;
              opacity: 0.3;
              background-color: var(--color-b20-od);
            }
          }
        }
      }
    }

    .quantity-selector {
      width: fit-content;
      display: flex;
      align-items: center;
      background-color: var(--black-10);
      color: #000;
      border-radius: 2rem;
      overflow: hidden;

      button {
        width: 3.8rem;
        height: 3rem;
        padding: 0 0.5rem;
        /* margin: 0.5rem; */
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
        width: 0.8rem;
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

  button.add-to-cart {
    margin: 0;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 510px) {
  }
`;

export default Wrapper;
