import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'orange' | 'green' | 'gray';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'gray',
  className = '',
}: BadgeProps) => {
  const variants = {
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    green: "bg-green-100 text-green-700 border-green-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
