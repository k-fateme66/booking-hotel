import React, { useEffect } from "react";

export default function useOutSideClick(ref, exceptionId, cb) {
  useEffect(() => {
    function handleOutSideClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleOutSideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, cb, exceptionId]);
}
