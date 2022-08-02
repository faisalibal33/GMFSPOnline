import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./cardLetter.css";
import PushPinIcon from "@mui/icons-material/PushPin";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";

export default function CardLetter({ item }) {
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
  const minuteClose = dateClose.getMinutes().toLocaleString().padStart(2, "0");
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
    <Card sx={{ maxWidth: "30vw" }} className="cardLetter">
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "gray" }}
        >
          {item._id.toString().padStart(7, "0")}
        </Typography>
        {item.receiver ? (
          <>
            <Typography variant="body2" color="text.secondary">
              <PushPinIcon fontSize="small" style={{ marginBottom: "-4px" }} />
              {item.sender} is sending{" "}
              <LocalShippingIcon
                fontSize="small"
                color="warning"
                style={{ marginBottom: "-4px" }}
              />{" "}
              packages to {item.receiverUnit}
            </Typography>
            <small style={{ color: "gray" }}>
              {" "}
              <DateRangeIcon
                fontSize="small"
                style={{ marginBottom: "-4px" }}
                sx={{ color: "gray", marginRight: "3px" }}
              />
              {viewDate}
            </small>

            <Typography variant="body2" color="text.secondary">
              <PushPinIcon fontSize="small" style={{ marginBottom: "-4px" }} />
              Package has been received{" "}
              <DoneAllOutlinedIcon
                fontSize="small"
                color="success"
                style={{ marginBottom: "-4px" }}
              />{" "}
              at the tbr unit by faisal / 583174{" "}
            </Typography>
            <small style={{ color: "gray" }}>
              {" "}
              <DateRangeIcon
                fontSize="small"
                style={{ marginBottom: "-4px" }}
                sx={{ color: "gray", marginRight: "3px" }}
              />
              {viewDateClose}
            </small>
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              <PushPinIcon fontSize="small" style={{ marginBottom: "-4px" }} />
              {item.sender} is sending{" "}
              <LocalShippingIcon
                fontSize="small"
                color="warning"
                style={{ marginBottom: "-4px" }}
              />{" "}
              packages to {item.receiverUnit}
            </Typography>
            <small style={{ color: "gray" }}>
              {" "}
              <DateRangeIcon
                fontSize="small"
                style={{ marginBottom: "-4px" }}
                sx={{ color: "gray", marginRight: "3px" }}
              />
              {item.createdAt}
            </small>
          </>
        )}
      </CardContent>
      <CardActions>
        <Link
          to="/shippingDocument"
          state={{ id: item._id }}
          style={{ textDecoration: "none", color: "rgb(78,78,78)" }}
        >
          <Button size="small">See Letter</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
