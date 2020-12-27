import PropTypes from "prop-types";

function Column() {
  return null;
}

Column.propTypes = {
  field: PropTypes.string.isRequired,
  header: PropTypes.string,
  numeric: PropTypes.bool,
  format: PropTypes.func,
  align: PropTypes.oneOf(["left", "right"]),
  padding: PropTypes.oneOf(["checkbox", "default", "none", "actions"]),
};

export default Column;
