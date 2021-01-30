import styled, { css } from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${p => (p.clone ? 'repeat(auto-fill, minmax(500px, 1fr))' : 'repeat(auto-fill, minmax(400px, 1fr))')};;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
  grid-row-gap: 50px;
  padding: 5px;
  overflow: hidden;
  position: relative;

  ${p =>
    !p.showAll &&
    css`
      &:before {
        content: '';
        width: 100%;
        height: 300px;
        position: absolute;
        border-radius: 10px;
        bottom: 0;
        background:linear-gradient(180deg, rgba(0,0,0,0), 40%, #041732);
        z-index: 5;
        transition: 0.3s;
      }
    `}
  .showall__button {
    position: absolute;
    bottom: 50px;
    left: 50%;
    z-index: 6;
    padding: 15px 40px;
    font-weight: bold;
    transform: translateX(-50%);
  }
  max-height: ${p => (p.showAll ? '100%' : p.collapseHeight)};
`;

export default Grid;
