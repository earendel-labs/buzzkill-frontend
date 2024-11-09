// LeaderboardTable.tsx
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
// Updated imports for solid triangle icons
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Define the sort directions
type SortDirection = "asc" | "desc";

// Define the columns that can be sorted
type SortableColumn =
  | "rank"
  | "name"
  | "invitesSent"
  | "pointsEarned"
  | "tasksCompleted";

export interface LeaderboardEntry {
  // Export the interface
  rank: number;
  name: string;
  handle: string;
  invitesSent: number;
  pointsEarned: number;
  tasksCompleted: number;
}

// Styled TableRow to include gradient bottom border
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

// Custom styled Typography for table headers
const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.Gold.main,
}));

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  const theme = useTheme(); // Access the theme
  const [sortColumn, setSortColumn] = useState<SortableColumn>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      // Toggle sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      let aValue: number | string = "";
      let bValue: number | string = "";

      switch (sortColumn) {
        case "rank":
          aValue = a.rank;
          bValue = b.rank;
          break;
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "invitesSent":
          aValue = a.invitesSent;
          bValue = b.invitesSent;
          break;
        case "pointsEarned":
          aValue = a.pointsEarned;
          bValue = b.pointsEarned;
          break;
        case "tasksCompleted":
          aValue = a.tasksCompleted;
          bValue = b.tasksCompleted;
          break;
        default:
          return 0;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }

      return 0;
    });
    return sorted;
  }, [data, sortColumn, sortDirection]);

  return (
    <TableContainer
      component={Box}
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(34, 46, 80, 0.6)",
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 1,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, rgba(34, 46, 80, 0.6) 0%, rgba(215, 215, 215, 0.3) 97%)",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: -1,
        },
        marginBottom: 6,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {/* Rank Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("rank")}
              aria-sort={
                sortColumn === "rank"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Rank</HeaderTypography>
                {sortColumn === "rank" &&
                  (sortDirection === "asc" ? (
                    <ArrowDropUpIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ) : (
                    <ArrowDropDownIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ))}
              </Box>
            </TableCell>
            {/* Name Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("name")}
              aria-sort={
                sortColumn === "name"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Name</HeaderTypography>
                {sortColumn === "name" &&
                  (sortDirection === "asc" ? (
                    <ArrowDropUpIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ) : (
                    <ArrowDropDownIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ))}
              </Box>
            </TableCell>
            {/* Invites Sent Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("invitesSent")}
              aria-sort={
                sortColumn === "invitesSent"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Invites Sent</HeaderTypography>
                {sortColumn === "invitesSent" &&
                  (sortDirection === "asc" ? (
                    <ArrowDropUpIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ) : (
                    <ArrowDropDownIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ))}
              </Box>
            </TableCell>
            {/* Points Earned Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("pointsEarned")}
              aria-sort={
                sortColumn === "pointsEarned"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Points Earned</HeaderTypography>
                {sortColumn === "pointsEarned" &&
                  (sortDirection === "asc" ? (
                    <ArrowDropUpIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ) : (
                    <ArrowDropDownIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ))}
              </Box>
            </TableCell>
            {/* Tasks Completed Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("tasksCompleted")}
              aria-sort={
                sortColumn === "tasksCompleted"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Tasks Completed</HeaderTypography>
                {sortColumn === "tasksCompleted" &&
                  (sortDirection === "asc" ? (
                    <ArrowDropUpIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ) : (
                    <ArrowDropDownIcon
                      fontSize="small"
                      sx={{ color: theme.palette.Gold.main }}
                    />
                  ))}
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <StyledTableRow key={row.rank}>
              {/* Rank */}
              <TableCell sx={{ color: "white" }}>{row.rank}</TableCell>
              {/* Name and Handle */}
              <TableCell>
                <Box sx={{ color: "white" }}>
                  <Typography variant="body1">{row.name}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 182, 193, 0.8)" }}
                  >
                    {row.handle}
                  </Typography>
                </Box>
              </TableCell>
              {/* Invites Sent */}
              <TableCell sx={{ color: "white" }}>{row.invitesSent}</TableCell>
              {/* Points Earned */}
              <TableCell sx={{ color: "white" }}>
                {row.pointsEarned.toLocaleString()} Points
              </TableCell>
              {/* Tasks Completed */}
              <TableCell sx={{ color: "white" }}>
                {row.tasksCompleted}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
