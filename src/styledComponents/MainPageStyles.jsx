import { styled } from "styled-components";

export const Main = styled.main`
  min-height: 100vh;
  background-image: url("https://aqartik.com/static/media/house.182bf263bece13573163.jpg");
`;

export const Header = styled.header`
  .messages-container {
    position: relative;
    padding: 16px 8px;
  }
  .message-icon {
    font-size: 28px;
    cursor: pointer;
    color: #14b183;
  }
  .messages-wrapper {
    position: absolute;
    top: 90px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 6px 12px rgba(110, 110, 110, 0.3);
    padding: 16px;
    color: black;
    border-radius: 8px;
    width: 350px;
    height: 450px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    left: ${(prop) => (prop.$dir === "ar" ? "-50px" : "")};
    right: ${(prop) => (prop.$dir === "en" ? "-50px" : "")};
    z-index: 10;
  }
`;

export const ListItemDiv = styled.article`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #dbd8d8;
  }
`;

export const ChatDialogStyle = styled.div`
  position: fixed;
  /* background-color: #201f1f; */
  background: rgba(248, 247, 247, 0.81);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(8.6px);
  /* background-color: white;
  box-shadow: 0px -6px 24px rgba(150, 150, 150, 0.3); */
  bottom: 0px;
  width: 350px;
  height: 440px;
  right: ${(prop) => (prop.$dir === "ar" ? "50px" : "")};
  left: ${(prop) => (prop.$dir === "en" ? "50px" : "")};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100000;
  overflow: visible;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #c9c6c6;
    padding: 32px 16px;

    .header-data {
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .close-icon {
      cursor: pointer;
      border-radius: 50%;
      font-size: 29px;
      background-color: transparent;
      transition: all 0.1s ease-in;
      color: #a1a0a0;
      &:hover {
        /* background-color: #524f4f;*/
        color: #363535;
      }
    }
  }

  main {
    padding: 16px 8px;
    height: 350px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .message-container {
      display: flex;
      gap: 4px;
      max-width: 80%;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        align-self: flex-end;
      }
    }
    .send-container {
      align-self: flex-start;
    }
    .recieve-container {
      align-self: flex-end;
    }

    .message {
      padding: 12px 8px;
      border-radius: 16px;
      font-size: 14px;
      position: relative;
    }

    .sended-message {
      background-color: #14b183;
      color: white;
    }

    .recieved-message {
      background-color: #e3af22;
      color: white;
    }
  }

  footer {
    /* height: 60px; */
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    flex-direction: column;

    .selected-file {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    }

    .footer-container {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 8px;
      textarea {
        background-color: transparent;
        border: 1px solid #c9c6c6;
        /* border: none; */
        outline: none;
        padding: 10px 12px;
        border-radius: 24px;
        resize: none;
        flex: 1;
      }
      button {
        background-color: transparent;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;

        svg {
          color: #14b183;
          /* color: #e3af22; */
        }
      }
    }
  }
`;
