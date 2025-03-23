const Card = ({ children, className }) => (
    <div className={`p-4 rounded-lg shadow ${className}`}>{children}</div>
  );
  
const CardContent = ({ children }) => <div className="p-2">{children}</div>;
  
export { Card, CardContent };
  