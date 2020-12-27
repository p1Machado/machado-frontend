import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import {
  Box,
  Divider,
  InputAdornment,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  TextField,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp, Clear as ClearIcon } from "@material-ui/icons";

import { FixedSizeList } from "react-window";

export function SelectInput({
  value,
  onChange,
  options: _options = [],
  mapOptionToKey: _mapOptionToKey,
  mapOptionToLabel: _mapOptionToLabel,
  ...props
}) {
  const { spacing } = useTheme();
  const classes = useStyles();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const listRef = useRef();

  const mapOptionToKey = useCallback(
    (option) => {
      if (!_mapOptionToKey) {
        return option.value;
      }
      return _mapOptionToKey(option);
    },
    [_mapOptionToKey],
  );
  const mapOptionToLabel = useCallback(
    (option) => {
      if (!_mapOptionToLabel) {
        return option.label;
      }
      return _mapOptionToLabel(option);
    },
    [_mapOptionToLabel],
  );

  const options = useMemo(() => {
    if (!search) {
      return _options;
    }
    return _options.filter((option) => {
      return mapOptionToLabel(option)
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [_options, search, mapOptionToLabel]);

  const currentKey = useMemo(() => {
    if (!value) {
      return;
    }
    if (typeof value === "object") return mapOptionToKey(value);
    return value;
  }, [value, mapOptionToKey]);

  const currentOption = useMemo(() => options.find((option) => mapOptionToKey(option) === currentKey), [
    options,
    currentKey,
    mapOptionToKey,
  ]);

  const [width, setWidth] = useState(undefined);
  const height = options.length < 5 ? spacing(7 * options.length) : spacing(25);

  const handleOpen = (event) => {
    setWidth(event.currentTarget.offsetWidth);
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleChange = (event, index) => {
    defineEventTarget(event, mapOptionToKey(options[index]));
    onChange && onChange(event);
    handleClose();
  };

  const handleClear = (event) => {
    defineEventTarget(event, null);
    onChange && onChange(event);
    event.stopPropagation();
  };

  useEffect(() => {
    if (open && search && listRef.current) {
      listRef.current.scrollTo(0);
    }
  }, [open, search, listRef]);

  return (
    <>
      <TextField
        value={currentOption ? mapOptionToLabel(currentOption) : ""}
        onClick={handleOpen}
        inputProps={{
          className: classes.mainInput,
        }}
        InputProps={{
          readOnly: true,
          className: classes.mainInput,
          classes: { adornedEnd: classes.mainInputAdornment },
          endAdornment: (
            <InputAdornment position="end">
              {!!currentOption && (
                <IconButton onClick={handleClear}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
              {open ? <ArrowDropUp color="action" /> : <ArrowDropDown color="action" />}
            </InputAdornment>
          ),
        }}
        variant="outlined"
        margin="dense"
        fullWidth
        {...props}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
      >
        <Box display="flex" flexDirection="row" alignItems="center" p={1}>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            InputProps={{
              classes: { adornedEnd: classes.inputAdornment },
              endAdornment: !!search ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearch("")} tabIndex="-1">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : (
                undefined
              ),
            }}
            placeholder="Buscar"
            variant="outlined"
            margin="dense"
            style={{
              marginTop: 0,
              marginBottom: 0,
              verticalAlign: "middle",
            }}
            fullWidth
          />
        </Box>
        <Divider />
        {search && !options.length && (
          <Box px={1} pt={3} pb={2.5} textAlign="center">
            <Typography>Nenhum resultado encontrado</Typography>
          </Box>
        )}
        <FixedSizeList
          width={width}
          height={height}
          itemSize={spacing(5)}
          itemCount={options.length}
          innerElementType={StyledMenuList}
          ref={listRef}
        >
          {({ index, style }) => {
            const option = options[index];
            const key = mapOptionToKey(option);
            const label = mapOptionToLabel(option);
            return (
              <MenuItem
                key={key}
                value={option}
                onClick={(event) => handleChange(event, index)}
                selected={key === currentKey}
                tabIndex={index}
                style={style}
              >
                {label}
              </MenuItem>
            );
          }}
        </FixedSizeList>
      </Popover>
    </>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  inputAdornment: {
    padding: 0,
  },
  mainInput: {
    cursor: "pointer",
  },
  mainInputAdornment: {
    paddingRight: spacing(1),
  },
}));

function StyledMenuList({ children, ...props }) {
  return (
    <MenuList {...props} disablePadding>
      {children}
    </MenuList>
  );
}

function defineEventTarget(event, value) {
  Object.defineProperty(event, "target", {
    writable: true,
    value: { value },
  });
}
