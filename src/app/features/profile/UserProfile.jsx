import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Avatar, Box, ButtonBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function UserProfile({ onClick }) {
  const classes = useStyles();

  const { user } = useAuth0();

  if (!user) {
    return false;
  }

  return (
    <Box p={1.5} display="flex" flexDirection="row">
      <Avatar onClick={onClick} component={ButtonBase} alt={user.name} src={user.picture} className={classes.avatar}>
        {user.given_name[0]}
        {user.family_name[0]}
      </Avatar>
      <Box ml={1.5} overflow="hidden">
        <Typography variant="subtitle2" className={classes.ellipsis}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.ellipsis}>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  avatar: {
    borderRadius: "100%",
  },
  ellipsis: {
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
});
