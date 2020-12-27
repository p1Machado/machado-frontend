import React, { useState, useMemo, useCallback } from "react";
import { get } from "lodash";
import { Set } from "immutable";
import { ltreeCompare, ltreeIsDescendent } from "app/utils/ltreeUtils";

import { Box, Checkbox, Table, TableBody, TableRow, TableCell, IconButton, makeStyles } from "@material-ui/core";
import {
  Create as UpdateIcon,
  Delete as DeleteIcon,
  ExpandMore as CollapseIcon,
  ChevronRight as ExpandIcon,
} from "@material-ui/icons";

import LTreeDataTableHead from "./LTreeDataTableHead";
import DataTableCell from "app/components/DataTable/DataTableCell";

function LTreeDataTable({
  data,
  selection = [],
  onSelectionChange,
  onClick,
  onUpdateClick,
  onDeleteClick,
  mapValueToLtree: _mapRowToLtree,
  children,
}) {
  const columns = React.Children.map(children, (child) => ({ ...child.props }));

  const [collapsed, setCollapsed] = useState(Set([]));

  const mapValueToLtree = useCallback(
    (value) => {
      if (!_mapRowToLtree) {
        return value.ltree;
      }
      return _mapRowToLtree(value);
    },
    [_mapRowToLtree],
  );

  const sortData = useMemo(() => data.sort((a, b) => ltreeCompare(a.ltree, b.ltree)), [data]);

  const viewData = useMemo(
    () => sortData.filter((value) => !collapsed.some((ltree) => mapValueToLtree(value).startsWith(ltree + "."))),
    [sortData, collapsed, mapValueToLtree],
  );

  const handleSelection = useCallback(
    (e, target) => {
      if (!e.target.checked) {
        onSelectionChange(
          selection.filter(
            (value) =>
              mapValueToLtree(value) !== mapValueToLtree(target) &&
              !ltreeIsDescendent(mapValueToLtree(value), mapValueToLtree(target)),
          ),
        );
        return;
      }
      onSelectionChange([
        ...selection.filter(
          (value) =>
            mapValueToLtree(value) !== mapValueToLtree(target) &&
            !ltreeIsDescendent(mapValueToLtree(value), mapValueToLtree(target)),
        ),
        ...data.filter(
          (value) =>
            mapValueToLtree(value) === mapValueToLtree(target) ||
            ltreeIsDescendent(mapValueToLtree(value), mapValueToLtree(target)),
        ),
      ]);
    },
    [data, selection, onSelectionChange, mapValueToLtree],
  );

  function _hasChildren(ltree, itens) {
    return itens.some((item) => mapValueToLtree(item).startsWith(ltree + "."));
  }

  const classes = useStyles();

  return (
    <Table>
      <LTreeDataTableHead columns={columns} actions={!!(onUpdateClick || onDeleteClick)} />
      <TableBody>
        {viewData?.length ? (
          viewData.map((rowValue, rowIndex) => {
            const ltree = mapValueToLtree(rowValue);
            const isCollapsed = collapsed.contains(ltree);
            const hasChildren = _hasChildren(ltree, data);
            const isSelected = selection.some((selected) => mapValueToLtree(selected) === ltree);
            return (
              <TableRow selected={isSelected} hover key={rowValue.id + "+" + rowIndex}>
                <TableCell padding="checkbox">
                  <div className={classes.ltreeContainer}>
                    <div className={classes.collapsableContainer}>
                      {hasChildren && (
                        <IconButton
                          onClick={() => setCollapsed(isCollapsed ? collapsed.remove(ltree) : collapsed.add(ltree))}
                          size="small"
                        >
                          {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
                        </IconButton>
                      )}
                    </div>
                    <Checkbox
                      key={ltree}
                      checked={isSelected || false}
                      indeterminate={false}
                      onChange={(e) => handleSelection(e, rowValue)}
                      style={{ marginLeft: `${_itemDepth(ltree) * 10 + 22}px` }}
                    />
                  </div>
                </TableCell>
                {columns.map(({ field, format, padding, align, numeric, children }) => {
                  const fieldValue = get(rowValue, field);
                  return (
                    <DataTableCell
                      key={field}
                      padding={padding}
                      align={align}
                      numeric={numeric}
                      onClick={(event) => {
                        if (onClick) {
                          defineEventTargetValue(event, rowValue);
                          onClick(event);
                        }
                      }}
                    >
                      {typeof children === "function"
                        ? children({ value: fieldValue })
                        : format?.(fieldValue) || fieldValue}
                    </DataTableCell>
                  );
                })}
                {!!(onUpdateClick || onDeleteClick) && (
                  <DataTableCell align="right" padding="actions">
                    <Box display="flex" flexWrap="nowrap" style={{ float: "right" }}>
                      {!!onUpdateClick && (
                        <IconButton
                          onClick={(event) => {
                            if (onUpdateClick) {
                              defineEventTargetValue(event, rowValue);
                              onUpdateClick(event);
                            }
                          }}
                        >
                          <UpdateIcon />
                        </IconButton>
                      )}
                      {!!onDeleteClick && (
                        <IconButton
                          onClick={(event) => {
                            if (onDeleteClick) {
                              defineEventTargetValue(event, rowValue);
                              onDeleteClick(event);
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  </DataTableCell>
                )}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell align="center" colSpan={columns.length + 1}>
              Nenhum registro encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function defineEventTargetValue(event, value) {
  Object.defineProperty(event, "target", {
    writable: true,
    value: {
      value,
    },
  });
}

function _itemDepth(item) {
  return (item?.match(/\./g) || []).length;
}

const useStyles = makeStyles({
  rootRow: {
    fontWeight: "bold",
  },
  ltreeContainer: {
    position: "relative",
    display: "inline-block",
  },
  collapsableContainer: {
    position: "absolute",
    top: "50%",
    right: "32px",
    transform: "translate(0 ,-50%)",
  },
});

export default LTreeDataTable;
