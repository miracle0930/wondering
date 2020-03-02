import React, { useEffect } from 'react';
import styles from './generalGrid.scss';
import PropTypes from 'prop-types';

const GeneralGrid = ({ rows, cols, gridStyles, blocked, searched, path }) => {

  const { cellStyle, containerStyle } = gridStyles;

  const rowsHelper = [];
  const colsHelper = [];
  let gridTemplateRows = `repeat(${rows}, 1fr)`;
  let gridTemplateColumns = `repeat(${cols}, 1fr)`;
  while (rows-- !== 0) { 
    rowsHelper.push('');
  };
  while (cols-- !== 0) { 
    colsHelper.push('');
  };

  return (
    <div 
      className={`${styles['cmpt-container']} ${containerStyle || ''}`}
      style={{
        display: 'grid',
        gridTemplateRows,
        gridTemplateColumns,
        gridRowGap: '2px',
        gridColumnGap: '2px'
      }}
    >
      {
        rowsHelper.map((_, rowIndex) => {
          return colsHelper.map((_, colIndex) => {
            const isBlocked = blocked.filter((e) => e.x === rowIndex && e.y === colIndex).length > 0;
            const isSearched = searched.filter((e) => e.x === rowIndex && e.y === colIndex).length > 0;
            const isPath = path.filter((e) => e.x === rowIndex && e.y === colIndex).length > 0;
            const maxDepth = searched.length > 0 && searched[searched.length - 1].depth;
            let searchedDepth = 0;
            if (isSearched) {
              searchedDepth = searched.filter((e) => e.x === rowIndex && e.y === colIndex)[0].depth;
            }            
            return (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={`${styles['cell-container']} ${cellStyle || ''}`}
                style={{
                  borderStyle: 'solid',
                  borderColor: 'black',
                  borderWidth: '1px',
                  height: `calc(600px / ${Math.max(rowsHelper.length, colsHelper.length)})`,
                  width: `calc(600px / ${Math.max(rowsHelper.length, colsHelper.length)})`,
                  backgroundColor: isBlocked ? 'gray' : isPath ? 'blue' : isSearched ? `rgba(255,123,123, ${searchedDepth / maxDepth})` : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            )
          })
        })
      }
    </div>
  )
}

GeneralGrid.defaultProps = {
  rows: 0,
  cols: 0,
  gridStyles: {},
  blocked: [],
  searched: [],
  path: []
}

GeneralGrid.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  gridStyles: PropTypes.object,
  blocked: PropTypes.array,
  searched: PropTypes.array,
  path: PropTypes.array
}

export default GeneralGrid;