import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Backdrop, Button, CircularProgress, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import ModalReceiver from "../modal/ModalReceiver";
import ModalDelete from "../modal/ModalDelete";
import { useDispatch } from "react-redux";
import { fetchShipping } from "../../redux/ShippingSlice";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Notification from "../notification/Notification";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProgressSent = () => {
  const items = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalReceiver, setModalReceiver] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [idShipping, setIdShipping] = useState();
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleOpen = async (value) => {
    setIdShipping(value);
    setModalReceiver(true);
  };

  const handleGetIdDelete = (value) => {
    setIdShipping(value);
    setModalDelete(true);
  };
  const handleClose = () => {
    setModalReceiver(false);
    setModalDelete(false);
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8800/api/shipping/?account=${items._id}&receiver=`
      );
      setData(res.data);
    } catch (error) {
      setError(true);
      console.log("Internal server error");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8800/api/shipping/${idShipping}`);
    fetchData();
    dispatch(fetchShipping());
    setModalDelete(false);
    setNotify({
      isOpen: true,
      message: "Letter has been deleted",
      type: "error",
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Notification notify={notify} setNotify={setNotify} />
      <ModalDelete
        modalDelete={modalDelete}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <ModalReceiver
        modalReceiver={modalReceiver}
        handleClose={handleClose}
        ids={idShipping}
        fetchData={fetchData}
        setNotify={setNotify}
      />
      <Navbar />
      {loading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!loading && error ? <h1>Error: Cant connect to the server</h1> : null}
      {!loading && data ? (
        <>
          {data?.length > 0 ? (
            <TableContainer
              sx={{
                maxHeight: "85vh",
                maxWidth: "85vw",
                width: "85vw",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
              }}
              component={Paper}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ minWidth: 700 }}
              >
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Action</StyledTableCell>
                    <StyledTableCell>Shipping No.</StyledTableCell>
                    <StyledTableCell>Aircraft Resgistration</StyledTableCell>
                    <StyledTableCell>Sender</StyledTableCell>
                    <StyledTableCell>Sender Unit</StyledTableCell>
                    <StyledTableCell>Receiver unit</StyledTableCell>
                    <StyledTableCell>Sent Date</StyledTableCell>
                    <StyledTableCell>Receiver Date</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Remark</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {loading && (
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={loading}
                      onClick={handleClose}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  )}
                  {!loading && error ? <h1>Error: {error}</h1> : null}
                  {!loading && data ? (
                    <>
                      {[...data]
                        ?.sort((a, b) => (a > b ? 1 : -1))
                        .map((item) => (
                          <StyledTableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={item._id}
                          >
                            <StyledTableCell
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Button
                                variant="contained"
                                color="warning"
                                size="small"
                                sx={{
                                  marginBottom: "4px",
                                  width: "30px",
                                  boxShadow: "4",
                                }}
                                onClick={() => handleOpen(item._id)}
                              >
                                Sent
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                sx={{ width: "30px", boxShadow: "4" }}
                                onClick={() => handleGetIdDelete(item._id)}
                              >
                                Delete
                              </Button>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Link
                                to="/shippingDocument"
                                state={{ id: item._id }}
                                style={{
                                  textDecoration: "none",
                                  color: "rgb(78,78,78)",
                                }}
                              >
                                {item._id.toString().padStart(6, "0")}
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell>
                              {item.aircraftReg}
                            </StyledTableCell>
                            <StyledTableCell>
                              {item.sender} / {item.senderIdNumber}
                            </StyledTableCell>
                            <StyledTableCell>{item.senderUnit}</StyledTableCell>
                            <StyledTableCell>
                              {item.receiverUnit}
                            </StyledTableCell>
                            <StyledTableCell>{item.createdAt}</StyledTableCell>
                            <StyledTableCell>{item.createdAt}</StyledTableCell>
                            <StyledTableCell>
                              {item.description}
                            </StyledTableCell>
                            <StyledTableCell>{item.remark}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </>
                  ) : (
                    "null"
                  )}
                  :
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div style={{ marginTop: "200px" }}>
              <HourglassEmptyIcon
                sx={{
                  fontSize: "100px",
                  color: "gray",
                  marginLeft: "43%",
                  marginTop: "20px",
                }}
              />
              <h1 style={{ color: "gray" }}>
                Don't have a list of packages that must be sent
              </h1>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProgressSent;
