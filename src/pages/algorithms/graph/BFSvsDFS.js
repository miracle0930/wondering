import React, { useState, useEffect } from 'react';
import styles from './bfsVsDfs.scss';
import PrimaryButton from '../../../components/buttons/primary/PrimaryButton';
import GeneralGrid from '../../../components/grids/general/GeneralGrid';
import GeneralSelect from '../../../components/selects/general/GeneralSelect';

const BFSvsDFS = () => {

  const [ searched, setSearched ] = useState([]);
  const [ blocked, setBlocked ] = useState([]);
  const [ bfsTitle, setBfsTitle ] = useState('Breadth');
  const [ dfsTitle, setDfsTitle ] = useState('Depth');
  const [ bfsComplete, setBfsComplete ] = useState(false);
  const [ dfsComplete, setDfsComplete ] = useState(false);
  const [ rows, setRows ] = useState(5);
  const [ cols, setCols ] = useState(5);
  const [ selectedRows, setSelectedRows ] = useState(4);
  const [ selectedCols, setSelectedCols ] = useState(4);

  const range = () => {
    const res = [];
    for(let i = 1; i <= 20; i += 1) {
      res.push(i);
    }
    return res;
  }

  // useEffect(() => {
  //   const threshold = Math.ceil(rows * cols * 0.3);
  //   const blocked = [];
  //   const blockInit = () => {
  //     while (blocked.length < threshold) {
  //       const x = parseInt(Math.random() * rows);
  //       const y = parseInt(Math.random() * cols);
  //       if ((x === 0 && y === 0) || (x === rows - 1 && y === cols - 1) || blocked.filter((e) => e.x === x && e.y === y).length > 0) {
  //         continue;
  //       }
  //       blocked.push({ x, y });
  //     }
  //     setBlocked(blocked);
  //   }
  //   blockInit();
  // }, [])

  const getBlocks = () => {
    reset();
    const threshold = Math.ceil(rows * cols * 0.2);
    const blocked = [];
    while (blocked.length < threshold) {
      const x = parseInt(Math.random() * rows);
      const y = parseInt(Math.random() * cols);
      if ((x === 0 && y === 0) || (x === rows - 1 && y === cols - 1) || blocked.filter((e) => e.x === x && e.y === y).length > 0) {
        continue;
      }
      blocked.push({ x, y });
    }
    setBlocked(blocked);
  }

  const start = (type) => {
    reset();
    const queue = [];
    const searched = [];
    const directions = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
    queue.push({ x: 0, y: 0, depth: 0, type });
    searched.push({ x: 0, y: 0, depth: 0, type });

    while (queue.length > 0) {
      const current = queue.shift();

      if (current.x === rows - 1 && current.y === cols - 1) {
        break;
      }

      directions.forEach((direction) => {
        const nextX = current.x + direction.x;
        const nextY = current.y + direction.y;
        const nextDepth = current.depth + 1;
        const isVisited = searched.filter((e) => e.x === nextX && e.y === nextY).length > 0;
        const isBlocked = blocked.filter((e) => e.x === nextX && e.y === nextY).length > 0;
        if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols && !isVisited && !isBlocked) {
          if (type === 'bfs') {
            queue.push({ x: nextX, y: nextY, depth: nextDepth, type });
          } else if (type === 'dfs') {
            queue.unshift({ x: nextX, y: nextY, depth: nextDepth, type });
          }
          searched.push({ x: nextX, y: nextY, depth: nextDepth, type });
        }
      });
      setSearched(searched);
    }

    if (type === 'bfs') {
      setBfsComplete(true);
    } else if (type === 'dfs') {
      setDfsComplete(true);
    }

  }


  const reset = () => {
    setSearched([]);
    setBfsTitle('Start BFS');
    setDfsTitle('Start DFS');
    setBfsComplete(false);
    setDfsComplete(false);
  }

  return (
    <div className={styles['page-container']}>
      <div className={styles['design-buttons-container']}>
        <PrimaryButton
          title={'Reset'}
          onClick={reset}
        />
        <PrimaryButton
          title={'Generate blocks'}
          onClick={getBlocks}
        />
        <GeneralSelect
          items={range()}
          selectedIndex={`${selectedRows}`}
          onChange={(index) => {
            setBlocked([]);
            reset();
            setRows(range()[index]);
            setSelectedRows(index);
          }}
        />
        <GeneralSelect
          items={range()}
          selectedIndex={`${selectedCols}`}
          onChange={(index) => {
            setBlocked([]);
            reset();
            setCols(range()[index]);
            setSelectedCols(index);
          }}
        />
      </div>
      <div className={styles['main-container']}>
        <div className={styles['start-buttons-container']}>
          <PrimaryButton
            title={bfsTitle}
            onClick={() => start('bfs')}
          />
          <PrimaryButton
            title={dfsTitle}
            onClick={() => start('dfs')}
          />
          <div className={styles['result-container']}>
            {
              bfsComplete &&
              <div>{`BFS complete, after searching ${searched.length} blocks`} </div>
            }
            {
              dfsComplete &&
              <div>{`DFS complete, after searching ${searched.length} blocks`} </div>
            }
          </div>
        </div>
        <GeneralGrid
          rows={rows}
          cols={cols}
          blocked={blocked}
          searched={searched}
        />
      </div>
    </div>
  )

}

export default BFSvsDFS;