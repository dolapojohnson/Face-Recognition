import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    console.log('check');    
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img src={ imageUrl } alt='' width='300px' height='auto' />
            </div>
        </div>
    );
}

export default FaceRecognition;
