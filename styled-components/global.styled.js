import styled from 'styled-components'

export const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const TableStyle = styled.div`
  padding: 2rem 5rem 0 5rem;

  width: 100%;
  table {
    border: 1px solid #e0e0e0;

    th,
    td {
      padding: 1rem;
      text-align: center;
    }
  }
`

export const ErrorStyle = styled.p`
  color: #bf1650;
  p::before {
    display: inline;
    content: '⚠ ';
  }
`

export const MenuItemStyle = styled.div`
  .menu-item {
    background: none;
  }

  &:hover .link {
    color: yellow;
  }
`
