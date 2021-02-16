import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const List = ({ list }) => {
  return (
    <div>
      {list.map((item) => {
        return (
          <div key={uuidv4()}>
            <span>
              <a href={item.url} target="_blank">
                {item.title}
              </a>
            </span>
            <span>{item.author}</span>
            <span>{item.publishedAt}</span>
          </div>
        );
      })}
    </div>
  );
};

export default List;
