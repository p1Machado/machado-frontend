import React from "react";

import { ListItem } from "@material-ui/core";
import { LinkButton } from "app/components";

import { useRouteMatch } from "react-router-dom";

function RouterListItem({ to, onClick, children, className, ...rest }) {
  const match = useRouteMatch(to);
  return (
    <ListItem
      to={to}
      onClick={onClick}
      button
      component={LinkButton}
      selected={Boolean(match)}
      className={className}
      {...rest}
    >
      {children}
    </ListItem>
  );
}

export default RouterListItem;
