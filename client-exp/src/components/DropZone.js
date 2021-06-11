import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Image } from "react-bootstrap";
import _ from "lodash";

export default function DropZone() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const initTiles = JSON.parse(
    '[{"w":1,"h":1,"x":0,"y":0,"i":"a","moved":false,"static":false},{"w":1,"h":1,"x":0,"y":1,"i":"b","moved":false,"static":false},{"w":1,"h":1,"x":2,"y":0,"i":"c","moved":false,"static":false}]'
  );
  let currentLayout = initTiles; // i think this will get reset every render??????
  const [tiles, setTiles] = useState([]); // maybe move this outside....?

  const onLayoutChange = (layout, layouts) => {
    // Saving to a State doesn't work for some reason so just save to a const
    currentLayout = layout;
  };

  const onRemoveItem = (itemKey) => {
    const currentTiles = currentLayout;
    setTiles(currentTiles.filter((tile) => tile.i !== itemKey));
  };

  const onDrop = (layout, layoutItem, _event) => {
    const dt = _event.dataTransfer;
    // get image url
    const html = dt.getData("text/html");
    const match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html);
    const url = match && match[1];
    // for testing print url
    console.log(url);

    const currentTiles = layout;
    const results = currentTiles.filter(
      (tile) => tile.i !== "__dropping-elem__"
    );
    console.log(layoutItem.x + " " + layoutItem.y);
    results.push({
      w: 1,
      h: 1,
      x: layoutItem.x,
      y: layoutItem.y,
      i: url,
      moved: false,
      static: false,
    });
    setTiles(results);
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
          <span className="remove" onClick={(e) => onRemoveItem(tile.i)}>
            x
          </span>
          <Image src={tile.i} fluid draggable={false} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
