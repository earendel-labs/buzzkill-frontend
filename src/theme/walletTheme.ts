import { Theme as MUITheme } from "@mui/material/styles";
import { darkTheme, Theme as RainbowKitTheme } from "@rainbow-me/rainbowkit";

function deepMerge(target: any, source: any): any {
  if (typeof target !== 'object' || typeof source !== 'object' || target === null || source === null) {
    return source;
  }

  const result = Array.isArray(target) ? [...target] : { ...target };

  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object') {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

export const createWalletTheme = (muiTheme: MUITheme): RainbowKitTheme => {
  return deepMerge(darkTheme(), {
    colors: {
      accentColor: muiTheme.palette.Gold.main,
      accentColorForeground: muiTheme.palette.text.primary,
      actionButtonBorder: muiTheme.palette.DarkOrange.main,
      actionButtonBorderMobile: muiTheme.palette.secondary.main,
      actionButtonSecondaryBackground: muiTheme.palette.background.default,
      closeButton: "#fff",
      closeButtonBackground: muiTheme.palette.DarkBlue.main,
      connectButtonBackground: muiTheme.palette.Blue.main,
      connectButtonBackgroundError: muiTheme.palette.error.main,
      connectButtonInnerBackground: muiTheme.palette.DarkBlue.main,
      connectButtonText: muiTheme.palette.text.primary,
      connectButtonTextError: muiTheme.palette.error.contrastText,
      connectionIndicator: muiTheme.palette.success.main,
      modalBackground: muiTheme.palette.background.default,
      modalText: muiTheme.palette.text.primary,
      modalTextDim: muiTheme.palette.text.secondary,
      modalTextSecondary: muiTheme.palette.text.primary,
      profileAction: muiTheme.palette.DarkOrange.main,
      profileActionHover: muiTheme.palette.DarkOrange.dark,
      profileForeground: muiTheme.palette.DarkBlue.main,
      selectedOptionBorder: muiTheme.palette.Gold.main,
      standby: muiTheme.palette.GoldFaded.main,
    },
    fonts: {
      body: "Poppins",
    },
    radii: {
      actionButton: "4px",
      connectButton: "4px",
      menuButton: "2px",
      modal: "2px",
      modalMobile: "2px",
    },
    shadows: {
      connectButton: muiTheme.shadows[2],
      dialog: muiTheme.shadows[8],
      profileDetailsAction: muiTheme.shadows[2],
      selectedOption: muiTheme.shadows[4],
      selectedWallet: muiTheme.shadows[6],
      walletLogo: muiTheme.shadows[1],
    },
  });
};
