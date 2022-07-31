import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

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

  return (
    <TableContainer
      sx={{ maxHeight: "85vh", maxWidth: "85vw", width: "85vw" }}
      component={Paper}
    >
      <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
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
          {[...shipping]
            .sort((a, b) => (a > b ? 1 : -1))
            .map((item) => {
              return (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={item._id}
                >
                  <StyledTableCell>
                    <Link
                      to="/shippingDocument"
                      state={{ id: item._id }}
                      style={{ textDecoration: "none", color: "rgb(78,78,78)" }}
                    >
                      {item._id.toString().padStart(6, "0")}
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
                  <StyledTableCell>{item.createdAt}</StyledTableCell>
                  <StyledTableCell>{item.createdAt}</StyledTableCell>
                  <StyledTableCell>{item.description}</StyledTableCell>
                  <StyledTableCell>{item.remark}</StyledTableCell>
                  <StyledTableCell>{item.progress}</StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tableshipping;
