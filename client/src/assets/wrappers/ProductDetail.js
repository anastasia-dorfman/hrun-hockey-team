import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 4rem;

  h1 {
    margin: 1rem 0;
  }

  h5,
  h4,
  h3,
  h2 {
    margin: 0;
  }

  h5 {
    margin-top: 0.3rem;
  }

  .product-container {
    display: flex;
    justify-items: start;
    align-items: start;
    gap: 1rem;

    .images-section {
      display: flex;
      gap: 2rem;

      .images-container-wrapper {
        height: 33vw;
        display: flex;
        flex-direction: column;
        align-items: center;

        .scroll-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          color: var(--color-black);
          outline: none;
          margin: 0;
          padding: 0;

          :hover {
            color: var(--text-primary);
          }

          :focus {
            outline: none;
          }
        }

        .images-container {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 1rem;
          overflow-y: auto;
          scroll-behavior: smooth;
          /* Hide the scrollbar */
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */

          &::-webkit-scrollbar {
            width: 0;
            height: 0;
          }

          .image-preview-container {
            width: 10vw;
            height: 10vw;
            padding: 4px;
            box-sizing: border-box;

            .image-preview {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 14px;
              cursor: pointer;
              transition: border 0.3s ease;

              &.selected {
                border: 1px solid var(--blue-dark);
              }
            }
          }
        }
      }

      .chosen-image {
        height: 33vw;
        width: 100%;
        max-width: 900px;
        object-fit: contain;
        border-radius: 13px;
      }
    }

    .details {
      width: 100%;
      max-width: calc(100% - 33vw - 10vw - 8px - 8rem);

      .product-description,
      .sizes,
      .colors {
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--black-20);
      }

      .colors-container,
      .sizes-container {
        display: flex;
        gap: 1.5rem;
      }

      .colors-container {
        .color-option {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 1px solid var(--black-40);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;

          &:hover {
            transform: scale(1.1);
          }

          &.selected {
            border: 1.5px solid var(--black-40);
          }

          &.multi-color {
            background: var(--color-value);
            background-size: 200% 200%;
            animation: colorChange 5s ease infinite;

            @keyframes colorChange {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          }

          .checkmark {
            font-size: 1.2rem;
            font-weight: bold;
          }
        }
      }

      .size {
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 0rem;
      }

      .add-to-cart-section {
        display: flex;
        justify-content: start;
        align-items: start;
        gap: 2rem;
        margin-top: 1.5rem;

        .left-side,
        .right-side {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: start;
          height: 140px;
        }

        .right-side {
          width: 100%;

          .add-to-cart {
            margin: 0;
          }
        }
      }

      .quantity-selector {
        display: flex;
        align-items: center;
        background-color: var(--black-10);
        border-radius: 2rem;
        overflow: hidden;

        button {
          width: 3rem;
          height: 3.5rem;
          padding: 0;
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
          color: var(black);
          width: 5rem;
          text-align: center;
          border: none;
          padding: 0.8rem 1rem;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
      }

      .more-details {
        cursor: pointer;
        transition: color 0.3s ease;
        color: var(--color-b70-gb);

        &:hover {
          font-weight: bold;
        }

        &.selected {
          font-weight: bold;
          text-decoration: underline;
          color: var(--text-secondary);
          font-family: "Roboto", sans-serif;
          font-size: var(--h5-font-size);
          font-weight: bold;
          line-height: var(--h5-line-height);
          letter-spacing: 0;
        }
      }

      .details-info {
        margin-top: 1rem;
        overflow-y: auto;
      }
    }
  }

  @media (max-width: 1600px) {
    .sizes-container {
      flex-wrap: wrap;
    }

    .add-to-cart {
      padding: 1rem;
      width: 100%;
    }
  }

  @media (max-width: 1343px) {
    padding: 0 2rem;

    .product-container {
      .details {
        width: 100%;
        max-width: calc(100% - 33vw - 10vw - 8px - 5rem);

        .quantity-selector {
          input {
            width: 3rem;
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .product-container {
      flex-direction: column;
      margin: 2rem 0;
      gap: 2rem;

      .images-section {
        gap: 2rem;
        width: 100%;

        .images-container-wrapper {
          height: calc(100vw - 20vw - 8px - 11rem);

          .images-container {
            gap: 0.5rem;

            .image-preview-container {
              width: 20vw;
              height: 20vw;

              .image-preview {
                border-radius: 15px;
              }
            }
          }
        }

        .chosen-image {
          width: 100%;
          max-width: 100%;
          height: calc(100vw - 20vw - 8px - 11rem);
        }
      }

      .details {
        max-width: calc(100% - 4rem);

        .add-to-cart {
          padding: 1rem 7rem;
          width: fit-content;
        }
      }
    }
  }

  /* @media (max-width: 992px) {
    .product-container {
      margin: 4rem 1rem;
      gap: 0.7rem;
    }

    .image-preview-container {
      width: 9rem;
      height: 9rem;
    }

    .images-container-wrapper {
      max-height: 22rem;
    }

    .chosen-image {
      max-height: 22rem;
    }

    .details {
      max-width: 21.5rem;
      font-size: 0.7rem;
    }

    .details-section {
      padding-bottom: 0.5rem;
    }

    .details-section > p {
      margin-bottom: 0.2rem;
    }

    .color-dropdown,
    .size-dropdown {
      display: block; // Show the dropdowns
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 0;
      border: 1px solid var(--red);
      border-radius: 1rem;
      background-color: var(--background-color);
      color: var(--text-primary);
      font-size: 0.8rem;
      outline: none;
    }

    .quantity-selector {
      width: fit-content;
    }

    .quantity-selector input {
      width: 1rem;
      padding: 0.5rem 0.5rem;
    }

    .quantity-selector button {
      padding: 0;
      font-size: 1.2rem;
      width: 1.3rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .right-side {
      align-items: center;
    }

    .add-to-cart-section {
      gap: 0.2rem;
    }

    .add-to-cart {
      padding: 0.7rem 0.5rem;
      font-size: 0.7rem;
    }

    .more-details {
      font-size: 0.6rem;
    }
  } */

  @media (max-width: 768px) {
    padding: 0 1rem;
    .product-container {
      .images-section {
        gap: 1rem;
        .images-container-wrapper {
          height: calc(100vw - 20vw - 8px - 8rem);
          .images-container {
            gap: 0.2rem;

            .image-preview-container {
              width: 20vw;
              height: 20vw;

              .image-preview {
                border-radius: 10px;
              }
            }
          }
        }

        .chosen-image {
          height: calc(100vw - 20vw - 8px - 8rem);
        }
      }

      .details {
        max-width: 100%;

        .quantity-selector {
          input {
            width: 5rem;
          }
        }

        .add-to-cart {
          padding: 1rem;
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 510px) {
    .product-container {
      .details {
        .add-to-cart-section {
          gap: 0.5rem;
          .quantity-selector {
            input {
              width: 1rem;
            }
          }
        }
      }
    }
  }
`;

export default Wrapper;
