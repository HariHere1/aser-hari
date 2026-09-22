import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`px-4 py-2.5 bg-gray-100 border border-transparent rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-black focus:bg-white ${
          error ? 'border-red-500 ring-red-500' : 'focus:ring-black'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};
