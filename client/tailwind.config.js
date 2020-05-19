const colors = {
  transparent: "transparent",
  white: "#ffffff",
  black: "#000000",
  "black-opacity-10": "rgba(0, 0, 0, .1)",
  red: "#FF3366",
  pink: "#FF3395",
  "pink-100": "#fff5f8",
  "dark-red": "#B12145",
  danger: "#e3342f",
  "dark-grey": "#443E3E",
  grey: "#909090",
  "light-grey": "#CCCCCC",
  "light-grey-transparent": "rgba(27,27,27,.8)",
  "xs-grey": "#F6F6F6",
  divider: "#DFDFDF",
  yellow: "#FEFA00",
  "dark-green": "#00C337",
  green: "#2BFF02",
  "light-blue": "#5CD2FD"
};

module.exports = {
  theme: {
    container: {
      center: true
    },
    inset: {
      '0': '0',
      auto: 'auto',
      '100': "100%"
    },
    screens: {
      xs: {'raw': '(min-width: 320px)'},
      sm: {'raw': '(min-width: 480px)'},
      md: {'raw': '(min-width: 768px)'},
      lg: {'raw': '(min-width: 1001px)'},
      xl: {
        'raw': '(min-width: 1320px) and (device-pixel-ratio: 1.9), ' +
          '(min-width: 1320px) and (max-resolution: 191dpi), '
          + '(min-width: 768px) and (device-pixel-ratio: 2), '
          + '(min-width: 768px) and (min-resolution: 192dpi)'
      },
      hd: {
        'raw': '(min-width: 1780px) and (device-pixel-ratio: 1.9), ' +
          '(min-width: 1780px) and (max-resolution: 191dpi), '
          + '(min-width: 768px) and (device-pixel-ratio: 2), '
          + '(min-width: 768px) and (min-resolution: 192dpi)'
      },

      // xs: "320px",
      // sm: "480px",
      // md: "768px",
      // lg: "1001px",
      // xl: "1320px",
      // hd: "1780px",
    },
    fluidContainer: {
      default: {
        responsiveMaxWidth: {
          md: "959px",
          lg: "1320px",
          hd: "1740px"
        },
        padding: "20px"
      }
    },
    fontFamily: {
      body: ["TTNorms", "sans-serif"],
      button: ["TTNorms", "sans-serif"]
    },
    backgroundColor: theme => colors,
    borderColor: theme => colors,
    textColor: theme => colors,
    stroke: theme => colors,
    fill: theme => colors,
    extend: {
      margin: {
        "-2": "-2px",
        "-0-35": "-0.35rem",
        "7": "1.75rem",
        "9": "2.25rem",
        "15": "3.75rem",
        "22-5": "4.5rem",
        "25": "6.2rem",
        "26": "6.3125rem",
        "42": "10.5rem"
      },
      padding: {
        "2-5": "0.65rem",
        "3-5": "0.95rem",
        "7": "1.75rem",
        "9": "2.25rem",
        "21": "5.25rem",
        "22": "5.5rem",
        "25": "6.5rem",
        "44": "11rem"
      },
      zIndex: {
        "1": "1",
        "-1": "-1"
      },
      letterSpacing: {
        tightest: "-0.1em"
      },
      width: {
        "7": "1.875rem",
        "9": "2.125rem",
        "15": "3.75rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "33": "8.125rem",
        "38": "9.75rem",
        "102": "25.625rem",
        "70": "17.5rem",
        "75": "19.44rem",
        "76": "19rem",
        "80": "20rem",
        "1218": "1218px",
        "header-plans": "37.125rem",
        "user-dropdown": "29.5rem",
        "80px": '80px',
        "100px": '100px',
      },
      height: {
        "2px": "2px",
        "2": "0.5rem",
        "7": "1.875rem",
        "8": "2rem",
        "10": "2.5rem",
        "13": "3.125rem",
        "15": "3.75rem",
        "30": "7.5rem",
        "36": "9rem",
        "65": "16.37rem",
        "72": "18rem",
        "80": "20rem",
        "badge-xl": "1.625rem",
        "photo-hd": "29.5rem", // 472
        "photo-lg": "27.185rem", // 435
        "photo-md": "20.3125rem", // 325
        "photo-sm": "18.625rem", // 298
        photo: "24.8125rem", // 397
        // "e-photo-md": "14.8125rem",
        "e-photo-md": "13.875rem",
        // "e-photo-lg": "15.625rem",
        "e-photo-lg": "13.875rem",
        "e-photo-xl": "19.585rem",
        // "e-photo-hd": "13.875rem",
        "e-photo-hd": "19.585rem",
        // Gallery
        "gallery-hd": "47.5rem", // 760
        "gallery-lg": "43.75rem", // 700
        "gallery-md": "42.625rem", // 682
        "gallery-sm": "39.125rem", // 626
        gallery: "28.4375rem" // 455
      },
      fontSize: {
        "2xs": "0.5rem",
        xs: "0.8125rem",
        sm: "0.9375rem",
        lg: "1.0625rem",
        "4xl": "2rem",
        "4-65xl": "2.625rem",
        "5-5xl": "3.5rem",
        "5-75xl": "3.75rem",
        "6-5xl": "4.5rem",
        "7xl": "5.625rem"
      },
      borderWidth: {
        "5": "5px"
      }
    }
  },
  variants: {
    stroke: ["responsive", "hover", "focus"],
    cursor: ["responsive", "hover", "focus"],
    backgroundColor: ["responsive", "hover", "focus", "active"],
    padding: ["responsive", "hover", "focus", "active", "even"],
    margin: ["responsive", "hover", "focus", "active", "last"],
    fluidContainer: ["responsive"]
  },
  plugins: [
    require("tailwindcss-transition")({
      standard: "all .3s ease",
      transitions: {
        slow: "all 2s ease",
        "normal-in-out-quad": "all 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)",
        "slow-in-out-quad": "all 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)"
      }
    }),
    require("tailwindcss-fluid-container")({
      componentPrefix: "fluid-"
    })
  ]
};
