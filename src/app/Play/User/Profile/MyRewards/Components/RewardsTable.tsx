// src/app/HoneyDrops/Components/RewardsTable.tsx
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
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
 // Define sort directions
type SortDirection = "asc" | "desc";

// Define sortable columns
type SortableColumn = "task" | "phase" | "points";

// Interface for Reward entries
export interface RewardEntry {
  id: number;
  task: string;
  phase: string;
  points: number;
}

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

// Styled Typography for table headers
const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.Gold.main,
  fontWeight: "bold",
}));

interface RewardsTableProps {
  data: RewardEntry[];
}

export const RewardsTable: React.FC<RewardsTableProps> = ({ data }) => {
  const theme = useTheme(); // Access the theme
  const [sortColumn, setSortColumn] = useState<SortableColumn>("points");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

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
        case "task":
          aValue = a.task.toLowerCase();
          bValue = b.task.toLowerCase();
          break;
        case "phase":
          aValue = a.phase.toLowerCase();
          bValue = b.phase.toLowerCase();
          break;
        case "points":
          aValue = a.points;
          bValue = b.points;
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
            {/* Task Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("task")}
              aria-sort={
                sortColumn === "task"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Task</HeaderTypography>
                {sortColumn === "task" &&
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

            {/* Phase Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("phase")}
              aria-sort={
                sortColumn === "phase"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Phase</HeaderTypography>
                {sortColumn === "phase" &&
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

            {/* Points Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("points")}
              aria-sort={
                sortColumn === "points"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Points</HeaderTypography>
                {sortColumn === "points" &&
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
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ padding: "2rem" }}>
                <Typography variant="h6" color="text.secondary">
                  No rewards available at the moment
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row) => (
              <StyledTableRow key={row.id}>
                {/* Task */}
                <TableCell sx={{ color: "white" }}>{row.task}</TableCell>
                {/* Phase */}
                <TableCell sx={{ color: "white" }}>{row.phase}</TableCell>
                {/* Points */}
                <TableCell sx={{ color: "white" }}>{row.points}</TableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
