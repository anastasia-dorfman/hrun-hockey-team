import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 4rem;

  h1 {
    margin-top: 2rem;
    padding: 0;
  }

  .red {
    color: var(--primary);
  }

  .cart-wrapper {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    gap: 2rem;

    .products-container {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 2rem;
      border: 1px solid var(--color-b20-o);
      border-radius: 1rem;
      padding: 2rem;
      width: 54%;

      & > *:not(:last-child) {
        border-bottom: 1px solid var(--color-b20-o);
        padding-bottom: 2rem;
      }

      .cart-empty-message {
        width: 100%;
        text-align: center;
      }
    }

    .form-section {
      margin-bottom: 2rem;
      background-color: var(--color-bl-odg);
      border: 1px solid var(--ocean);
      border-radius: 10px;
      overflow: hidden;
      width: calc(46% - 2rem);
      box-sizing: border-box;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: flex-start;
      gap: 1rem;

      form {
        width: 100%;

        .subtotal-section,
        .discount-section,
        .delivery-section,
        .total-section,
        .promo-code-section {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 1rem;
        }

        h4,
        h3,
        .b1 {
          margin: 0;
        }

        h3 {
          margin-bottom: 2rem;
        }

        .total-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-b20-o);
        }

        .promo-code-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0;
          margin-bottom: 1rem;
          width: 100%;

          .form-row {
            width: 70%;
            max-width: 70%;
            flex-grow: 1;
            .form-input-container {
              /* width: 100%; */
              position: relative;
              flex: 1;
              min-width: 0;
              input {
                width: 100%;
                box-sizing: border-box;
                color: black;
                background-color: #fff;
                border: 1px solid var(--black-40);
                /* box-shadow: var(--shadow); */
                border-radius: 7px;
                padding: 1rem;
                outline: none;
              }

              .input-wrapper {
                position: relative;
              }

              .placeholder-content {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                pointer-events: none;
                color: var(--color-b40-b60);
                display: flex;
                align-items: center;
                gap: 0.5rem;
              }

              input:not(:placeholder-shown) + .placeholder-content {
                display: none;
              }
            }
          }

          button {
            max-width: 35%;
            display: block;
            margin-right: 0;
            margin-left: 1rem;
            background-color: transparent;
          }
        }

        .checkout-btn {
          margin: 2rem 0 0 0;
          display: block;
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 1600px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 1200px) {
    .home-page-section {
      padding: 0;
    }

    .product-section {
      gap: 5rem;
      margin: 3rem 0;
    }

    .product-category-filter {
      gap: 4rem;
      margin-left: 1rem;
      margin-right: 0;
      width: unset;
    }

    .product-type-filter {
      margin-bottom: 2rem;
      justify-content: space-between;
      gap: 0.2rem;
    }

    .clear-filters {
      align-self: right;
      margin: 0;
    }
  }

  @media (max-width: 992px) {
    padding: 0 2rem;

    .product-section {
      gap: 3rem;
    }
  }

  @media (max-width: 768px) {
    .product-section {
      flex-direction: column;
      margin: 1.5rem;
      align-items: center;
    }

    .product-category-filter {
      margin: 0;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 1rem 1rem 0 1rem;
      width: 100%;
      gap: 3rem;
    }

    .product-type-filter {
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 600px) {
    .product-section {
      margin: 1rem;
      gap: 0.5rem;
    }

    .product-category-filter {
      padding: 1rem 0.5rem;
      gap: 0;
    }

    .product-type-filter {
      flex-direction: column;
    }

    .product-type-filter .type {
      width: 100%;
    }

    .clear-filters {
      margin: 0;
      width: 100%;
    }

    .products-container {
      display: unset;
    }

    .products-container > * {
      margin-bottom: 2rem;
    }
  }
`;

export default Wrapper;
