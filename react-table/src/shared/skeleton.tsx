import { Box, Skeleton } from "@mui/material";

export const LoadingSkeleton = () => (
    <Box
      sx={{
        height: "max-content"
      }}
    >
      {[...Array(8)].map((_) => (
        <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} />
      ))}
    </Box>
  );