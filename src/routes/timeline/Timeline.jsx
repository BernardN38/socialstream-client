import axios from "axios";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { serverUrl } from "../../backendApi/config";
import TimelineLogic from "./TimelineLogic";
import { Divider, Box } from "@mui/material";

export default function Timeline({ userId, postCreatedCount }) {
  const { posts, loading, getPosts, refresh } = TimelineLogic(userId);

  useEffect(() => {
    getPosts(0, true);
  }, [postCreatedCount]);

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length + postCreatedCount} //This is important field to render the next data
        next={getPosts}
        hasMore={loading}
        loader={<h4>Loading...</h4>}
        endMessage={
          <Box style={{ textAlign: "center" }}>
            <b>End</b>
            <Divider></Divider>
          </Box>
        }
        // below props only if you need pull down functionality
        refreshFunction={refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        {posts}
      </InfiniteScroll>
    </div>
  );
}
