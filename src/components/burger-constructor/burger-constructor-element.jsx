import React, { useRef, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructorElement = memo(({
  el, onDelete, index, onMove, findIngredient,
}) => {
  const {
    _id, name, price, image,
  } = el;

  const ref = useRef(null);

  const originalIndex = findIngredient(_id).index;

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'constructorElement',
    item: { _id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // eslint-disable-next-line no-shadow
      const { _id: droppedId, originalIndex } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        onMove(droppedId, originalIndex);
      }
    },
  }), [_id, originalIndex, onMove]);

  const [, dropRef] = useDrop(() => ({
    accept: 'constructorElement',
    hover({ _id: draggedId }) {
      if (draggedId !== _id) {
        const { index: overIndex } = findIngredient(_id);
        onMove(draggedId, overIndex);
      }
    },
  }), [findIngredient, onMove]);

  dragRef(dropRef(ref));

  return (
    <li
      className={`${burgerConstructorStyles.ingredient} ${isDragging && burgerConstructorStyles.isDragging}`}
      ref={(node) => dragRef(dropRef(node))}
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
});

BurgerConstructorElement.propTypes = {
  el: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }),
  ]).isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  findIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructorElement;
