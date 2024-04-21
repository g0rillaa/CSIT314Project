import React from 'react';
import './notfound.css'

function NotFoundPage() {
    
	const backBtn = () => {
		window.history.back()
	}
	return (
		<div className='NotFoundPage'>
		    <div className='notfoundPane'>
                <div className='notfoundLeft'>
					<h1 className='notfoundTxt'>404 Not Found</h1>
					<button className='notfoundButton' onClick={ backBtn }>Back</button>
                </div>
                <div className='loginImage'></div>
            </div>
	    </div>
	)
}

export default NotFoundPage;