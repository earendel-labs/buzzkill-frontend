import React from "react";
import { Box } from "@mui/material";
import Image from "next/image"; // Next.js Image component
import Typography from "@mui/material/Typography";

const UserResourceBar: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "110px",
        left: "20px",
        width: "460px",
        height: "60px",
        backgroundImage: "url(/Frames/UserResources/UserResourceBar.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "10px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
          padding: "0 10px 0px 35px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
          <Image
            src="/Icons/Resources/Pollen.svg"
            alt="Pollen"
            width={32}
            height={32}
          />
          <Typography
            variant="h6"
            sx={{ minWidth: "50px", textAlign: "lex-end" }}
          >
            75,345
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
          <Image
            src="/Icons/Resources/Nectar.svg"
            alt="Nectar"
            width={32}
            height={32}
          />
          <Typography
            variant="h6"
            sx={{ minWidth: "50px", textAlign: "lex-end" }}
          >
            235,245
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
          <Image
            src="/Icons/Resources/Sap.svg"
            alt="Sap"
            width={32}
            height={32}
          />
          <Typography
            variant="h6"
            sx={{ minWidth: "50px", textAlign: "lex-end" }}
          >
            75,655
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
          <Image
            src="/Icons/Resources/HoneyToken.svg"
            alt="HoneyToken"
            width={32}
            height={32}
          />
          <Typography
            variant="h6"
            sx={{ minWidth: "50px", textAlign: "lex-end" }}
          >
            953,547 
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserResourceBar;
