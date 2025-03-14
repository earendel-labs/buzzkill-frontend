import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";

// Styled TableRow with gradient bottom border
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background:
      "linear-gradient(135deg, rgba(34, 46, 80, 0.6) 0%, rgba(215, 215, 215, 0.3) 97%)",
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.Gold.main,
  fontWeight: "bold",
  fontSize: "1rem", // Adjusted for better spacing
}));

interface HatchlingEntry {
  id: number;
  rarity: string;
  mintingPoints: number;
  baseDailyYield: number;
}

interface HatchlingTableProps {
  data: HatchlingEntry[];
}

export const HatchlingTable: React.FC<HatchlingTableProps> = ({ data }) => {
  const theme = useTheme();

  // Fixed rarity order
  const rarityOrder: Record<string, number> = {
    common: 1,
    rare: 2,
    "ultra-rare": 3,
  };

  const sortedData = [...data].sort(
    (a, b) =>
      rarityOrder[a.rarity.toLowerCase()] - rarityOrder[b.rarity.toLowerCase()]
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        position: "relative",
        backgroundColor: "rgba(34, 46, 80, 0.4)", // Reduced transparency
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
        borderRadius: "12px",
        padding: "1rem",
        zIndex: 1,
        marginBottom: "1rem",
        maxWidth: "70%", // Reduced table width
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: "6px 12px" }}>
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Rarity</HeaderTypography>
              </Box>
            </TableCell>
            <TableCell sx={{ padding: "6px 12px" }}>
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Minting Points</HeaderTypography>
              </Box>
            </TableCell>
            <TableCell sx={{ padding: "6px 12px" }}>
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">
                  Base Daily Yield
                </HeaderTypography>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell sx={{ color: "white", padding: "6px 12px" }}>
                {row.rarity}
              </TableCell>
              <TableCell sx={{ color: "white", padding: "6px 12px" }}>
                {row.mintingPoints}
              </TableCell>
              <TableCell sx={{ color: "white", padding: "6px 12px" }}>
                {row.baseDailyYield}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HatchlingTable;
