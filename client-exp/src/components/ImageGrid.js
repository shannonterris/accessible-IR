import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Image, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import ImageItem from "./ImageItem";
import _ from "lodash";

export default function DropZone() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const { tiles } = useConversations();

  return (
    <div>
      <ResponsiveGridLayout
        isDraggable
        measureBeforeMount={true}
        useCSSTransforms={true}
        compactType={"vertical"}
        isDroppable={true}
        cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
      >
        {tiles.map((tile) => (
          <div
            className="dashboard-item"
            id={tile.i}
            key={tile.i}
            data-grid={tile}
            style={{ overflow: "hidden" }}
          >
            <ImageItem tile={tile} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
