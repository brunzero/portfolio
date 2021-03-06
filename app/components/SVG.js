import React from 'react';

const SVG = ({name}) => {
  if(name.match("microphone"))
    return(
      <svg className="microphone" enableBackground="new 0 0 96 96" id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path className="line" d="M256,326.2c-41,0-74.4-33.4-74.4-74.4V74.4C181.6,33.4,215,0,256,0s74.4,33.4,74.4,74.4v177.4   C330.4,292.8,297,326.2,256,326.2z M256,21.1c-29.4,0-53.3,23.9-53.3,53.3v177.4c0,29.4,23.9,53.3,53.3,53.3h0   c29.4,0,53.3-23.9,53.3-53.3V74.4C309.3,45,285.4,21.1,256,21.1z" fill="#6A6E7C"/><path className="line" d="M256,390c-78.9,0-143.1-64.2-143.1-143.1c0-5.8,4.7-10.5,10.5-10.5c5.8,0,10.5,4.7,10.5,10.5   c0,67.3,54.7,122,122,122s122-54.7,122-122c0-5.8,4.7-10.5,10.5-10.5c5.8,0,10.5,4.7,10.5,10.5C399.1,325.8,334.9,390,256,390z" fill="#6A6E7C"/><path className="line"d="M256,512c-5.8,0-10.5-4.7-10.5-10.5v-122c0-5.8,4.7-10.5,10.5-10.5c5.8,0,10.5,4.7,10.5,10.5v122   C266.5,507.3,261.8,512,256,512z" fill="#6A6E7C"/><path className="line" d="M326.9,512H185.1c-5.8,0-10.5-4.7-10.5-10.5c0-5.8,4.7-10.5,10.5-10.5h141.7c5.8,0,10.5,4.7,10.5,10.5   C337.4,507.3,332.7,512,326.9,512z" fill="#6A6E7C"/></g></svg>
    )
  else if(name.match("leftarrow"))
    return(
      <svg className="leftarrow" version="1.1" viewBox="0 0 32 32">
        <path className="line" d="M16,32c8.836,0,16-7.164,16-15.998C32,7.164,24.836,0,16,0S0,7.164,0,16.002   C0,24.836,7.164,32,16,32z M15.969,8v6.002H24V18h-8.031v5.969L8,16.002L15.969,8z"/>
      </svg>
    )
  else if(name.match("rightarrow"))
    return(
      <svg className="rightarrow" version="1.1" viewBox="0 0 32 32">
        <path className="line"d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M16.031,24v-6H8v-4h8.031   V8.031L24,16L16.031,24z"/>  
      </svg>
    )
  else if(name.match("reload"))
    return(
      <svg className="reload" enable-background="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px">
        <rect fill="none" height="50" width="50"/>
        <polyline className="arrow" fill="none" points="40,7 40,16   31,15.999 " stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <path className="line" d="M41.999,25  c0,9.39-7.61,17-17,17s-17-7.61-17-17s7.61-17,17-17c5.011,0,9.516,2.167,12.627,5.616c0.618,0.686,1.182,1.423,1.683,2.203" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
      </svg>
    )
  else return;
}

export default SVG;