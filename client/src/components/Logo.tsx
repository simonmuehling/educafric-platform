import { Link } from 'wouter';
import logoImage from '@assets/Edu_new (128 x 128 px)-2_1753244365562.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo = ({ className = '', showText = true, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link 
      href="/" 
      className={`flex items-center transition-all duration-200 hover:opacity-80 ${className}`}
    >
      <div className={`${sizeClasses[size]} overflow-hidden rounded-full bg-gradient-primary p-1`}>
        <img 
          src={logoImage} 
          alt="Educafric Logo" 
          className="w-full h-full object-contain rounded-full"
        />
      </div>
      {showText && (
        <span className={`ml-3 font-bold text-primary ${textSizeClasses[size === 'xl' ? 'lg' : size]}`}>
          Educafric
        </span>
      )}
    </Link>
  );
};

export default Logo;