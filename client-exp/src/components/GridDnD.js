import React from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";
import ImageDrop from "./ImageDrop";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

export default function GridDnD() {
  const [items, setItems] = React.useState(["test", "test2"]);
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }

  function deleteItem(removed) {
    const result = items.filter((n) => n !== removed);
    setItems(result);
  }

  function addItem(item) {
    items.push(item);
    setItems(items);
  }

  return (
    <GridContextProvider onChange={onChange} disableDrop={true}>
      <Button onClick={(event) => addItem("test3")}></Button>
      <div className="containerDrop w-100">
        <GridDropZone
          className="dropzone right"
          id="items"
          boxesPerRow={2}
          rowHeight={200}
          disableDrop={true}
        >
          {items.map((item) => (
            <GridItem key={item}>
              <div className="grid-item">
                <div className="grid-item-content">
                  <Button onClick={(event) => deleteItem(item)}></Button>
                  <p>{item}</p>
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
}
