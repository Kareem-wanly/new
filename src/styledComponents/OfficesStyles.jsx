import styled from "styled-components";

export const OfficesContainer = styled.div`
  header {
    display: flex;
    gap: 12px;
    align-items: center;

    form {
      display: flex;
      gap: 8px;

      input {
        border-radius: 40px;
        border: 1px solid #999;
        max-width: 250px;
        outline: none;
        padding: 8px 16px;
      }

      button {
        border: none;
        outline: none;
        background-color: #14b183;
        cursor: pointer;
        color: white;
        padding: 8px 4px;
        border-radius: 12px;
        font-size: 16px;
        min-width: 45px;
      }
    }
  }

  section {
    display: flex;
    margin: 32px 0;
    flex-wrap: wrap;
    gap: 16px 32px;
    justify-content: center;

    article {
      width: 284px;
      padding: 16px 0;
      color: #444;
      height: 350px;
      box-shadow: 0px 3px 12px rgba(110, 110, 110, 0.3);
      background-color: #f0f6f2;
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .office-header {
        display: flex;
        justify-content: space-between;
        width: 100%;

        & > span:first-child {
          color: #14b183;
        }

        & > span:last-child {
          display: flex;
          align-items: center;
          gap: 4px;

          svg {
            font-size: 18px;
            color: #f8de4d;
          }
        }
      }

      .office-name {
        text-align: center;
        margin-top: 8px;
      }

      .office-img {
        width: 100%;
        max-height: 150px;
        object-fit: contain;
        border: 1px solid #999;
        border-right: 0px;
        border-left: 0px;
      }

      button {
        background-color: #14b183;
        border: none;
        outline: none;
        display: flex;
        gap: 6px;
        color: white;
        font-weight: 700;
        font-size: 16px;
        padding: 8px 12px;
        cursor: pointer;
        border-radius: 12px;
        align-items: center;
      }

      .office-footer {
        padding: 0 16px;
        width: 100%;
        display: flex;
        gap: 6px;
        align-items: center;

        & span:first-child {
          color: #999;

          svg {
            font-size: 16px;
          }
        }
        & span:last-child {
          color: #14b183;
          font-weight: 600;
        }
      }
    }
  }
`;
