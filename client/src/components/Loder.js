import React from 'react';
import ReactLoading from 'react-loading';
 
const Loader = ({ spokes, Gold }) => (
    <ReactLoading type={spokes} color={Gold} height={'20%'} width={'20%'} />
);
 
export default Loader;