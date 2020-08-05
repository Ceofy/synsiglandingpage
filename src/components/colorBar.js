import React from 'react';
import PropTypes from 'prop-types';
import Palette from './colorBar/palette';
import NumberSegment from './colorBar/numberSegment';
import NumberLineSegment from './colorBar/numberLineSegment';

import pointer from '../images/pointer.png';

import styles from './componentStyles/colorBar.module.css';

const ColorBar = (props) => {
  const range = props.end - props.start;
  const mid = (props.mid - props.start) / range;

  //Number line variables
  let widthUnit;
  let widthNumber;
  const widthString = props.width.toString();
  for (let i = 0; i < widthString.length; i++) {
    if (isNaN(parseInt(widthString[i]))) {
      widthNumber = Number(widthString.slice(0, i));
      widthUnit = widthString.slice(i);
      break;
    }
  }

  const lineWidth = widthNumber / range;
  const intRange = Math.floor(props.end) - Math.ceil(props.start);

  let partialRightLine = false;
  let partialLeftLine = false;
  let rightLineWidth;
  let leftLineWidth;
  if (props.end != Math.floor(props.end)) {
    rightLineWidth = lineWidth * (props.end - Math.floor(props.end));
    partialRightLine = true;
  }
  if (props.start != Math.ceil(props.start)) {
    leftLineWidth = lineWidth * (Math.ceil(props.start) - props.start);
    partialLeftLine = true;
  }

  //Build number line
  const numberLine = [];
  const numbers = [];
  let key = 0;
  let value = Math.ceil(props.start);
  if (partialLeftLine) {
    numberLine.push(
      <NumberLineSegment
        width={leftLineWidth.toString() + widthUnit}
        height={props.lineHeight}
        color='black'
        key={key}
      />
    );
    numbers.push(
      <NumberSegment width={leftLineWidth.toString() + widthUnit} key={key++} />
    );
  }
  for (let i = 0; i < intRange - 1; i++) {
    numberLine.push(
      <NumberLineSegment
        width={lineWidth.toString() + widthUnit}
        height={props.lineHeight}
        leftTick={true}
        color='black'
        key={key}
      />
    );
    numbers.push(
      <NumberSegment
        width={lineWidth.toString() + widthUnit}
        value={value++}
        key={key++}
      />
    );
  }
  if (partialRightLine) {
    numberLine.push(
      <NumberLineSegment
        width={lineWidth.toString() + widthUnit}
        height={props.lineHeight}
        leftTick={true}
        color='black'
        key={key}
      />
    );
    numbers.push(
      <NumberSegment
        width={lineWidth.toString() + widthUnit}
        key={key++}
        value={value++}
      />
    );
    numberLine.push(
      <NumberLineSegment
        width={rightLineWidth.toString() + widthUnit}
        height={props.lineHeight}
        leftTick={true}
        color='black'
        key={key}
      />
    );
    numbers.push(
      <NumberSegment
        width={lineWidth.toString() + widthUnit}
        key={key++}
        value={value++}
      />
    );
  } else {
    numberLine.push(
      <NumberLineSegment
        width={lineWidth.toString() + widthUnit}
        height={props.lineHeight}
        leftTick={true}
        rightTick={true}
        color='black'
        key={key}
      />
    );
    numbers.push(
      <NumberSegment
        width={lineWidth.toString() + widthUnit}
        key={key++}
        value={value++}
      />
    );
    numbers.push(
      <NumberSegment
        width={lineWidth.toString() + widthUnit}
        key={key++}
        value={value++}
      />
    );
  }

  const pointerOffset =
    'calc(' +
    ((((props.pointerValue - props.start) / range) * widthNumber).toString() +
      widthUnit) +
    ' - (' +
    props.pointerWidth +
    ' / 2))';

  const numberOffset = (-lineWidth / 2).toString() + widthUnit;

  return (
    <div className={styles.colorBarDiv}>
      <img
        src={pointer}
        className={styles.pointer}
        style={{ width: props.pointerWidth, left: pointerOffset }}
      />
      <Palette
        width={props.width}
        height={props.barHeight}
        palette={[
          { pos: 0.0, color: '#0000ff', id: 0 },
          { pos: mid, color: '#ffffff', id: 1 },
          { pos: 1.0, color: '#ff0000', id: 2 },
        ]}
      />
      <div
        className={styles.container}
        style={{ width: props.width, height: props.lineHeight }}
      >
        {numberLine}
      </div>
      <div
        className={styles.container}
        style={{ left: numberOffset, fontSize: props.fontSize }}
      >
        {numbers}
      </div>
    </div>
  );
};

ColorBar.defaultProps = {
  width: '100%',
  barHeight: '1em',
  lineHeight: '4px',
  fontSize: 'inherit',
  pointerWidth: '15px',
};

ColorBar.propTypes = {
  start: PropTypes.number.isRequired,
  mid: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  width: PropTypes.string,
  barHeight: PropTypes.string,
  lineHeight: PropTypes.string,
  fontSize: PropTypes.string,
  pointerValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  pointerWidth: PropTypes.string,
};

export default ColorBar;
