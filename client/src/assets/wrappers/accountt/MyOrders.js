import styled from "styled-components";

const Wrapper = styled.div`
  width: 92%;

  .info-card {
    display: block;
    padding: 2rem 3rem;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 41%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 8%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 27%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 24%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;

    thead {
      border-bottom: 1px solid var(--color-b40-gb);
    }

    th,
    td {
      border-collapse: collapse;
      padding: 1rem 2rem;
      text-align: start;
    }

    td {
      vertical-align: top;

      h5 {
        margin: 0 0 1.5rem 0;
      }

      .title {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
      }

      .status {
        border-radius: var(--border-radius-md);
        border: 1px solid var(--color-b40-gb);
        padding: 1rem 0.1rem;
        text-align: center;

        &.completed {
          border-color: var(--success);
          color: var(--success);
        }

        &.unpaid {
          border-color: var(--error);
          color: var(--error);
        }

        &.pending {
          border-color: var(--warning);
          color: var(--warning);
        }
      }
    }
  }

  @media (max-width: 1200px) {
    width: 99%;
    .info-card {
      padding: 1rem;
    }

    table {
      th,
      td {
        padding: 1rem;
      }
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
