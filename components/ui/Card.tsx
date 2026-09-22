import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline';
}

export const Card = ({
  children,
  className = '',
  variant = 'default',
}: CardProps) => {
  const variants = {
    default: "bg-white rounded-2xl border border-gray-100 shadow-2xl",
    outline: "bg-white rounded-2xl border border-gray-200 shadow-sm",
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
