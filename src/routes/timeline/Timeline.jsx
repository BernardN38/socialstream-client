import axios from "axios";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { serverUrl } from "../../backendApi/config";
import TimelineLogic from "./TimelineLogic";

export default function Timeline({ userId }) {
  const { posts, loading, getPosts, refresh } = TimelineLogic(userId);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={getPosts}
        hasMore={loading}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
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
