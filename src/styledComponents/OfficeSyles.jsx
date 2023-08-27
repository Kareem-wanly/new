import { styled } from "styled-components";

export const OfficeContainer = styled.div`
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    align-items: center;
    width: 100%;
    background-color: #fff;
    text-align: center;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0px 0px 4px rgba(110, 110, 110, 0.4);

    .logo {
      border-radius: 50%;
      overflow: hidden;
    }

    .stars {
      display: flex;
      align-items: center;
      gap: 8px;
      svg {
        font-size: 18px;
        color: #f8de4d;
      }
    }

    button {
      margin-top: 16px;
      border: 1px solid #049ca2;
      outline: none;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      color: #049ca2;
    }

    .specialities {
      display: flex;
      gap: 16px;
      align-items: center;
      padding: 12px;
      color: #999;
      font-size: 14px;
      border: 1px solid #ddd;
      border-radius: 8px;

      .speciality {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;

        .icon {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
`;
