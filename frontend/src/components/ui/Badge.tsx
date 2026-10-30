import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'categoryA' | 'categoryB' | 'categoryC' | 'categoryD';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'info',
  size = 'md',
  icon,
  className = ''
}) => {
  const styles = {
    info: 'bg-[#EAF1F9] text-[#2563A6] border border-[#C5D9F0]',
    success: 'bg-[#E8F5E9] text-[#237A57] border border-[#C8E6C9]',
    warning: 'bg-[#FFF8E1] text-[#A96A12] border border-[#FFE082]',
    danger: 'bg-[#FFEBEE] text-[#B42332] border border-[#FFCDD2]',
    categoryA: 'bg-[#E8F5E9] text-[#237A57] border border-[#A5D6A7]',
    categoryB: 'bg-[#FFF8E1] text-[#A96A12] border border-[#FFE082]',
    categoryC: 'bg-[#ECEFF1] text-[#546E7A] border border-[#CFD8DC]',
    categoryD: 'bg-[#FFEBEE] text-[#B42332] border border-[#EF9A9A]',
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${styles[variant]} ${sizeClasses} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
