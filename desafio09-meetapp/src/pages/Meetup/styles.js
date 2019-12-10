import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      margin: -10px 0 10px 0;
      color: red;
      border-radius: 4px;
      font-weight: bold;
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 100px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      resize: none;
      font-size: 14px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    button {
      align-self: flex-end;
      width: 180px;
      margin: 10px 0 0;
      height: 42px;
      background: #f64c75;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#f64c75')};
      }
    }
  }
`;
