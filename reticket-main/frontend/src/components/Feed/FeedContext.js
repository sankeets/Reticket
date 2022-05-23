import React from "react";

export const FeedContext = React.createContext();

export const useFeedContext = () => React.useContext(FeedContext);
