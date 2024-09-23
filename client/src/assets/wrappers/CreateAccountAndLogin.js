import styled from "styled-components";

const Wrapper = styled.div`
  margin: 4rem 4rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  .form {
    max-width: 98%;

    &.login {
      .form-row {
        width: 550px;
        max-width: 98%;
      }
    }

    h1 {
      text-align: center;
    }

    hr {
      margin: 2rem 0;
      border: 1px solid var(--color-b20-b60);
    }

    .form-row {
      margin-bottom: 0rem;
      margin-top: 1rem;

      &.checkbox {
        margin-top: 0.5rem;
      }

      .form-label {
        color: var(--color-b40-bl);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .form-input-container {
        &.checkbox {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0.5rem;

          input[type="checkbox"] {
            margin-top: 0.2rem;
            flex-shrink: 0;
            -moz-appearance: none;
            -webkit-appearance: none;
            -o-appearance: none;
            border-color: var(--color-b20-b60);
            background-color: var(--color-w-gb);
            /* background-color: var(--black-60); */
            border-radius: 6px;
            width: 3px;
            aspect-ratio: 1/1;
            width: 26px;
            padding: 0;

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
          }

          .checkbox-lbl {
            margin-top: 0;
            padding-top: 0;
            display: inline-flex;
            align-items: flex-start;
            flex-wrap: wrap;

            .label-part-0 {
              flex: 0 0 auto;
            }

            .label-part-1 {
              flex: 0 0 auto;

              .underlined-text {
                text-decoration-color: var(--color-b40-w);
                text-decoration-thickness: 2px;
              }
            }
          }
        }

        input {
          background-color: var(--color-w-gb);
          border: 1px solid var(--color-b40-b60);
          width: 100%;
          border-radius: 8px;
          padding: 0.8rem 1rem;
          outline: none;
          box-sizing: border-box;

          &:focus {
            border-color: var(--text-ocean);
          }
        }
      }
    }

    button {
      margin-top: 3rem;
      margin-bottom: 1rem;
    }

    .forgot-password {
      color: var(--text-secondary);
      margin-top: 0.5rem;
    }

    .sign-in,
    .create-account {
      display: flex;
      gap: 0.5rem;
      align-items: end;
      justify-content: center;
      color: var(--text-secondary);

      h5 {
        margin: 0;
      }
    }
  }
`;

export default Wrapper;
