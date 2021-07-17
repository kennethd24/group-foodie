import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, Form, Image, Navbar } from 'react-bulma-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory, Link } from "react-router-dom";
import { useAppSelector } from '../state/hooks';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// interfaces
interface profileImageProps {
  src: string,
  size?: number,
}
interface orangeNavbarProps {
  needBackArrow?: boolean,
  onBackArrowClick?: () => void,
  hasBurger?: boolean,
}
interface plusButtonProps {
  onClick?: () => void,
  size: number,
}
interface minusButtonProps {
  onClick?: () => void,
  size: number,
}
interface backArrowProps {
  onClick?: () => void,
}
interface HeaderImageProps {
  src: string,
}

// utility subcomponents to create larger components
const SizedImage = styled(Image)`
`
// const OrangeNavbarContainer = styled(Navbar)`
//   background-color: #FF6C36;
//   border-radius: 0 0 22px 22px;
//   z-index: -11;
// `

const OrangeNavbarContainer = styled(Navbar)`
  background-color: #FF6C36;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-radius: 0 0 22px 22px;
`
const NavbarBrand = styled(Navbar.Brand)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const NavbarItem = styled(Navbar.Item)`
  display: flex;
`
const NavbarBurger = styled(Navbar.Burger)`
  position: absolute;
  right: 2px;
  padding-left: 120px;
  color: white;
`
const BackArrowContainer = styled(Icon)`
  position: absolute;
  left: 38px;
`
const GroupFoodieLogo = styled.p`
  &:hover {
    cursor: pointer;
  }
  color: white;
`
const PlusButtonContainer = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
  color: #FF6C36;
`
const MinusButtonContainer = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
  color: #FF6C36;
`
const HeaderImageContainer = styled.div`
  width: 100%;
  padding-bottom: 150px;
`
const HeaderImageImg = styled.div<HeaderImageProps>`
  background-image: url(${props => props.src});
  position: absolute;
  top: -50px;
  width: 100vw;
  height: 250px;
  z-index: -11;
`

const SideBarContainer = styled(motion.div)`
  position: absolute;
  top: 1px;
  left: 1px;
  display: flex;
  justify-content: flex-end;
  width: 100vw;
  height: 93.5vh;
  z-index: 100;
  background-color: white;
  border: 1px solid white;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 25px;
`
const SideBarOptions = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  padding-right: 40px;
  font-size: 20px;
  p {
    padding-bottom: 8px;
  }
`
const UserName = styled.h3`
  margin-bottom: 30px;
  border-bottom: 6px solid #FF6C36;
`

const Options = styled(Link)`
  color: #4a4a4a;
`;


const SideBarMenu = ({sideBarOpen}) => {
  const userName = useAppSelector(state => state.currentUser.first_name);

  return (
    <AnimatePresence>
      {sideBarOpen && (
        <div>
          <SideBarContainer
            initial={{ x: '-100%' }}
            animate={{ x: '-50%' }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <SideBarOptions>
              <UserName>{userName || ''}</UserName>
              <Options to="/profile">Account</Options>
              <Options to="/history">Your Orders</Options>
              <p>Log Out</p>
            </SideBarOptions>
          </SideBarContainer>
        </div>
      )}
    </AnimatePresence>
  )
}

/////////////////////////
/* exported components */
/////////////////////////

export const OrangeButton = styled(Button)`
  background-color: #FF6C36;
  border-radius: 30px;
  color: white;
  margin-top: 20px;
  font-weight: bold;
`
export const OrangeInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #FF6C36;
  &:focus {
    outline: none;
    border-bottom: 1px solid #2e6bbb
  }
`


/////////////////////////////////////
/* exported complete JSX components*/
/////////////////////////////////////

// navbar takes 2 props 'needBackArrow' that takes a boolean for if it should have a back arrow or not
// and 'onBackArrowclick' which takes a callback for when back arrow is clicked
export const OrangeNavbar: (props: orangeNavbarProps) => JSX.Element = ({
  needBackArrow,
  onBackArrowClick,
  hasBurger = true
}) => {
  const [active, setActive] = useState(false);
  const [ sideBarOpen, setSideBarOpen ] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  }
  const logOut = () => {
    console.log('hello')
  }
  return (
    <>
      <SideBarMenu sideBarOpen={sideBarOpen}/>
      <OrangeNavbarContainer className="is-fixed-top" active={active}>
        <NavbarBrand>
          {needBackArrow &&
             <BackArrow onClick={onBackArrowClick} />
          }
          <NavbarItem>
            <GroupFoodieLogo>
              Group Foodie
            </GroupFoodieLogo>
          </NavbarItem>

          {hasBurger && <NavbarBurger
            onClick={() => setSideBarOpen(prev => !prev)}
          />}

        </NavbarBrand>
        <Navbar.Menu>
          <Navbar.Container>
            <NavbarItem to="/profile" renderAs={Link}>Account</NavbarItem>
            <NavbarItem to="/history" renderAs={Link}>Your Orders</NavbarItem>
            <NavbarItem to="/" renderAs={Link} onClick={logOut}>Log Out</NavbarItem>
            <Navbar.Item>Log Out</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </OrangeNavbarContainer>
    </>
  )
}

// header image takes one prop 'src'
export const HeaderImage: (props: HeaderImageProps) => JSX.Element = ({src}) => {
  return (
    <HeaderImageContainer>
      <HeaderImageImg src={src}/>
    </HeaderImageContainer>
  )
}

// profile image takes 2 props 'src' and '[size]'. If size is not provided, defaults to 64
export const ProfileImage: (props: profileImageProps) => JSX.Element = ({ src, size }) => {
  return (
    <SizedImage src={src} rounded={true} fullwidth={false} size={size || 64} />
  )
}

// BackArrow takes 1 prop 'onClick' and behaves the same way that a normal JSX element's 'onClick' would behave
export const BackArrow: (props: backArrowProps) => JSX.Element = ({ onClick }) => {
  return (
    <BackArrowContainer onClick={onClick}>
      <i className="fas fa-angle-left has-text-white-ter is-size-4" />
    </BackArrowContainer>
  )
}

// prop 'size' takes any number from 1 to 6, 1 being the largest.
export const PlusButton: (props: plusButtonProps) => JSX.Element = ({ onClick, size }) => {
  return (
    <PlusButtonContainer onClick={onClick}>
      <i className={`fas fa-plus-circle is-size-${size || 3}`} />
    </PlusButtonContainer>
  )
}

// prop 'size' takes any number from 1 to 6, 1 being the largest.
export const MinusButton: (props: minusButtonProps) => JSX.Element = ({ onClick, size }) => {
  return (
    <MinusButtonContainer onClick={onClick}>
      <i className={`fas fa-plus-circle is-size-${size || 3}`} />
    </MinusButtonContainer>
  )
}
