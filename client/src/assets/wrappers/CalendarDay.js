import styled from "styled-components";

const Wrapper = styled.div`
  .calendar-day {
    aspect-ratio: 1/1;
    background-color: var(--color-bl-odg);
    border-radius: var(--border-radius-lg);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    position: relative;

    &.next-month {
      /* opacity: 0.5; */

      .day-info {
        .day-number,
        .weekday-label {
          color: transparent;
        }
      }
    }

    &:hover {
      box-shadow: var(--shadow);
    }

    &.has-game {
      background-color: var(--green-blue);

      &:hover {
        background-color: var(--red-light);
      }

      .day-info .day-number,
      .game-teams-names {
        color: var(--black-60);
      }

      .game-time,
      .game-teams-logo {
        color: #000;
      }
    }

    .day-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      .day-number,
      .weekday-label {
        color: var(--color-b60-w);
      }

      .day-number {
        position: absolute;
        top: 1rem;
        left: 1.5rem;
      }

      .weekday-label {
        display: none;
      }
    }
  }

  .game-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    .game {
      transition: all 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 0.5rem;
      height: 100%;

      .game-teams-logo,
      .game-teams-names {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 1rem;
      }

      .team-logo {
        width: 60px;
        height: 60px;
        /* border-radius: 50%; */
        object-fit: contain;
        background-color: transparent;
      }

      .game-time {
        text-align: center;
        margin-top: 0.25rem;
      }
    }
  }

  @media (max-width: 1600px) {
    .day-number {
      position: static;
    }

    .calendar-day {
      min-height: 100px;
    }
  }

  @media (max-width: 510px) {
    .calendar-day {
      max-height: 170px;
      /* padding: 0.5rem 0.8rem; */
    }

    .team-logo {
      width: 40px;
      height: 40px;
    }

    .day-info {
      margin-bottom: unset;
    }

    .game {
      gap: 0;
    }
  }
`;

export default Wrapper;
