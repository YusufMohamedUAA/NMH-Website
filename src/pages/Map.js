import React, { useState } from 'react';
import { ChakraProvider, Box, Menu, MenuButton, MenuItem, MenuList, IconButton, Image, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'; 
import { Link } from 'react-router-dom';
import MapSD from '../Map.png';
import circlegif from '../circle.gif';
import Motel1 from '../Motel1.png';
import '../Map.css';

const theme = {
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
};

const Map = () => {
  const [isGifVisible, setIsGifVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => {
    setIsGifVisible(true); 
  };

  const handleMouseLeave = () => {
    setIsGifVisible(false); 
  };

  return (
    <ChakraProvider theme={theme}>
      {/* Header Area */}
      <Box 
        position="fixed" 
        top="0" 
        left="0" 
        right="0" 
        zIndex="10"
        
        display="flex"
        justifyContent="space-between"
      >
        <Text color="nmh.secondary" fontSize="xl" fontWeight="bold">
          Your Title
        </Text>
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onInteractionOutside={() => setIsMenuOpen(false)}>
          <div className='icon-container'>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              color="nmh.secondary"
              _active={{ bg: 'nmh.primary', color: 'nmh.secondary' }}
              aria-label="Menu"
              onClick={handleIconClick}
              size="lg" // Increase size of the button
              width="60px" // Increase the width of the button
              height="60px" // Increase the height of the button
            />
          </div>
          <MenuList bg="#141414" borderColor="nmh.primary">
            <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
              <MenuItem
                color="nmh.primary"
                bg="#141414"
                _hover={{ bg: 'nmh.primary', color: 'black' }}
                fontSize="xl" // Increase font size of the menu items
                padding="10px 20px" // Increase padding for better touch targets
              >
                Home
              </MenuItem>
            </Link>
            <Link to="/about" style={{ textDecoration: 'none', display: 'block' }}>
              <MenuItem
                color="nmh.primary"
                bg="#141414"
                _hover={{ bg: 'nmh.primary', color: 'black' }}
                fontSize="xl" // Increase font size of the menu items
                padding="10px 20px" // Increase padding for better touch targets
              >
                About
              </MenuItem>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none', display: 'block' }}>
              <MenuItem
                color="nmh.primary"
                bg="#141414"
                _hover={{ bg: 'nmh.primary', color: 'black' }}
                fontSize="xl" // Increase font size of the menu items
                padding="10px 20px" // Increase padding for better touch targets
              >
                Contact
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>

      {/* Main Content Area */}
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

        {/* Motel1 Marker */}
        <Box 
          position="absolute" 
          top="50%" // Adjust the top position as needed for your map coordinates
          left="50%" // Adjust the left position as needed for your map coordinates
          transform="translate(-50%, -50%)" // Center the marker on the coordinates
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image src={Motel1} alt="Motel Marker" boxSize="50px" />
          
          {/* Circle GIF Overlay */}
          {isGifVisible && (
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              zIndex="5" // Ensure the GIF is on top of the marker
            >
              <Image src={circlegif} alt="Circle GIF" boxSize="60px" />
            </Box>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Map;
