import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { config } from "../config/constants";
function ImagesCarousel({ items, imageKey }) {
  function Item(props) {
    console.log(props, "oi3engoihwio");
    return (
      <Paper style={{ height: "100%" }}>
        {props.item && (
          <img
            src={`${config.backend.url}image?img=${props?.item[imageKey]}`}
            style={{ height: "100%" }}
          />
        )}
      </Paper>
    );
  }

  return (
    <Carousel height={400}>
      {items?.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

export default ImagesCarousel;
