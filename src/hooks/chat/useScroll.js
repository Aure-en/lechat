import { useState, useEffect, useRef } from "react";
/**
 * Handle messages pagination
 * @param {array} messages
 * @param {HTMLElement} ref
 */
function useScroll(messages, ref) {
  const [isFirst, setIsFirst] = useState(true);
  const currentHeight = useRef();

  useEffect(() => {
    if (ref) {
      currentHeight.current = ref.current.scrollHeight;
    }
  }, [ref]);

  // Sets up automatical scrolling
  useEffect(() => {
    if (!ref) return;

    // If we loaded more message, keep the user at the same scroll position.
    if (currentHeight.current !== ref.current.scrollHeight) {
      ref.current.scrollTop = ref.current.scrollHeight - ref.current.scrollTop;
      currentHeight.current = ref.current.scrollHeight;
    }

    // Afterwards, only scroll at the bottom on new message if the user is already at the bottom.
    // (If he's scrolling to see previous messages, don't make him scroll back to the bottom automatically)
    if (
      ref.current.scrollHeight - ref.current.clientHeight <
      ref.current.scrollTop + 500
    ) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.clientHeight;
    }

    // After the messages' first render, scroll to the bottom of the container.
    if (!ref.current.scrollTop && isFirst && messages.length > 0) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.clientHeight;
      setIsFirst(false);
    }
  }, [messages, ref]);

  useEffect(() => {
    const display = () => {
      console.log("CURRENT SCROLL", ref.current.scrollTop);
      console.log("FULL HEIGHT", ref.current.scrollHeight);
      console.log("COMPONENT HEIGHT", ref.current.clientHeight);
    };
    ref.current.addEventListener("scroll", display);
  }, []);
}

export default useScroll;
