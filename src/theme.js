const theme = {
  color: {
    solOrange: '#FAA818',
    grey: '#21303A',
    white: '#ffffff',
    drkGrey: '#333333',
    cornBlue: '#428ACA',
  },
  device: {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktopS: `(max-width: ${size.desktopS})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopM: `(max-width: ${size.desktopM})`,
    desktopL: `(max-width: ${size.desktopL})`,
  },
};
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '526px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1340px',
  desktopS: '1500px',
  desktop: '1600px',
  desktopM: '1920px',
  desktopL: '2560px',
};

export default theme;
