import React from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";
import ImageDrop from "./ImageDrop";

export default function GridDnD() {
  const [items, setItems] = React.useState({
    right: [
      { id: 7, name: "Drag Image 1" },
      { id: 8, name: "Drag Image 2" },
      { id: 9, name: "Drag Image 3" },
      { id: 10, name: "Drag Image 4" },
    ],
  });

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result,
    });
  }

  return (
    <GridContextProvider onChange={onChange}>
      <div className="containerDrop w-100">
        <GridDropZone
          className="dropzone right"
          id="right"
          boxesPerRow={2}
          rowHeight={200}
        >
          {items.right.map((item) => (
            <GridItem key={item.name}>
              <div className="grid-item">
                <div className="grid-item-content">
                  <ImageDrop />
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
}
