import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;

  form {
    width: 100%;

    &.hide {
      display: none;
    }

    p,
    h4 {
      margin: 0;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;
      width: 90%;

      .child-dob {
        margin-top: 1rem;
      }

      .value {
        color: var(--text-secondary);
      }

      .placeholder {
        color: var(--color-b40-b60);
      }

      .empty {
        color: var(--color-b40-b60);
      }

      .name {
        width: fit-content;
        .form-input {
          width: 30%;
          max-width: 250px;
          min-width: 100px;
        }
      }

      .address-form {
        flex: 1 1 80%;
        width: 80%;
        min-width: 20%;
        margin-right: 1rem;
      }

      .form-row {
        margin-bottom: 0rem;
        margin-top: 1rem;

        .form-input-container {
          .select-wrapper {
            position: relative;

            select {
              appearance: none;
              -webkit-appearance: none;
              -moz-appearance: none;
              width: 100%;
              padding: 10px;
              padding-top: 25px;
              padding-right: 30px;
              border: 1px solid var(--color-b40-b60);
              border-radius: 8px;
              background-color: var(--color-w-gb);
              outline: none;
              color: var(--text-color, black);

              &:required:invalid {
                color: var(--color-b60-od);
              }

              &:required:invalid + .select-label {
                color: var(--color-b40-b60);
              }

              &:focus + .select-label,
              &:valid + .select-label {
                color: var(--black-40);
              }
            }

            .select-label {
              position: absolute;
              top: 5px;
              left: 10px;
              color: var(--color-b40-b60);
              pointer-events: none;
            }

            &::after {
              content: "";
              position: absolute;
              right: 10px;
              top: 50%;
              width: 0.6rem;
              height: 0.6rem;
              border-right: 2px solid var(--black-70);
              border-bottom: 2px solid var(--black-70);
              transform: translateY(-70%) rotate(45deg);
              pointer-events: none;
            }
          }

          input {
            color: var(black);
            background-color: var(--color-w-gb);
            border: 1px solid var(--color-b40-b60);
            width: 100%;
            border-radius: 8px;
            padding: 0.8rem 1rem;
            outline: none;
            box-sizing: border-box;
          }
        }
      }
    }

    .actions {
      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: start;
      gap: 0.5rem;
      margin-top: 1rem;
      cursor: pointer;

      .edit,
      .delete {
        padding: 0 0.5rem;
      }
      .edit {
        color: var(--text-ocean);
        border-bottom: 2px solid var(--text-ocean);
      }
      .delete {
        color: var(--error);
        border-bottom: 2px solid var(--error);
      }
    }
  }

  .add-kids {
    justify-content: center;
    box-shadow: none;
    border: 1px dashed var(--text-secondary);
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    h4 {
      margin: 0;
      text-align: center;
      color: var(--text-ocean);
    }
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
  }
  @media (max-width: 510px) {
  }
`;
export default Wrapper;
