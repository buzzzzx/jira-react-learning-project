import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";
import React from "react";

type DropProps = Omit<DroppableProps, "children"> & {
  children: React.ReactNode;
};

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        } else {
          return <div />;
        }
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;

export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        {children}
        {props.provided?.placeholder}
      </div>
    );
  }
);

type DragProps = Omit<DraggableProps, "children"> & {
  children: React.ReactNode;
};

export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        } else {
          return <div />;
        }
      }}
    </Draggable>
  );
};
