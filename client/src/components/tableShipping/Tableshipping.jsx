import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Backdrop, CircularProgress, Paper, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchShipping } from "../../redux/ShippingSlice";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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

const Tableshipping = () => {
  const { shipping, loading, error } = useSelector((state) => ({
    ...state.shipping,
  }));
  const dispatch = useDispatch();
  const [cycle, setCycle] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchShipping());
    setCycle(false);
  }, [cycle]);

  const keys = [
    "aircraftReg",
    "sender",
    "senderIdNumber",
    "senderUnit",
    "receiver",
    "receiverIdNumber",
    "receiverUnit",
    "sentDate",
    "dateReceived",
    "description",
    "remark",
  ];
  const allShipping = shipping?.filter((item) =>
    keys.some((e) => item[e].toString().toLowerCase().includes(search))
  );

  const TableRow = ({ item }) => {
    const id = item._id.toString().padStart(6, "0");
    let date = new Date(item?.createdAt);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    const hour = date.getHours().toLocaleString().padStart(2, "0");
    const min = date.getMinutes().toLocaleString().padStart(2, "0");
    const sec = date.getSeconds().toLocaleString().padStart(2, "0");
    const viewDate =
      day + " " + month + " " + year + ", " + hour + ":" + min + ":" + sec;

    let dateClose = new Date(item?.updatedAt);
    const dayClose = dateClose.toLocaleString("default", { day: "2-digit" });
    const monthClose = dateClose.toLocaleString("default", { month: "short" });
    const yearClose = dateClose.toLocaleString("default", { year: "numeric" });
    const hourClose = dateClose.getHours().toLocaleString().padStart(2, "0");
    const minuteClose = dateClose
      .getMinutes()
      .toLocaleString()
      .padStart(2, "0");
    const secClose = dateClose.getSeconds().toLocaleString().padStart(2, "0");
    const viewDateClose =
      dayClose +
      " " +
      monthClose +
      " " +
      yearClose +
      ", " +
      hourClose +
      ":" +
      minuteClose +
      ":" +
      secClose;
    return (
      <StyledTableRow hover role="checkbox" tabIndex={-1} key={item._id}>
        <StyledTableCell>
          <Link
            to="/shippingDocument"
            state={{ id: item._id }}
            style={{ textDecoration: "none", color: "rgb(78,78,78)" }}
          >
            {id}
          </Link>
        </StyledTableCell>
        <StyledTableCell>{item.aircraftReg}</StyledTableCell>
        <StyledTableCell>
          {item.sender} / {item.senderIdNumber}
        </StyledTableCell>
        <StyledTableCell>{item.senderUnit}</StyledTableCell>
        <StyledTableCell>
          {item.receiver} / {item.receiverIdNumber}
        </StyledTableCell>
        <StyledTableCell>{item.receiverUnit}</StyledTableCell>
        <StyledTableCell>{viewDate}</StyledTableCell>
        {item.receiverIdNumber.length > 1 ? (
          <StyledTableCell>{viewDateClose}</StyledTableCell>
        ) : (
          <StyledTableCell>-</StyledTableCell>
        )}

        <StyledTableCell>{item.description}</StyledTableCell>
        <StyledTableCell>{item.remark}</StyledTableCell>
        <StyledTableCell>{item.progress}</StyledTableCell>
      </StyledTableRow>
    );
  };
  return (
    <div className="searchShipping">
      {loading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!loading && error ? <h1>Error: Cant connect to the server</h1> : null}
      {!loading && shipping ? (
        <>
          <div
            style={{
              position: "relative",
            }}
          >
            <SearchIcon
              style={{
                position: "absolute",
                right: "15px",
                top: "10px",
                color: "gray",
                borderRadius: "20px",
              }}
              fontSize="large"
            />
            <TextField
              label="Search"
              sx={{
                width: "100%",
                marginBottom: "10px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <TableContainer
            sx={{
              maxHeight: "85vh",
              maxWidth: "85vw",
              marginBottom: "50px",
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
                  <StyledTableCell>Shipping No.</StyledTableCell>
                  <StyledTableCell>Aircraft Resgistration</StyledTableCell>
                  <StyledTableCell>Sender</StyledTableCell>
                  <StyledTableCell>Sender Unit</StyledTableCell>
                  <StyledTableCell>Receiver</StyledTableCell>
                  <StyledTableCell>Receiver unit</StyledTableCell>
                  <StyledTableCell>Sent Date</StyledTableCell>
                  <StyledTableCell>Receiver Date</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Remark</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {[...allShipping]
                  .sort((a, b) => (a > b ? 1 : -1))
                  .map((item) => (
                    <TableRow item={item} key={item._id} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        " "
      )}
    </div>
  );
};

export default Tableshipping;
