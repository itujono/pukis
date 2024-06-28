"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentTemplates = void 0;
exports.componentTemplates = {
    Button: `
  import React from 'react';
  
  interface ButtonProps {
    label: string;
    onClick: () => void;
  }
  
  const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
      <button onClick={onClick}>
        {label}
      </button>
    );
  };
  
  export default Button;
  `,
    Input: `
  import React, { ChangeEvent } from 'react';
  
  interface InputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Input: React.FC<InputProps> = ({ value, onChange }) => {
    return (
      <input type="text" value={value} onChange={onChange} />
    );
  };
  
  export default Input;
  `,
    Card: `
  import React from 'react';
  
  interface CardProps {
    title: string;
    content: string;
  }
  
  const Card: React.FC<CardProps> = ({ title, content }) => {
    return (
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    );
  };
  
  export default Card;
  `,
};
