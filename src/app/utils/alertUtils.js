import { dispatchAlert } from "app/layouts/AppAlert";

export class Alert {
  static info(message) {
    dispatchAlert(message, "info");
  }

  static success(message) {
    dispatchAlert(message, "success");
  }
  static warning(message) {
    dispatchAlert(message, "warning");
  }
  static error(message, err) {
    dispatchAlert(message, "error");
    if (err) {
      console.error(err);
    }
  }
}
