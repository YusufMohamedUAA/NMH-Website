import React, { useState } from 'react';
import '../fonts.css';
import '../App.css';
import { ChakraProvider, Box, Image, Menu, MenuButton, MenuItem, MenuList, IconButton, extendTheme } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import Logo from '../NoMoreHeroesTransparent.png';
import circlegif from '../circle.gif';
import MapSD from '../Map.png';
import Motel1 from '../Motel1.png';
import Naomi1 from '../Naomi\'s Lab1.png';
import '../Map.css';

const theme = extendTheme({
  colors: {
    nmh: {
      background: '#141414',
      primary: '#E51C23',
      secondary: '#FFFFFF',
      accent: '#F4B400',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'nmh.background',
        fontFamily: 'NoMoreHeroesFont, sans-serif',
      },
    },
  },
  fonts: {
    heading: 'NoMoreHeroesFont, sans-serif',
    body: 'NoMoreHeroesFont, sans-serif',
  },
});

const Home = () => {
  const [isGifVisible, setIsGifVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const handleIconClick = () => {
    setIsGifVisible(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => {
    if (isMenuOpen) {
      setIsGifVisible(false);
    } else {
      setIsGifVisible(true);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <nav>
        <Box position="absolute" top="40px" right="40px" zIndex="10">
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <div className='icon-container'>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                color="nmh.secondary"
                _active={{ bg: 'nmh.primary', color: 'nmh.secondary' }}
                aria-label="Menu"
                onMouseEnter={handleMouseEnter}
                onClick={handleIconClick}
              />
              {isGifVisible && <img className="gif-overlay" src={circlegif} alt="scribble circle" />}
            </div>
            <MenuList bg="#141414" borderColor="nmh.primary">
              <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
                <MenuItem color="nmh.primary" bg="#141414" _hover={{ bg: 'nmh.primary', color: 'black' }} fontSize="lg">Home</MenuItem>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none', display: 'block' }}>
                <MenuItem color="nmh.primary" bg="#141414" _hover={{ bg: 'nmh.primary', color: 'black' }} fontSize="lg">About</MenuItem>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none', display: 'block' }}>
                <MenuItem color="nmh.primary" bg="#141414" _hover={{ bg: 'nmh.primary', color: 'black' }} fontSize="lg">Contact</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>

        <Box
          position="relative"
          top="80px"
          overflowY="auto"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          padding="20px"
          border="4px solid #E51C23"
        >
          <Image src={MapSD} alt="Map" width="10%" />
          <Marker
            top="50%"
            left="50%"
            isHovered={hoveredMarker === 'motel'}
            onHover={() => setHoveredMarker('motel')}
            onLeave={() => setHoveredMarker(null)}
            Icon={Motel1}
          />
          <Marker
            top="70%"
            left="50%"
            isHovered={hoveredMarker === 'naomi'}
            onHover={() => setHoveredMarker('naomi')}
            onLeave={() => setHoveredMarker(null)}
            Icon={Naomi1}
          />
        </Box>

        {/* Overlay effects */}
         {/* MAIN MERGE CONFLICT */}
        {hoveredMarker && (
          <>
            {/* Bottom white strip */}
            <Box
              position="fixed"
              bottom="0"
              left="0"
              width="100%"
              height="50vh"
              bg="white"
              zIndex="20"
              opacity="0.95"
            />
            {/* Top-left image */}
            <Box
              position="fixed"
              top="0"
              left="0"
              width="200px"
              height="200px"
              zIndex="21"
              padding="10px"
            >
              <Image
                src={hoveredMarker === 'motel' ? Motel1 : Naomi1}
                alt="Hovered Marker Visual"
                width="100%"
                height="100%"
                objectFit="contain"
              />
            </Box>
          </>
        )}
      </nav>
    </ChakraProvider>
  );
};

const Marker = ({ top, left, isHovered, onHover, onLeave, Icon }) => {
  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      transform="translate(-50%, -50%)"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => console.log("Marker clicked")}
      border='2px'
      borderColor='tomato'
    >
      <Image src={Icon} alt="Marker" boxSize="50px" />
      {isHovered && (
        <Box
          position="absolute"
          bottom={1}
          left={0}
          width="100%"
          height="100%"
          zIndex="5"
          pointerEvents="none"  // This fixes the hover issue
        >
          <Image src={circlegif} alt="Circle GIF" style={{ transform: 'scale(1.7)' }} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
