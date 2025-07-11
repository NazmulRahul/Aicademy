import PropTypes from 'prop-types';

const LoadingSpinner = ({ message = "Loading...", size = "medium" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin`}></div>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default LoadingSpinner;
