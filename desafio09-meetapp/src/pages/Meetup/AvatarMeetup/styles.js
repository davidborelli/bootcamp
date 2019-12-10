import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 30px;
  height: 200px;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      background: none;
      max-height: 200px;
      max-width: 100%;
    }

    input {
      display: none;
    }
  }
`;
