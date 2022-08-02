import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { fetchShipping } from "../../redux/ShippingSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "white",
  border: "1px solid gray",
  borderRadius: "6px",
  boxShadow: 24,
  p: 2,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

const ModalReceiver = ({
  modalReceiver,
  handleClose,
  ids,
  fetchData,
  setNotify,
}) => {
  const dispatching = useDispatch();
  const { loading, error, dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    idnumber: undefined,
    password: undefined,
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      if (res.data) {
        await axios.put(`http://localhost:8800/api/shipping/${ids}`, {
          receiver: res.data.details.name,
          receiverIdNumber: res.data.details.idnumber,
        });
        fetchData();
        dispatching(fetchShipping());
        handleClose();
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    setNotify({
      isOpen: true,
      message: "Package has been received",
      type: "success",
    });
  };
  return (
    <Modal
      open={modalReceiver}
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
            fontWeight: "600",
            color: "gray",
          }}
        >
          Input receiver id number
        </Typography>
        <Box component="form" onSubmit={handleClick} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="ID Number"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                idnumber: e.target.value,
              }))
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pin"
            label="PIN"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </Box>
        <Container
          sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleClick}>
            Confirm
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};

export default ModalReceiver;
