import { Box, Button, Container, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "white",
  border: "1px solid gray",
  borderRadius: "6px",
  boxShadow: 24,
  p: 2,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

const ModalLogout = ({ open, handleClose, logout }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: "800",
            color: "gray",
          }}
        >
          Are you sure want to logout
        </Typography>
        <Container
          sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};

export default ModalLogout;
