import React, { useCallback } from "react";
import { get } from "lodash";

import { Box, IconButton, Table, TableRow, TableCell, TableBody } from "@material-ui/core";
import { Create as UpdateIcon, Delete as DeleteIcon } from "@material-ui/icons";
import DataTableHead from "app/components/DataTable/DataTableHead";
import DataTableCell from "app/components/DataTable/DataTableCell";

export default function DataTable({
  value,
  onChange,
  children,
  mapValueToKey: _mapRowToKey,
  onClick,
  onUpdateClick,
  onDeleteClick,
}) {
  const columns = React.Children.map(children, (child) => ({ ...child.props }));
  const mapRowToKey = useCallback(
    (value) => {
      if (!_mapRowToKey) {
        return value.id;
      }
      return _mapRowToKey(value);
    },
    [_mapRowToKey],
  );

  return (
    <Table>
      <DataTableHead columns={columns} actions={!!(onUpdateClick || onDeleteClick)} />
      <TableBody>
        {value?.length ? (
          value.map((rowValue, rowIndex) => {
            return (
              <TableRow key={mapRowToKey(rowValue) + "+" + rowIndex} hover>
                {columns.map((column) => {
                  const { field, format, padding, align, numeric, children } = column;
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
                        ? children({
                            field,
                            value: rowValue[field],
                            rowValue,
                            rowIndex,
                            onChange: (rowFieldValue) => {
                              const nextValue = [...value];
                              nextValue.splice(rowIndex, 1, { ...rowValue, [field]: rowFieldValue });
                              onChange(nextValue);
                            },
                            onRowChange: (rowValue) => {
                              const nextValue = [...value];
                              nextValue.splice(rowIndex, 1, rowValue);
                              onChange(nextValue);
                            },
                          })
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
