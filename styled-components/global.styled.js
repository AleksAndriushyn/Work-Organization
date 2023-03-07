import styled from 'styled-components'

export const TaskStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3em 0 0 10em;
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
    display: flex;
    align-items: center;
    color: white;
  }

  &:hover .menu-item {
    background: white;
    color: black;
    border-radius: 4px;
  }
`

export const ListItemTextStyle = styled.div`
  &:hover {
    text-decoration: underline;
  }
`
