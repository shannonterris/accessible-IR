import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import { Image, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import ImageItem from "./ImageItem";
import _ from "lodash";

export default function DropZone() {
  const { tiles } = useConversations();

  return (
    <div>
      <GridLayout
        isDraggable
        measureBeforeMount={true}
        useCSSTransforms={true}
        compactType={"vertical"}
        cols={2}
        rowHeight={200}
        layout={tiles}
        width={600}
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
      </GridLayout>
    </div>
  );
}
