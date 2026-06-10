import React, { useState } from 'react';
import '../fonts.css';
import '../App.css';
import { ChakraProvider, Box, Heading, Text, Image, Button, extendTheme, Menu, MenuButton, MenuItem, MenuList, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../NoMoreHeroesTransparent.png';
import MouseCursor from '../MouseSmall.png';
import circlegif from '../circle.gif';
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';

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
      body: { bg: 'nmh.background', fontFamily: 'NoMoreHeroesFont, sans-serif' },
    },
  },
  fonts: {
    heading: 'NoMoreHeroesFont, sans-serif',
    body: 'NoMoreHeroesFont, sans-serif',
  },
});

const Home = () => {
  const [isGifVisible, setIsGifVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen]     = useState(false);

  const handleIconClick  = () => { setIsGifVisible(false); setIsMenuOpen(o => !o); };
  const handleMouseEnter = () => { setIsGifVisible(!isMenuOpen); };

  return (
    <ChakraProvider theme={theme}>
      <style>{`* { cursor: url(${MouseCursor}), auto !important; }`}</style>

      <nav>
        <Box position="fixed" top="40px" right="40px" zIndex={600}>
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <div className="icon-container">
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
          textAlign="center"
          py={20}
          px={0}
          width="100vw"
          position="fixed"
          zIndex={503}
          height="100vh"
          overflowY="auto"
        >
          <Box overflow="hidden" whiteSpace="nowrap" position="relative" height="70px" lineHeight="50px" mb={6}>
            <Heading as="h1" size="4xl" color="nmh.primary" className="scrolling-header">
              No More Heroes
            </Heading>
          </Box>

          <Image
            src={Logo}
            alt="No More Heroes Logo"
            mx="auto"
            boxSize="300px"
            height="auto"
            mb={6}
            className="hover-image"
          />

          <Text fontSize="5xl" mb={6} className="intro">
            <Typewriter
              words={['Welcome to the Garden of Madness!', 'Experience the thrill!', 'Join the adventure!']}
              loop
              cursor
              cursorStyle="_"
            />
          </Text>

          <Link to="/map">
            <Button
              size="lg"
              colorScheme="red"
              bg="nmh.accent"
              _hover={{ bg: 'nmh.primary', transform: 'scale(1.1)' }}
              transition="all 0.3s"
            >
              Explore Now
            </Button>
          </Link>

          <Box mt={10}>
            <Heading size="lg" mb={6} color="nmh.secondary">
              Explore the World of Santa Destroy
            </Heading>
            <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
              <Box w="200px" p={4} bg="nmh.background" borderRadius="8px" boxShadow="md">
                <Text fontSize="lg" color="nmh.secondary">Iconic Characters</Text>
              </Box>
              <Box w="200px" p={4} bg="nmh.background" borderRadius="8px" boxShadow="md">
                <Text fontSize="lg" color="nmh.secondary">Thrilling Battles</Text>
              </Box>
              <Box w="200px" p={4} bg="nmh.background" borderRadius="8px" boxShadow="md">
                <Text fontSize="lg" color="nmh.secondary">A Place to Die</Text>
              </Box>
            </Box>
          </Box>

          <Box as="footer" textAlign="center" py={4} bg="nmh.primary" color="nmh.secondary" mt={10}>
            <Text fontSize="lg">© 2025 Santa Destroy Experience</Text>
            <Box mt={2}>
              <Button as="a" href="#" variant="link" mx={2} color="nmh.secondary" fontSize="lg">Facebook</Button>
              <Button as="a" href="#" variant="link" mx={2} color="nmh.secondary" fontSize="lg">Twitter</Button>
              <Button as="a" href="#" variant="link" mx={2} target="_blank" color="nmh.secondary" fontSize="lg">Instagram</Button>
            </Box>
          </Box>
        </Box>
      </nav>
    </ChakraProvider>
  );
};

export default Home;
