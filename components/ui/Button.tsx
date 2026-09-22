import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "font-medium transition-all active:scale-95";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border border-gray-200 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-600 hover:text-black hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${sizeStyle} rounded-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
