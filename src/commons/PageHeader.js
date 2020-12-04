import styled from 'styled-components';

const PageHeader = styled.h2`
  margin: 30px auto;
  font-size: 1.8rem;
  font-weight: 900;
  color: ${p => (p.theme.dark ? p.theme.primaryText : p.theme.primaryColor)};
  text-align: center;
  letter-spacing: 1px;


  &:after {
    content: '';
    display: block;
    position: relative;
    top: -5px;
    width: 100%;
    height: 3px;
    margin-left: 20px;
    background-color: var(--lightest-navy);

    @media (max-width: 1080px) {
      width: 200px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      margin-left: 10px;
    }
  }
`;

export default PageHeader;
