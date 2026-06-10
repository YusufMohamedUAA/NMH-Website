import React, { useState, useRef } from 'react';
import '../fonts.css';
import '../App.css';
import { ChakraProvider, Box, Image, Menu, MenuButton, MenuItem, MenuList, IconButton, extendTheme } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import circlegif from '../circle.gif';
import MouseCursor from '../MouseSmall.png';
import MapSD from '../Map.png';
import Motel1 from '../Motel1.png';
import Motel2 from '../Motel2.png';
import ATM1 from '../ATM1.png';
import ATM2 from '../ATM2.PNG';
import Area51_1 from '../Area 511.png';
import Area51_2 from '../Area_512.PNG';
import BeefHead1 from '../Beef Head1.png';
import BeefHead2 from '../Beef_Head2.PNG';
import GoldTown1 from '../Gold Town1.png';
import GoldTown2 from '../Gold_Town2.PNG';
import JobCenter1 from '../Job Center1.png';
import JobCenter2 from '../Job_Center2.PNG';
import KEntertainment1 from '../K-Entertainment1.png';
import KEntertainment2 from '../K_Entertainment2.PNG';
import ThunderRyu1 from '../Thunder Ryu1.png';
import ThunderRyu2 from '../Thunder_Ryu2.PNG';
import Naomi1 from '../Naomi\'s Lab1.png';
import Naomi2 from '../Naomis_Lab2.PNG';
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

const MARKER_DATA = {
  motel: {
    icon: Motel1,
    preview: Motel2,
    label: 'NO MORE HEROES MOTEL',
    ticker: 'NO MORE HEROES MOTEL  ✦  SANTA DESTROY, CA  ✦  CHECK IN ANYTIME  ✦  ',
    top: '52%',
    left: '48%',
  },
  atm: {
    icon: ATM1,
    preview: ATM2,
    label: 'ATM',
    ticker: 'ATM  ✦  SANTA DESTROY, CA  ✦  WITHDRAW YOUR WINNINGS  ✦  RANK UP  ✦  ',
    top: '38%',
    left: '62%',
  },
  area51: {
    icon: Area51_1,
    preview: Area51_2,
    label: 'AREA 51',
    ticker: 'AREA 51  ✦  SANTA DESTROY, CA  ✦  REGISTER FOR THE NEXT RANKING BATTLE  ✦  ',
    top: '28%',
    left: '38%',
  },
  beefhead: {
    icon: BeefHead1,
    preview: BeefHead2,
    label: 'BEEF HEAD',
    ticker: 'BEEF HEAD  ✦  SANTA DESTROY, CA  ✦  BEST BURGERS IN TOWN  ✦  OPEN 24/7  ✦  ',
    top: '62%',
    left: '32%',
  },
  goldtown: {
    icon: GoldTown1,
    preview: GoldTown2,
    label: 'GOLD TOWN',
    ticker: 'GOLD TOWN  ✦  SANTA DESTROY, CA  ✦  SHOP TILL YOU DROP  ✦  NEW GEAR AWAITS  ✦  ',
    top: '44%',
    left: '58%',
  },
  jobcenter: {
    icon: JobCenter1,
    preview: JobCenter2,
    label: 'JOB CENTER',
    ticker: 'JOB CENTER  ✦  SANTA DESTROY, CA  ✦  SIDE JOBS AVAILABLE  ✦  EARN EXTRA LB  ✦  ',
    top: '58%',
    left: '68%',
  },
  kentertainment: {
    icon: KEntertainment1,
    preview: KEntertainment2,
    label: 'K-ENTERTAINMENT',
    ticker: 'K-ENTERTAINMENT  ✦  SANTA DESTROY, CA  ✦  YOUR FIGHTS. YOUR GLORY.  ✦  ',
    top: '35%',
    left: '50%',
  },
  thunderryu: {
    icon: ThunderRyu1,
    preview: ThunderRyu2,
    label: 'THUNDER RYU GYM',
    ticker: 'THUNDER RYU GYM  ✦  SANTA DESTROY, CA  ✦  TRAIN HARD. FIGHT HARDER.  ✦  ',
    top: '68%',
    left: '44%',
  },
  naomi: {
    icon: Naomi1,
    preview: Naomi2,
    label: "NAOMI'S LAB",
    ticker: "NAOMI'S LAB  ✦  SANTA DESTROY, CA  ✦  BEAM KATANA UPGRADES AVAILABLE  ✦  ",
    top: '75%',
    left: '55%',
  },
};

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.2;

