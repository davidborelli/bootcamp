import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  background: #000000;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999999;

      &:hover {
        color: ${lighten(0.1, '#999999')};
      }
    }
  }

  button {
    background: #d44059;
    width: 65px;
    height: 30px;
    border-radius: 4px;
    color: #fff;
    transition: background 0.2s;
    margin-left: 10px;

    border: 0;

    &:hover {
      background: ${darken(0.03, '#d44059')};
    }
  }
`;
