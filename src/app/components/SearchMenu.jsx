import React, { useMemo } from "react";

import SearchInput from "./SearchInput";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";

import makeStyles from "@material-ui/core/styles/makeStyles";

import { prepareOptions, filterOptions } from "app/utils/autoCompleteUtils";

function SearchMenu({ value, onChange, options }) {
  const sortOptions = useMemo(() => prepareOptions(options), [options]);
  const suggestions = useMemo(() => filterOptions(sortOptions, value), [sortOptions, value]);

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box padding={1}>
        <SearchInput
          value={value}
          onChange={onChange}
          margin="dense"
          adornment="end"
          className={classes.search}
          fullWidth
          autoFocus
        />
      </Box>
      <Divider />
      <MenuList>
        {suggestions.length ? (
          suggestions.map((option) => (
            <MenuItem button key={option.value.id}>
              {option.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Nenhum registro...</MenuItem>
        )}
      </MenuList>
    </Paper>
  );
}

const useStyles = makeStyles({
  paper: {
    width: "100%",
  },
  search: {
    margin: 0, // O próprio Input deveria tratar a margin dense
  },
});

export default SearchMenu;
