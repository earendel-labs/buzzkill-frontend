// src/app/HoneyDrops/Components/leaderboardTable.tsx

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

type SortDirection = "asc" | "desc";
type SortableColumn =
  | "rank"
  | "account_name"
  | "invited_count"
  | "total_rewards";

export interface LeaderboardEntry {
  rank: number;
  account_name: string | null;
  address: string;
  invited_count: number;
  total_rewards: number;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  currentUserAddress: string; // New prop for current user's address
}

// Styled TableRow with optional highlighting
const StyledTableRow = styled(TableRow)<{ isCurrentUser: boolean }>(
  ({ theme, isCurrentUser }) => ({
    position: "relative",
    backgroundColor: isCurrentUser
      ? "rgba(255, 215, 0, 0.2)" // Gold highlight for current user
      : "inherit",
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
  })
);

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.Gold.main,
}));

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  data,
  currentUserAddress,
}) => {
  const theme = useTheme();
  const [sortColumn, setSortColumn] = useState<SortableColumn>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
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
        case "account_name":
          aValue = a.account_name ? a.account_name.toLowerCase() : "";
          bValue = b.account_name ? b.account_name.toLowerCase() : "";
          break;
        case "invited_count":
          aValue = a.invited_count;
          bValue = b.invited_count;
          break;
        case "total_rewards":
          aValue = a.total_rewards;
          bValue = b.total_rewards;
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
            "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.2) 70%, rgba(215, 215, 215, 0.25) 90%, rgba(255, 255, 255, 0.3) 100%)", // Lighter bottom-right corner
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
            {/* Account Name Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("account_name")}
              aria-sort={
                sortColumn === "account_name"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Account Name</HeaderTypography>
                {sortColumn === "account_name" &&
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
            {/* Invited Count Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("invited_count")}
              aria-sort={
                sortColumn === "invited_count"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Total Invites</HeaderTypography>
                {sortColumn === "invited_count" &&
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
            {/* Total Rewards Column */}
            <TableCell
              sx={{ cursor: "pointer" }}
              onClick={() => handleSort("total_rewards")}
              aria-sort={
                sortColumn === "total_rewards"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Points Earned</HeaderTypography>
                {sortColumn === "total_rewards" &&
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
          {sortedData.map((row) => {
            const isCurrentUser =
              row.address.toLowerCase() === currentUserAddress.toLowerCase();
            return (
              <StyledTableRow
                key={row.address}
                isCurrentUser={isCurrentUser}
                // Optional: Add hover effect for better UX
                sx={{
                  "&:hover": {
                    backgroundColor: isCurrentUser
                      ? "rgba(255, 215, 0, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {/* Rank */}
                <TableCell sx={{ color: "white" }}>{row.rank}</TableCell>
                {/* Account Name and Address */}
                <TableCell>
                  <Box sx={{ color: "white" }}>
                    {/* Account Name and "You" Label */}
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1">
                        {row.account_name || "Anonymous"}
                      </Typography>
                      {isCurrentUser && (
                        <Typography
                          variant="caption"
                          sx={{
                            marginLeft: 1,
                            color: theme.palette.Gold.main,
                            fontWeight: "bold",
                          }}
                        >
                          You
                        </Typography>
                      )}
                    </Box>
                    {/* Address */}
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.LightBlue.main }}
                    >
                      {row.address}
                    </Typography>
                  </Box>
                </TableCell>
                {/* Invited Count */}
                <TableCell sx={{ color: "white" }}>
                  {row.invited_count}
                </TableCell>
                {/* Total Rewards */}
                <TableCell sx={{ color: "white" }}>
                  {row.total_rewards.toLocaleString()} Points
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
