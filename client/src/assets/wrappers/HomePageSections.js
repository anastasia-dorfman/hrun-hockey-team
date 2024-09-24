import styled from "styled-components";

const Wrapper = styled.div`
  .home-page-section {
    padding: 2rem 4rem;
    text-align: left;

    &.support {
      padding: 0;
      margin-top: 3rem;
    }
  }

  .home-page-section .section-title {
    margin-bottom: 1rem;
  }

  .home-page-section p {
    margin-top: 0;
  }

  .home-page-section-container {
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
    margin: 2rem 0;
  }

  .products .home-page-section-container,
  .news .home-page-section-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2rem 0;
  }

  .products .home-page-section-container > *,
  .news .home-page-section-container > * {
    width: calc(33.333% - 1.334rem);
    max-width: calc(33.333% - 1.334rem);
    min-width: 250px;
  }

  .section-title-container.updates {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .upcoming-match {
    background-color: var(--color-w-gb);
    box-shadow: var(--shadow);
    border: 0.5px solid var(--black-10);
    border-radius: 5px;
    display: flex;
    justify-content: start;
    align-items: start;
    padding: 1rem 3rem 0.5rem 3rem;
    gap: 2rem;
  }

  .upcoming-match h4 {
    margin: 0;
    margin-bottom: 0.7rem;
    color: #000;
  }

  .upcoming-match .b4 {
    color: var(--color-b40-b60);
  }

  .time-left-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  }

  .teams,
  .time-left {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }

  .time-left {
    align-items: center;
    padding-right: 0.6rem;
  }

  .time-left p {
    margin: 0;
  }

  .time-left.right-border {
    border-right: 1px solid #000;
  }

  .update-cards {
    display: flex;
    justify-content: space-between;
  }

  .products .section-title,
  .products .section-description {
    width: 100%;
    max-width: 430px;
  }

  .products .section-description {
    margin-top: 2rem;
  }

  .form-section {
    margin-bottom: 2rem;
    background-color: var(--color-bl-odg);
    border: 1px solid var(--ocean);
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 8rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;

    .form-info {
      width: 50%;

      .content {
        width: 82%;

        .section-title {
          width: 85%;
          margin-bottom: 2rem;
          margin-top: 0;
        }

        .get-in-touch-message {
          margin-bottom: 2rem;
        }

        .address {
          margin-bottom: 3rem;
        }

        .icons-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-b-bl);
          margin: 0.5rem 0;

          svg {
            flex-shrink: 0;
            width: 1em;
            height: 1em;
          }
        }
      }
    }

    .form {
      max-width: 60%;
      width: 60%;

      .form-row {
        margin-bottom: 0rem;
        margin-top: 1.5rem;
        width: 90%;

        &.checkbox {
          margin-top: 0.5rem;
        }

        &.textarea {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .form-label {
            margin-bottom: 0.5rem;
            padding-bottom: 0;
          }
        }

        .form-label {
          color: var(--color-b40-bl);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-input-container {
          width: 100%;
          color: var(--text-secondary);

          &.checkbox {
            display: flex;
            align-items: flex-start;
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

          input,
          textarea {
            color: var(--text-secondary);
            background-color: var(--color-w-gb);
            border: 1px solid var(--black-20);
            box-shadow: var(--shadow);
            width: 100%;
            border-radius: 4px;
            padding: 0.5rem 1rem;
            outline: none;
          }

          textarea {
            border-radius: 8px;
            min-height: 50px;
            resize: vertical;
          }
        }
      }

      .contact-us-btn {
        margin-top: 2rem;
        margin-left: 0;
      }
    }
  }

  @media (max-width: 1450px) {
    .update-cards {
      justify-content: center;
    }
  }

  @media (max-width: 1200px) {
    .home-page-section .section-title {
      width: 100%;
      margin-top: 0;
    }

    .home-page-section {
      padding: 2rem 2rem 0 2rem;
    }

    .products .section-title,
    .products .section-description {
      max-width: 100%;
      margin-top: 0;
    }

    .section-title-container {
      flex-direction: column;
      text-align: center;
    }

    .form-section {
      padding: 2rem 3rem;

      .form {
        width: 80%;
        max-width: 100%;
        padding: 0;
      }
    }
  }

  @media (max-width: 900px) {
    .home-page-section {
      text-align: left;
    }

    .products .home-page-section-container > *,
    .news .home-page-section-container > * {
      flex: 0 0 calc(50% - 1rem);
      max-width: calc(50% - 1rem);
    }

    .form-section {
      padding: 2rem 4rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;

      .form-info,
      .form {
        width: 94%;
      }

      .form-info .content {
        width: 100%;
      }

      .form {
        margin-top: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    .home-page-section {
      padding: 2rem;
    }

    .update-cards {
      flex-direction: column;
    }

    .upcoming-match {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .teams {
      align-items: center;
    }

    .form {
      width: 100%;
      margin: 1rem 1rem;
      padding: 0.5rem;

      .form-row {
        margin-top: 1rem;
      }
    }
  }

  @media (max-width: 620px) {
    .products .home-page-section-container > *,
    .news .home-page-section-container > * {
      flex: 0 0 100%;
      max-width: 100%;
    }

    .form-section {
      gap: 0;
    }
  }

  @media (max-width: 510px) {
    .home-page-section {
      padding: 1rem;
    }

    .form-section {
      padding: 1rem;
    }

    .upcoming-match {
      padding: 1rem 1rem 0.5rem 1rem;
    }
  }
`;

export default Wrapper;
