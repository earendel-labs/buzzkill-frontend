"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
 
// Define sort directions and sortable columns for the leaderboard
type SortDirection = "asc" | "desc";
type SortableColumn = "rank" | "address" | "total_rewards";

// Leaderboard entry interface matching API data
export interface LeaderboardEntry {
  id: number;
  rank: number;
  account_name: string | null;
  address: string;
  invited_count: number;
  total_rewards: number;
}

// Styled TableRow with gradient bottom border matching RewardsTable styling
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "1px",
    background:
      "linear-gradient(135deg, rgba(34, 46, 80, 0.6) 0%, rgba(215, 215, 215, 0.3) 97%)",
  },
}));

// Styled Typography for table headers
const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.Gold.main,
  fontWeight: "bold",
}));

interface MiniLeaderboardTableProps {
  data: LeaderboardEntry[];
}

export const MiniLeaderboardTable: React.FC<MiniLeaderboardTableProps> = ({
  data,
}) => {
  const theme = useTheme();
  const [sortColumn, setSortColumn] = useState<SortableColumn>("total_rewards");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    const entries = [...data];
    entries.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;
      switch (sortColumn) {
        case "rank":
          aValue = a.rank;
          bValue = b.rank;
          break;
        case "address":
          aValue = a.account_name?.toLowerCase() || a.address.toLowerCase();
          bValue = b.account_name?.toLowerCase() || b.address.toLowerCase();
          break;
        case "total_rewards":
          aValue = a.total_rewards;
          bValue = b.total_rewards;
          break;
        default:
          aValue = "";
          bValue = "";
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
    return entries;
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
            "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.2) 70%, rgba(215, 215, 215, 0.25) 90%, rgba(255, 255, 255, 0.3) 100%)",
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
            <TableCell
              sx={{ cursor: "pointer", py: 0.5, px: 1 }}
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
            <TableCell
              sx={{ cursor: "pointer", py: 0.5, px: 1 }}
              onClick={() => handleSort("address")}
              aria-sort={
                sortColumn === "address"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <Box display="flex" alignItems="center">
                <HeaderTypography variant="h6">Username</HeaderTypography>
                {sortColumn === "address" &&
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
            <TableCell
              sx={{ cursor: "pointer", py: 0.5, px: 1 }}
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
                <HeaderTypography variant="h6">Points</HeaderTypography>
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
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  No leaderboard data available
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell sx={{ color: "white" }}>{row.rank}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {row.account_name ? row.account_name : row.address}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {row.total_rewards}
                </TableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MiniLeaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isXXL = useMediaQuery("(min-width:1800px)");
  const isXL = useMediaQuery("(min-width:1536px)");
  const isLG = useMediaQuery("(min-width:1280px)");

  let rowsToShow = 3;
  if (isXXL) {
    rowsToShow = 8;
  } else if (isXL) {
    rowsToShow = 5;
  } else if (isLG) {
    rowsToShow = 3;
  }

  useEffect(() => {
    let isMounted = true;

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/rewards/leaderboard-data", {
          method: "GET",
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.error || "Failed to fetch leaderboard data."
          );
        }
        const responseData = await res.json();
        if (isMounted) {
          const entries: LeaderboardEntry[] = (responseData.data || []).map(
            (entry: any, index: number) => ({
              id: entry.id || index,
              rank: entry.rank,
              account_name: entry.account_name,
              address: entry.address,
              invited_count: entry.invited_count,
              total_rewards:
                entry.total_rewards !== undefined &&
                entry.total_rewards !== null
                  ? entry.total_rewards
                  : 0,
            })
          );
          setLeaderboardData(entries);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to fetch leaderboard data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Typography variant="h6" color="text.secondary">
        Loading leaderboard...
      </Typography>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return <MiniLeaderboardTable data={leaderboardData.slice(0, rowsToShow)} />;
};

export default MiniLeaderboard;
