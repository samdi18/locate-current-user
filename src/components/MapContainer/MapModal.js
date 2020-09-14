import React, { useEffect, useRef, useState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);
library.add(faAngleRight);

const MapModal = ({ setOpen, currentPosition }) => {
  const [name, setName] = useState('');
  const [isSubmit, setSubmit] = useState(false);

  const node = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => {
    setName(name);
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      console.log(
        `The latitude is ${currentPosition.lat} and longitude is ${currentPosition.lng}`
      );
      console.log(`Name is ${name}`);

      setSubmit(true);
    }
  };

  return (
    <div className='modal'>
      <div className='modal__content' ref={node}>
        <form onSubmit={handleSubmit}>
          <p>Current latitude : {currentPosition.lat}</p>
          <p>Current longitude : {currentPosition.lng}</p>

          <div className='modal__submit'>
            <input
              type='text'
              value={name}
              onChange={(e) => handleChange(e.target.value)}
              placeholder='Type your name'
            />
            <button>
              <FontAwesomeIcon
                icon='angle-right'
                size='lg'
                color='white'
                className='icon'
              />
            </button>
          </div>
        </form>

        {isSubmit && <h4>Submission done</h4>}
        <div className='modal__close' onClick={(e) => setOpen(false)}>
          <FontAwesomeIcon icon='times' size='lg' color='white' />
        </div>
      </div>
    </div>
  );
};

export default MapModal;
