import { useState } from "react";

export default function useAlerta() {
  const [alerta, setAlerta] = useState({
    show: false,
    message: "",
    type: "danger"
  });

  function notify(message, type = "danger") {
    setAlerta({
      show: true,
      message,
      type
    });
  }

  function close() {
    setAlerta((prev) => ({
      ...prev,
      show: false
    }));
  }

  return { alerta, notify, close };
}
