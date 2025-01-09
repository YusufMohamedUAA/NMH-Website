import React from 'react';
import {useState, useRef, useEffect} from 'react';
import '../fonts.css';
import '../App.css';
import { ChakraProvider, Box, Heading, Text, Image, Button, extendTheme, Menu, MenuButton, MenuItem, MenuList, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'; 
import { Typewriter } from 'react-simple-typewriter';
import Logo from '../NoMoreHeroesTransparent.png';
import circlegif from '../circle.gif';
import { Outlet, Link, Route, BrowserRouter as Router } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import MapSD from '../Map.png';
import Motel1 from '../Motel1.png';
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
  const [isHovered, setIsHovered] = useState(false);//check if the icon is toggled or not


  const handleIconClick = () => {
    /* if we want the gif to stay after the click and we are hovering over it
    if (isMenuOpen) {
        setIsGifVisible(false); 
      } else {
        setIsGifVisible(true); 
      }
      setIsMenuOpen(!isMenuOpen); 
      */

        setIsGifVisible(false); 
        setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => { //hover case for menu button
    if (isMenuOpen) {
        setIsGifVisible(false); 
      } else {
        setIsGifVisible(true); 
      }
       
  };

  const handleMarkerEnter1 = () => {
    setIsHovered(true);
  };

  const handleMarkerLeave1 = () => {
    setIsHovered(false);
  };
  console.log("map " + isGifVisible);
  return (
    <ChakraProvider theme={theme}>
      
        <nav>
          /** */
          <Box position="fixed" top="40px" right="40px" zIndex="10">
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onInteractionOutside={() => setIsMenuOpen(false)}>
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
                {isGifVisible && <img className="gif-overlay" src={circlegif} alt="scribble circle AAAAAAAAAAA" />}
                
                </div>
              <MenuList bg="#141414" borderColor="nmh.primary">
              <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
                <MenuItem
                  color="nmh.primary"
                  bg="#141414"
                  _hover={{ bg: 'nmh.primary', color: 'black' }}
                  fontSize="lg"
                >
                  Home
                </MenuItem>
                </Link>
                <Link to="/about" style={{ textDecoration: 'none', display: 'block' }}>
                  <MenuItem
                    color="nmh.primary"
                    bg="#141414"
                    _hover={{ bg: 'nmh.primary', color: 'black' }}
                    fontSize="lg"
                   
                  >
                    About
                  </MenuItem>
                </Link>
                <Link to="/contact" style={{ textDecoration: 'none', display: 'block' }}>
                  <MenuItem
                    color="nmh.primary"
                    bg="#141414"
                    _hover={{ bg: 'nmh.primary', color: 'black' }}
                    fontSize="lg"
                   
                  >
                    Contact
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Box>
        <Box 
        position="relative" 
        top="80px" // Adjust for header height
        height="calc(100vh - 80px)" // Remaining height after header
        overflowY="auto" // Make the map scrollable vertically
        display="flex"
        justifyContent="center"
        alignItems="flex-start" // Align map to the top, so it doesn't start from the middle
        padding="20px" // Add some padding around the map
        border="4px solid #E51C23" // Border around the map
      >
        <Image src={MapSD} alt="Map" width="100%" />
        <Marker top="50%" left="50%" isGifVisible={isHovered} handleMouseEnter={handleMarkerEnter1} handleMouseLeave={handleMarkerLeave1}/>
      </Box>
      
        
        </nav>
      
    </ChakraProvider>
  );
};

const Marker = ({ top, left, isGifVisible, handleMouseEnter, handleMouseLeave }) => {
  console.log(isGifVisible);
  return(
    <Box 
      position="absolute"  // Use absolute positioning relative to the parent container (map)
      top={top} // Position the marker based on the passed props
      left={left}
      transform="translate(-50%, -50%)"  // Center the marker based on its position
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={Motel1} alt="Motel Marker" boxSize="50px" />
      
      {/* Circle GIF Overlay */}
      {isGifVisible && (
        <Box
          position="absolute"
          bottom={1}
          left={0}
          width="100%"
          height="100%"
          zIndex="5"
        >
          <Image src={circlegif} alt="Circle GIF" style={{ transform: 'scale(1.7)' }} />
        </Box>
      )}
    </Box>
  );
};


export default Home;
