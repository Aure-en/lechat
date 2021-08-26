import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Empty from "../../components/server/Empty";

function Entry() {
  const [loading, setLoading] = useState(true);
  const { serverId } = useRouteMatch("/servers/:serverId").params;
  const history = useHistory();

  /* Objective: Redirect the user to a channel.
    Cases :
    1. There are no channels. 
    → Display a special message.

    2. The user has never visited a channel.
    → Redirects them to the first channel of the first category.

    3. The user has already visited a channel.
      * The channel doesn't exist anymore.
        → Redirects them to the first channel of the first category.
      * The channel still exists.
        → Redirects them to this channel.
  */

  useEffect(() => {
    (async () => {
      // Checks if any channel exists.
      // Search for all channels
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/servers/${serverId}/channels`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const channels = await res.json();

      // There are no channels.
      if (channels.length === 0) {
        return setLoading(false);
      }

      /* If the user has already visited a channel and it still exists
          → Redirects them to this channel. */
      if (
        sessionStorage.getItem(serverId) &&
        channels.some(
          (channel) => channel._id.toString() === sessionStorage.getItem(serverId)
        )
      ) {
        return history.push(
          `/servers/${serverId}/channels/${sessionStorage.getItem(serverId)}`
        );
      }

      // Else, redirects to the first channel of the first category.
      const channelsByCategories = channels.sort(
        (a, b) => a.category.name - b.category.name
      );

      const fromFirstCategory = channelsByCategories.filter(
        (channel) =>
          channel.category._id.toString() ===
          channelsByCategories[0].category._id.toString()
      );

      const channelsByName = fromFirstCategory.sort((a, b) => a.name - b.name);

      history.push(
        `/servers/${serverId}/channels/${channelsByName[0]._id.toString()}`
      );
    })();
  }, [serverId]);

  if (!loading) {
    return <Empty />;
  }

  return <></>;
}

export default Entry;
