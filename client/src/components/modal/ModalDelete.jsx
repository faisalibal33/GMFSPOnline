import { Box, Button, Container, Modal, Typography } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 250,
  bgcolor: "white",
  border: "1px solid gray",
  borderRadius: "6px",
  boxShadow: 24,
  p: 2,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

const ModalDelete = ({ modalDelete, handleClose, handleDelete }) => {
  return (
    <Modal
      open={modalDelete}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <DeleteForeverIcon
          sx={{
            fontSize: "70px",
            color: "#d32f2f",
            marginLeft: "43%",
            marginTop: "20px",
          }}
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: "600",
            color: "gray",
          }}
        >
          Are you sure to delete letter
        </Typography>
        <Container
          sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Logout
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
