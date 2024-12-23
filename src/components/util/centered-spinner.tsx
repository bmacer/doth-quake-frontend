import { Box, Spinner } from "@chakra-ui/react";

export function CenteredSpinner() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Spinner size="xl" />
    </Box>
  );
}
