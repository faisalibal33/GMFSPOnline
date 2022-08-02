import { Box, Button, Container, Modal, Typography } from "@mui/material";
import React from "react";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";

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

const ModalReceiver = ({ modalRequest, handleClose, handleClick }) => {
  return (
    <Modal
      open={modalRequest}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ScheduleSendIcon
          sx={{
            fontSize: "70px",
            color: "#ed6c02",
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
          Submit your shipping letter
        </Typography>
        <Container
          sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="warning" onClick={handleClick}>
            Submit
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};

export default ModalReceiver;
