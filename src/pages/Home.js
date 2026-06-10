import React, { useState, useRef, useEffect } from 'react';
import '../fonts.css';
import '../App.css';
import { ChakraProvider, Box, Heading, Text, Image, Button, extendTheme, Menu, MenuButton, MenuItem, MenuList, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'; 
import Logo from '../NoMoreHeroesTransparent.png';
import ArrowImg from '../arrow-removebg-preview.png';
import MouseCursor from '../MouseSmall.png';
import circlegif from '../circle.gif';
import { Outlet, Link, Route, BrowserRouter as Router } from "react-router-dom";
import { NavLink } from 'react-router-dom';


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

  const handleMouseEnter = () => {
    if (isMenuOpen) {
        setIsGifVisible(false); 
      } else {
        setIsGifVisible(true); 
      }
       
  };

  return (
    <ChakraProvider theme={theme}>
      <style>{`* { cursor: url(${MouseCursor}), auto !important; }`}</style>
      
        <nav>
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

          <Box textAlign="center" py={20} px={0} width="100vw" overflowX="hidden" position='fixed'>
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
            <style>{`
              /* Arrow flies in from right with a sine wobble, then shoots through */
              @keyframes arrow-fly {
                0%   { transform: translateX(120vw) translateY(0px) rotate(0deg); opacity: 1; }
                30%  { transform: translateX(60vw)  translateY(var(--s1)) rotate(var(--r1)); opacity: 1; }
                60%  { transform: translateX(10vw)  translateY(var(--s2)) rotate(var(--r2)); opacity: 1; }
                80%  { transform: translateX(-20vw) translateY(0px) rotate(0deg); opacity: 1; }
                100% { transform: translateX(-120vw) translateY(0px) rotate(0deg); opacity: 0; }
              }
              /* Text cut-reveal: hidden until arrow passes through */
              @keyframes slash-reveal {
                0%   { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); opacity: 0; }
                5%   { opacity: 1; }
                100% { clip-path: polygon(0 0, 110% 0, 110% 100%, 0 100%); opacity: 1; }
              }
              .sword-row {
                position: relative;
                margin-bottom: 0.5rem;
                height: 3.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: visible;
              }
              .sword-text {
                position: relative;
                display: inline-block;
                animation: slash-reveal 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
                clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
                opacity: 0;
              }
              .arrow-slash {
                position: absolute;
                top: 50%;
                right: -10vw;
                transform: translateY(-50%);
                width: 80px;
                height: auto;
                pointer-events: none;
                animation: arrow-fly 1.1s cubic-bezier(0.4,0,0.2,1) forwards;
                z-index: 20;
              }
            `}</style>
            <Box mb={6} fontSize="4xl" lineHeight="1.3">
              {[
                { text: 'Welcome to the Garden of Madness!', color: '#E51C23', s1: '-12px', r1: '-6deg', s2: '10px',  r2: '4deg',  delay: 0    },
                { text: 'Experience the thrill!',            color: '#F4B400', s1: '14px',  r1: '5deg',  s2: '-8px',  r2: '-3deg', delay: 0.7  },
                { text: 'Join the adventure!',               color: '#FFFFFF', s1: '-8px',  r1: '-4deg', s2: '12px',  r2: '6deg',  delay: 1.4  },
              ].map(({ text, color, s1, r1, s2, r2, delay }, i) => (
                <div className="sword-row" key={i}>
                  <img
                    src={ArrowImg}
                    alt=""
                    className="arrow-slash"
                    style={{
                      '--s1': s1, '--r1': r1,
                      '--s2': s2, '--r2': r2,
                      animationDelay: `${delay}s`,
                    }}
                  />
                  <span
                    className="sword-text"
                    style={{
                      animationDelay: `${delay + 0.55}s`,
                      color,
                      fontFamily: 'NoMoreHeroesFont, sans-serif',
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </Box>
            <Link to='/map'>
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
              <Heading size="lg" mb={6} color='nmh.secondary'>
                Explore the World of Santa Destroy
              </Heading>
              <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
                <Box w="200px" p={4} bg="nmh.background" borderRadius="8px" boxShadow="md">
                  <Text fontSize="lg" color='nmh.secondary'>Iconic Characters</Text>
                </Box>
                <Box w="200px" p={4} bg="nmh.background" borderRadius="8px" boxShadow="md">
                  <Text fontSize="lg" color='nmh.secondary'>Thrilling Battles</Text>
                </Box>
                <Box w="200px" p={4} bg="nmh.background" borderRadius="8px" boxShadow="md">
                  <Text fontSize="lg" color='nmh.secondary'>A Place to Die</Text>
                </Box>
              </Box>
            </Box>
            <Box as="footer" textAlign="center" py={4} bg="nmh.primary" color="nmh.secondary" mt={10}>
              <Text fontSize="lg">© 2025 Santa Destroy Experience</Text>
              <Box mt={2}>
                <Button as="a" href="#" variant="link" mx={2} color="nmh.secondary" fontSize="lg">
                  Facebook
                </Button>
                <Button as="a" href="#" variant="link" mx={2} color="nmh.secondary" fontSize="lg">
                  Twitter
                </Button>
                <Button as="a" href="#" variant="link" mx={2} target="_blank" color="nmh.secondary" fontSize="lg">
                  Instagram
                </Button>
              </Box>
            </Box>
          </Box>
        
        </nav>
      
    </ChakraProvider>
  );
};

export default Home;
