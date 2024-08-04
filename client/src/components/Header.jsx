import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import Navigation from './Navigation';
import UserDropDown from './UserDropDown';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <HeaderWrapper>
        <Container>
          <LogoWrapper>
            {screenWidth < 1000 ? (
              <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </MenuButton>
            ) : null}
            <Logo />
          </LogoWrapper>
          {screenWidth >= 1000 ? (
            <NavigationWrapper>
              <Navigation />
            </NavigationWrapper>
          ) : null}
          <UserDropDown />
        </Container>
      </HeaderWrapper>
      {screenWidth < 1000 && (
        <MobileMenu className={isMenuOpen ? 'open' : ''}>
          <CloseButton onClick={() => setIsMenuOpen(false)}>
            <FaTimes />
          </CloseButton>
          <Navigation setMenuOpen={setIsMenuOpen} />
        </MobileMenu>
      )}
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  background: linear-gradient(to right, #002244, #4682B4);
  color: #e0e0e0;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 1.5rem;
  margin-right: 1rem;
  cursor: pointer;
  outline: none;
`;

const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #002244, #4682B4);
  z-index: 100;
  padding: 2rem;
  display: flex;
  opacity: 0.9;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translateX(-150%);
  transition: transform 0.3s ease-in-out;

  &.open {
    transform: translateX(0);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #e0e0e0;
   font-size: 2rem;
  
  margin-bottom: 1rem;
  cursor: pointer;
  outline: none;
  position: relative;
  bottom: 20%;
  z-index: 300;
  left: 40%;
`;