import { Autocomplete, TextField } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import * as utils from "../../services/utils";

export default function DashAutoComplete(props) {
  const my = useRef();
  const [data, setData] = useState([]);
  const [init, setInit] = useState(null);

  const getData = async () => {
    const result = await utils.default_post(props.service_url);
    if (result.success) {
      setData(result.data);
      const initialValue = result.data.find(
        (x) => x.id === parseInt(props.value)
      );
      setInit(initialValue);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && props.value) {
      const initialValue = data.find((x) => x.id === parseInt(props.value));
      setInit(initialValue);
    }
    console.log(init);
  }, [data, props.value]);
  console.log(init?.name);
  return (
    <>
      {init && (
        <Autocomplete
          ref={my}
          getOptionLabel={(option) => option.name}
          disablePortal
          id="combo-box-demo"
          options={data}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              defaultValue={init?.name}
            />
          )}
          // value={init}

          {...props}
        />
      )}
    </>
  );
}
