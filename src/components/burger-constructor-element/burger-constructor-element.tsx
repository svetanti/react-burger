import React, {
  useRef, memo, FC,
} from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { TIngredient } from '../../types/types';

type TBurgerConstructorElementProps = {
  el: TIngredient;
  onDelete: (item: TIngredient) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  id: string;
};

type TDragItem = {
  index: number
  id: string
  type: string
};

const BurgerConstructorElement:FC<TBurgerConstructorElementProps> = ({
  id, el, onDelete, index, onMove,
}) => {
  const {
    name, price, image,
  } = el;

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructorElement',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'constructorElement',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item: TDragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onMove(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <li
      className={`${burgerConstructorStyles.ingredient} ${isDragging && burgerConstructorStyles.isDragging}`}
      ref={ref}
      data-handler-id={handlerId}
      draggable
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => onDelete(el)}
      />
    </li>
  );
};

export default memo(BurgerConstructorElement);
