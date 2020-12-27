import React from "react";
import { Link } from "react-router-dom";

export const LinkButton = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
