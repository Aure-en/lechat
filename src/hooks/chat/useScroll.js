import { useState, useEffect, useRef } from "react";
/**
 * Handle messages pagination
 * @param {array} messages
 * @param {HTMLElement} ref
 */
function useScroll(messages, ref) {
  const [hasScrolled, setHasScrolled] = useState(false); // If the user has scrolled, display a button to scroll back to present.
  const previous = useRef();
  const currentHeight = useRef(); // Calculate the scroll after loading new messages

  /** Scroll to bottom */
  const scrollToBottom = () => {
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
    currentHeight.current = ref.current.scrollHeight;
  };

  /** Update the state after the user scrolls */
  const handleScroll = () => {
    if (!ref.current) return;
    if (
      ref.current.scrollHeight - ref.current.scrollTop >
      ref.current.clientHeight * 2
    ) {
      ref.current.style.scrollBehavior = "smooth";
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  // Set scroll behavior back to normal after clicking on the scroll button.
  useEffect(() => {
    ref.current.style.scrollBehavior = "initial";
  }, [hasScrolled]);

  /**
   * -- Automatic scroll --
   * Saves the first and last messages in a reference.
   * When the messages props change, the component will know whether the new messages
   * appeared on top (=previous messages have been loaded) or on the bottom (=someone
   * wrote a new message).
   *
   * - If previous messages were loaded, the scroll position remains the same.
   * - If a new message was written:
   *    * If the user is already at the bottom of the messages list, scroll to the bottom after
   *      the new message appears.
   *    * If the user was scrolling to read previous messages, don't scroll to the bottom
   *      automatically.
   */

  /* After the messages' first render:
   * - Scroll to the bottom of the container.
   * - Set up ref
   */

  useEffect(() => {
    if (!ref) return;
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
    currentHeight.current = ref.current.scrollHeight;

    previous.current = {
      first: messages[0]?._id,
      last: messages[messages.length - 1]?.messages[
        messages[messages.length - 1]?.messages.length - 1
      ]._id,
    };
  }, [messages, ref]);

  // When messages change, compare to the ref and scroll in consequence.
  useEffect(() => {
    if (messages.length < 1 || !previous?.current) return;

    // Previous messages were loaded
    if (messages[0]._id !== previous.current.first) {
      ref.current.scrollTop = ref.current.scrollHeight - currentHeight.current;
      currentHeight.current = ref.current.scrollHeight;
    }

    // A new message was written and the user was near the bottom
    // Scroll them to the bottom.
    if (
      messages[messages.length - 1].messages[
        messages[messages.length - 1].messages.length - 1
      ]._id !== previous.current.last &&
      ref.current.scrollHeight - ref.current.clientHeight <
        ref.current.scrollTop + 500
    ) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.clientHeight;
    }

    // Update the previous ref.
    previous.current = {
      first: messages[0]._id,
      last: messages[messages.length - 1].messages[
        messages[messages.length - 1].messages.length - 1
      ]._id,
    };
  }, [messages]);

  return {
    scrollToBottom,
    hasScrolled,
    handleScroll,
  };
}

export default useScroll;
