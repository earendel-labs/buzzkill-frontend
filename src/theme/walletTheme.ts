import { Theme as MUITheme } from "@mui/material/styles";
import merge from "lodash.merge";
import { darkTheme, Theme as RainbowKitTheme } from "@rainbow-me/rainbowkit";

export const createWalletTheme = (muiTheme: MUITheme): RainbowKitTheme => {
  return merge(darkTheme(), {
    colors: {
      accentColor: muiTheme.palette.Orange.main, // Gold accent color
      accentColorForeground: muiTheme.palette.text.primary, // Foreground color for accent
      actionButtonBorder: muiTheme.palette.DarkOrange.main, // Border for action buttons
      actionButtonBorderMobile: muiTheme.palette.secondary.main, // Border for mobile buttons
      actionButtonSecondaryBackground: muiTheme.palette.background.default, // Secondary background for buttons
      closeButton: "#fff", // Close button color
      closeButtonBackground: muiTheme.palette.DarkBlue.main, // Background for close button
      connectButtonBackground: muiTheme.palette.Blue.main, // Blue background for the connect button (matching your second screenshot)
      connectButtonBackgroundError: muiTheme.palette.error.main, // Error background
      connectButtonInnerBackground: muiTheme.palette.DarkBlue.main, // Inner background for the button
      connectButtonText: muiTheme.palette.text.primary, // Primary text color for connect button
      connectButtonTextError: muiTheme.palette.error.contrastText, // Error text color
      connectionIndicator: muiTheme.palette.success.main, // Success indicator color
      modalBackground: muiTheme.palette.background.default, // Background for modal
      modalText: muiTheme.palette.text.primary, // Primary text color in modal
      modalTextDim: muiTheme.palette.text.secondary, // Dimmed text for secondary text
      modalTextSecondary: muiTheme.palette.text.primary, // Secondary text (switch to primary for better contrast)
      profileAction: muiTheme.palette.DarkOrange.main, // Profile action button color
      profileActionHover: muiTheme.palette.DarkOrange.dark, // Profile action button hover color
      profileForeground: muiTheme.palette.DarkBlue.main, // Foreground text for profile actions
      selectedOptionBorder: muiTheme.palette.Gold.main, // Border for selected option
      standby: muiTheme.palette.GoldFaded.main, // Standby color
    },
    fonts: {
      body: "Poppins", // Set body font to "Poppins"
    },
    radii: {
      actionButton: "4px", // Action button radius
      connectButton: "4px", // Connect button radius
      menuButton: "2px", // Menu button radius
      modal: "2px", // Modal radius
      modalMobile: "2px", // Modal radius for mobile
    },
    shadows: {
      connectButton: muiTheme.shadows[2], // Shadow for connect button
      dialog: muiTheme.shadows[8], // Shadow for dialogs
      profileDetailsAction: muiTheme.shadows[2], // Profile details action shadow
      selectedOption: muiTheme.shadows[4], // Selected option shadow
      selectedWallet: muiTheme.shadows[6], // Selected wallet shadow
      walletLogo: muiTheme.shadows[1], // Wallet logo shadow
    },
  });
};
