import React from 'react';
import PropTypes from 'prop-types';
import Palette from './palette';
import NumberSegment from './numberSegment';
import NumberLineSegment from './numberLineSegment';

import pointer from '../../images/pointer.png';

import styles from './colorBarStyles/colorBar.module.css';

const ColorBar = (props) => {
  const range = props.end - props.start;
  let mid;
  let step;
  if (props.mid != undefined) {
    mid = (props.mid - props.start) / range;
  }
  if (props.step != undefined) {
    step = props.step;
  } else {
    step = 1;
  }

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
  let intRange;
  if (step == 1) {
    intRange = Math.floor(props.end) - Math.ceil(props.start);
  } else {
    intRange = Math.trunc((props.end - props.start) / step);
  }

  let partialRightLine = false;
  let partialLeftLine = false;
  let rightLineWidth;
  let leftLineWidth;
  if (step == 1) {
    if (props.end != Math.floor(props.end)) {
      rightLineWidth = lineWidth * (props.end - Math.floor(props.end));
      partialRightLine = true;
    }
    if (props.start != Math.ceil(props.start)) {
      leftLineWidth = lineWidth * (Math.ceil(props.start) - props.start);
      partialLeftLine = true;
    }
  } else {
    if (props.end % step != 0) {
      rightLineWidth = lineWidth * (props.end % step);
      partialRightLine = true;
    }
    if (props.start % step != 0) {
      leftLineWidth = lineWidth * (step - (props.start % step));
      partialLeftLine = true;
    }
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
      <NumberSegment width={leftLineWidth.toString() + widthUnit} key={key} />
    );
    key += step;
  }
  for (let i = 0; i < intRange - 1; i++) {
    numberLine.push(
      <NumberLineSegment
        width={(lineWidth * step).toString() + widthUnit}
        height={props.lineHeight}
        leftTick={true}
        color='black'
        key={key * step}
      />
    );
    numbers.push(
      <NumberSegment
        width={(lineWidth * step).toString() + widthUnit}
        value={value++ * step}
        key={key++ * step}
      />
    );
  }
  if (partialRightLine) {
    numberLine.push(
      <NumberLineSegment
        width={(lineWidth * step).toString() + widthUnit}
        height={props.lineHeight}
        leftTick={true}
        color='black'
        key={key * step}
      />
    );
    numbers.push(
      <NumberSegment
        width={(lineWidth * step).toString() + widthUnit}
        key={key++ * step}
        value={value++ * step}
      />
    );
    numberLine.push(
      <NumberLineSegment
        width={rightLineWidth.toString() + widthUnit}
        height={props.lineHeight}
        leftTick={true}
        color='black'
        key={key * step}
      />
    );
    numbers.push(
      <NumberSegment
        width={(lineWidth * step).toString() + widthUnit}
        key={key * step}
        value={value * step}
      />
    );
  } else {
    numberLine.push(
      <NumberLineSegment
        width={(lineWidth * step).toString() + widthUnit}
        height={props.lineHeight}
        leftTick={true}
        rightTick={true}
        color='black'
        key={key * step}
      />
    );
    numbers.push(
      <NumberSegment
        width={(lineWidth * step).toString() + widthUnit}
        key={key++ * step}
        value={value++ * step}
      />
    );
    numbers.push(
      <NumberSegment
        width={(lineWidth * step).toString() + widthUnit}
        key={key * step}
        value={value * step}
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

  const numberOffset = (-(lineWidth * step) / 2).toString() + widthUnit;

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
        palette={
          props.mid != undefined
            ? [
                { pos: 0.0, color: '#0000ff', id: 0 },
                { pos: mid, color: '#ffffff', id: 1 },
                { pos: 1.0, color: '#ff0000', id: 2 },
              ]
            : [
                { pos: 0.0, color: '#0000ff', id: 0 },
                { pos: 1.0, color: '#ff0000', id: 2 },
              ]
        }
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
  mid: PropTypes.number,
  end: PropTypes.number.isRequired,
  step: PropTypes.number,
  width: PropTypes.string,
  barHeight: PropTypes.string,
  lineHeight: PropTypes.string,
  fontSize: PropTypes.string,
  pointerValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  pointerWidth: PropTypes.string,
};

export default ColorBar;
