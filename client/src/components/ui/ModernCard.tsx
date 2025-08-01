import React from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'default';
  hover?: boolean;
  onClick?: () => void;
}

export const ModernCard = ({ 
  children, 
  className, 
  gradient = 'default',
  hover = true,
  onClick 
}: ModernCardProps) => {
  
  const gradientClasses = {
    blue: 'modern-card-blue',
    green: 'modern-card-green', 
    orange: 'modern-card-orange',
    purple: 'modern-card-purple',
    pink: 'modern-card-pink',
    default: 'modern-card-default'
  };

  return (
    <div 
      className={cn(
        'modern-card',
        gradientClasses[gradient],
        hover && 'modern-card-hover',
        onClick && 'modern-card-clickable',
        className
      )}
      onClick={onClick}
    >
      {children}
      
      <style>{`
        .modern-card {
          background: rgb(254, 254, 254);
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 0.5px 0 1px rgba(255, 255, 255, 0.23) inset,
                      0 1px 0 0 rgba(255, 255, 255, 0.66) inset, 
                      0 4px 16px rgba(0, 0, 0, 0.12);
          transition: all 0.3s ease;
          font-family: "Nunito", sans-serif;
        }

        .modern-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 0.5px 0 1px rgba(255, 255, 255, 0.23) inset,
                      0 1px 0 0 rgba(255, 255, 255, 0.66) inset, 
                      0 8px 32px rgba(0, 0, 0, 0.16);
        }

        .modern-card-clickable {
          cursor: pointer;
        }

        .modern-card-blue {
          background: linear-gradient(135deg, rgba(124, 136, 224, 0.1) 0%, rgba(195, 244, 252, 0.1) 100%);
          border-left: 4px solid #7c88e0;
        }

        .modern-card-green {
          background: linear-gradient(135deg, rgba(151, 231, 209, 0.1) 0%, rgba(236, 252, 195, 0.1) 100%);
          border-left: 4px solid #97e7d1;
        }

        .modern-card-orange {
          background: linear-gradient(135deg, rgba(229, 162, 67, 0.1) 0%, rgba(247, 247, 170, 0.1) 100%);
          border-left: 4px solid #e5a243;
        }

        .modern-card-purple {
          background: linear-gradient(135deg, rgba(185, 159, 237, 0.1) 0%, rgba(224, 195, 252, 0.1) 100%);
          border-left: 4px solid #b99fed;
        }

        .modern-card-pink {
          background: linear-gradient(135deg, rgba(252, 142, 190, 0.1) 0%, rgba(252, 229, 195, 0.1) 100%);
          border-left: 4px solid #fc8ebe;
        }

        .modern-card-default {
          background: rgb(254, 254, 254);
        }
      `}</style>
    </div>
  );
};

interface ModernStatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  gradient?: 'blue' | 'green' | 'orange' | 'purple' | 'pink';
}

export const ModernStatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  gradient = 'blue' 
}: ModernStatsCardProps) => {
  return (
    <ModernCard gradient={gradient} className="modern-stats-card">
      <div className="stats-header">
        <div className="stats-icon">
          {icon}
        </div>
        {trend && (
          <div className={`stats-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      
      <div className="stats-content">
        <div className="stats-value">{value}</div>
        <div className="stats-title">{title}</div>
      </div>

      <style>{`
        .modern-stats-card {
          position: relative;
          overflow: hidden;
        }

        .stats-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .stats-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px;
          color: #4a5568;
        }

        .stats-trend {
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stats-trend.positive {
          background: rgba(72, 187, 120, 0.1);
          color: #38a169;
        }

        .stats-trend.negative {
          background: rgba(245, 101, 101, 0.1);
          color: #e53e3e;
        }

        .stats-content {
          text-align: left;
        }

        .stats-value {
          font-size: 2rem;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 4px;
          font-family: "Nunito", sans-serif;
        }

        .stats-title {
          font-size: 0.875rem;
          color: #718096;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </ModernCard>
  );
};

export default ModernCard;