import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;

    strong {
      font-size: 34px;
      color: #fff;
    }

    button {
      display: flex;
      background: #d44059;
      width: 172px;
      height: 42px;
      border-radius: 4px;
      color: #fff;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;

      border: 0;

      &:hover {
        background: ${darken(0.03, '#d44059')};
      }

      span {
        margin-left: 5px;
      }
    }
  }

  ul {
    width: 100%;
  }
`;

export const Scheduling = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  margin: 10px auto;
  border-radius: 4px;

  color: #fff;
  background: #22202c;

  border: 0;

  strong {
    font-size: 16px;
    font-weight: normal;
  }

  div {
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      margin-right: 10px;
      opacity: 0.4;
    }
  }
`;
