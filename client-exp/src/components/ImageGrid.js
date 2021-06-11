import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Image, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
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
        cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 1 }}
      >
        {tiles.map((tile) => (
          <div className="dashboard-item" key={tile.i} data-grid={tile}>
            <Image src={tile.i} fluid draggable={false} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
