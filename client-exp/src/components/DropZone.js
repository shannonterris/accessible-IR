import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

export default function DropZone() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const initTiles = JSON.parse(
    '[{"w":1,"h":1,"x":0,"y":0,"i":"a","moved":false,"static":false},{"w":1,"h":1,"x":0,"y":1,"i":"b","moved":false,"static":false},{"w":1,"h":1,"x":2,"y":0,"i":"c","moved":false,"static":false}]'
  );
  let dragCompleted = false;
  let currentLayout = initTiles;
  const [tiles, setTiles] = useState(initTiles);

  const onLayoutChange = (layout, layouts) => {
    currentLayout = layout;
    console.log("layout set to" + currentLayout);
  };

  const onRemoveItem = (itemKey) => {
    const currentTiles = tiles;
    setTiles(currentTiles.filter((tile) => tile.i !== itemKey));
  };

  const onDrop = (layout, layoutItem, _event) => {
    alert(
      `Dropped element props:\n${JSON.stringify(
        layoutItem,
        ["x", "y", "w", "h"],
        2
      )}`
    );
    // setTiles({
    //   // Add a new item. It must have a unique key!
    //   items: tiles.concat({
    //     i: "n" + tiles.newCounter,
    //     x: (tiles.length * 2) % 2,
    //     y: Infinity, // puts it at the bottom
    //     w: 2,
    //     h: 2,
    //   }),
    //   // Increment the counter to ensure key is always unique.
    //   newCounter: tiles.newCounter + 1,
    // });
  };

  return (
    <ResponsiveGridLayout
      isDraggable
      measureBeforeMount={false}
      useCSSTransforms={true}
      compactType={"vertical"}
      isDroppable={true}
      cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 1 }}
      onDrop={onDrop}
      onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
    >
      {tiles.map((tile) => (
        <div className="dashboard-item" key={tile.i} data-grid={tile}>
          Dashboard ITEM {tile.i}
          <span className="remove" onClick={(e) => onRemoveItem(tile.i)}>
            x
          </span>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