const Home = () => {
  const [isGifVisible, setIsGifVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [stripVisible, setStripVisible] = useState(false);
  const [zoom, setZoom] = useState(1);
  const leaveTimer = useRef(null);

  const handleZoomIn  = () => setZoom(z => Math.min(MAX_ZOOM, parseFloat((z + ZOOM_STEP).toFixed(2))));
  const handleZoomOut = () => setZoom(z => Math.max(MIN_ZOOM, parseFloat((z - ZOOM_STEP).toFixed(2))));

  const handleMarkerEnter = (key) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHoveredMarker(key);
    requestAnimationFrame(() => setStripVisible(true));
  };

  const handleMarkerLeave = () => {
    setStripVisible(false);
    leaveTimer.current = setTimeout(() => {
      setHoveredMarker(null);
      leaveTimer.current = null;
    }, 400);
  };

  const handleIconClick = () => {
    setIsGifVisible(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => {
    setIsGifVisible(!isMenuOpen);
  };

  const markerInfo = hoveredMarker ? MARKER_DATA[hoveredMarker] : null;

  return (
    <ChakraProvider theme={theme}>
      <style>{`* { cursor: url(${MouseCursor}), auto !important; }`}</style>
      <style>{`
        .strip-bar {
          position: fixed;
          bottom: 0;
          right: 0;
          height: 72px;
          width: 0%;
          background: #fff;
          z-index: 30;
          overflow: hidden;
          transition: width 0.38s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          box-shadow: 0 -3px 22px rgba(229,28,35,0.22);
          display: flex;
          align-items: center;
        }
        .strip-bar.visible { width: 100%; }

        .ticker-track {
          display: flex;
          white-space: nowrap;
          will-change: transform;
          animation: ticker-scroll 28s linear infinite;
        }
        .ticker-track span {
          font-family: NoMoreHeroesFont, sans-serif;
          font-size: 1.5rem;
          color: #E51C23;
          letter-spacing: 0.08em;
          padding-right: 2rem;
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .polaroid {
          position: fixed;
          bottom: 90px;
          left: 32px;
          z-index: 31;
          background: white;
          padding: 10px 10px 0 10px;
          box-shadow: 6px 10px 32px rgba(0,0,0,0.8);
          transform: rotate(-2.5deg) translateY(10px);
          opacity: 0;
          transition: opacity 0.28s ease 0.08s, transform 0.28s ease 0.08s;
          pointer-events: none;
        }
        .polaroid.visible {
          opacity: 1;
          transform: rotate(-2.5deg) translateY(0px);
        }
        .polaroid img {
          display: block;
          width: 230px;
          height: 170px;
          object-fit: cover;
        }
        .polaroid-label {
          font-family: NoMoreHeroesFont, sans-serif;
          font-size: 0.78rem;
          color: #141414;
          text-align: center;
          padding: 10px 4px 12px;
          letter-spacing: 0.06em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 230px;
          display: flex;
          justify-content: center;
        }
        .polaroid-label .char {
          display: inline-block;
          animation: char-wiggle 1.8s ease-in-out infinite;
        }
        @keyframes char-wiggle {
          0%,  100% { transform: translateY(0px)   rotate(0deg); }
          25%        { transform: translateY(-2px)  rotate(-1.5deg); }
          75%        { transform: translateY(1.5px) rotate(1deg); }
        }

        .zoom-controls {
          position: fixed;
          bottom: 90px;
          right: 20px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .zoom-btn {
          width: 36px;
          height: 36px;
          background: #141414;
          color: #E51C23;
          border: 2px solid #E51C23;
          font-family: NoMoreHeroesFont, sans-serif;
          font-size: 1.3rem;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
          user-select: none;
        }
        .zoom-btn:hover { background: #E51C23; color: #141414; }
        .zoom-btn:disabled { opacity: 0.35; cursor: default; pointer-events: none; }
        .zoom-label {
          font-family: NoMoreHeroesFont, sans-serif;
          font-size: 0.65rem;
          color: #fff;
          text-align: center;
          letter-spacing: 0.05em;
          opacity: 0.7;
        }

        .map-viewport {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          border: none;
          margin: 0;
        }

        .map-inner {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center center;
          width: 100%;
          height: 100%;
          transition: transform 0.22s ease;
        }

        .marker-circle-gif {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(2.2);
          pointer-events: none;
          z-index: 5;
        }
      `}</style>

      <nav>
        <Box position="fixed" top="20px" right="20px" zIndex="100">
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

        <div className="map-viewport">
          <div
            className="map-inner"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={MapSD}
              alt="Map"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {Object.entries(MARKER_DATA).map(([key, data]) => (
              <Marker
                key={key}
                top={data.top}
                left={data.left}
                isHovered={hoveredMarker === key}
                onHover={() => handleMarkerEnter(key)}
                onLeave={handleMarkerLeave}
                Icon={data.icon}
                zoom={zoom}
              />
            ))}
          </div>

          <div className="zoom-controls">
            <button className="zoom-btn" onClick={handleZoomIn}  disabled={zoom >= MAX_ZOOM} aria-label="Zoom in">+</button>
            <span className="zoom-label">{Math.round(zoom * 100)}%</span>
            <button className="zoom-btn" onClick={handleZoomOut} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out">−</button>
          </div>
        </div>
      </nav>

      {hoveredMarker && (
        <div className={`polaroid${stripVisible ? ' visible' : ''}`}>
          <img src={markerInfo.preview} alt={markerInfo.label} />
          <div className="polaroid-label">
            {markerInfo.label.split('').map((char, i) => (
              <span
                key={i}
                className="char"
                style={{
                  animationDelay: `${i * 0.07}s`,
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={`strip-bar${stripVisible ? ' visible' : ''}`}>
        {hoveredMarker && (
          <div className="ticker-track">
            <span>{markerInfo.ticker.repeat(6)}</span>
            <span>{markerInfo.ticker.repeat(6)}</span>
          </div>
        )}
      </div>
    </ChakraProvider>
  );
};

const Marker = ({ top, left, isHovered, onHover, onLeave, Icon, zoom }) => {
  const counterScale = 1 / zoom;

  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      transform={`translate(-50%, -50%) scale(${counterScale})`}
      transformOrigin="center center"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      cursor="pointer"
      zIndex={isHovered ? 10 : 2}
    >
      <Box position="relative" width="50px" height="50px">
        <Image
          src={Icon}
          alt="Marker"
          boxSize="50px"
          style={{
            filter: 'drop-shadow(2px 0 0 black) drop-shadow(-2px 0 0 black) drop-shadow(0 2px 0 black) drop-shadow(0 -2px 0 black)',
          }}
        />
        {isHovered && (
          <img
            src={circlegif}
            alt="highlight"
            className="marker-circle-gif"
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;
