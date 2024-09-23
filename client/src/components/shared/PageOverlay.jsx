import React, { useEffect, useState } from "react";
import { useToaster } from "react-hot-toast";

const PageOverlay = ({ children }) => {
  const { toasts } = useToaster();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (toasts.length > 0) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [toasts]);

  return (
    <div>
      {showOverlay && <div className="page-overlay" />}
      <div className={showOverlay ? "content-blurred" : ""}>{children}</div>
    </div>
  );
};

export default PageOverlay;
