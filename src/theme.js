export const size = {
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

const theme = {
  color: {
    white: '#ffffff',
    soulOrange: '#FAA818',
    soulOrangeLight: '#FAA81890',
    cornBlue: '#428ACA',
    blueGrey: '#333333',
    drkGrey: '#21303A',
  },
  fonts: {
    nuni: 'Nunito Sans',
    mont: 'Montserrat',
    spec: 'Sepctral',
    karl: 'Karla',
    pop: 'Poppins',
    muli: 'Muli',
    // - Poppins (Headings, Titles)
    // - Nunito Sans (TExt, body )
    // - Spectral (menu, lists)
    // - Karla (Buttons, links, navitems)
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


export default theme;
