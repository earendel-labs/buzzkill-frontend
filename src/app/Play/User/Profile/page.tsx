"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import NavigationDrawer from "./Components/NavigationDrawer";
import { usePathname, useRouter } from "next/navigation";

const ProfileLayout = ({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) => {
  const [pageLoading, setPageLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setPageLoading(true);

    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, 300); // Small delay to simulate loading (adjust as needed)

    return () => clearTimeout(timeout);
  }, [pathname]);

  const isLoading = loading || pageLoading;

  return (
    <Layout>
      <NavigationDrawer />
      {isLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <HexagonSpinner />
          <Typography marginTop="32px">
            Fetching Data from the Hive Mind...
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1200px",
            width: "100%",
            flexGrow: 1,
          }}
        >
          {/* Only children are re-rendered when tab switches */}
          {children}
        </Box>
      )}
    </Layout>
  );
};

export default ProfileLayout;
