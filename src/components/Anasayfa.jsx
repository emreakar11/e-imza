import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  background-color: #865334c7;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #347758;
  }
`;


export const Div = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;

  // Responsive tasarım
  @media (max-width: 600px) {
    padding: 15px;
    font-size: 14px;
  }
`;

export const Divİki = styled.div`
  background-color: #eecbad;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;

  // Responsive tasarım
  @media (max-width: 600px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const Anasayfa = ({ children, ...props }) => {
  return (
     <>
       <Div>
       <Button {...props}>{children} </Button>;

       </Div>
          
  
     </>
  ) 

};

export default Anasayfa;