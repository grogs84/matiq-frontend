/* eslint-disable react/prop-types */
import { useState, createContext, useContext } from 'react';

const TabsContext = createContext();

/**
 * Tabs component - container for tab navigation
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Tab components
 * @param {string} [props.defaultValue] - Default active tab value
 * @param {string} [props.value] - Controlled active tab value
 * @param {Function} [props.onValueChange] - Callback when tab changes
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant='default'] - Tab variant ('default' | 'pills' | 'underline')
 * @returns {JSX.Element} The Tabs component
 */
function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
  className = '',
  variant = 'default'
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalValue;
  
  const handleTabChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };
  
  return (
    <TabsContext.Provider value={{ activeTab, onTabChange: handleTabChange, variant }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/**
 * TabsList component - container for tab buttons
 */
Tabs.List = function TabsList({ children, className = '' }) {
  const { variant } = useContext(TabsContext);
  
  const variantClasses = {
    default: 'border-b border-neutral-200 dark:border-neutral-700',
    pills: 'bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg inline-flex',
    underline: 'border-b border-neutral-200 dark:border-neutral-700'
  };
  
  return (
    <div className={`flex ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

/**
 * TabsTrigger component - individual tab button
 */
Tabs.Trigger = function TabsTrigger({ children, value, className = '', disabled = false }) {
  const { activeTab, onTabChange, variant } = useContext(TabsContext);
  const isActive = activeTab === value;
  
  const handleClick = () => {
    if (!disabled) {
      onTabChange(value);
    }
  };
  
  const baseClasses = 'px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    default: isActive 
      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border-b-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600',
    pills: isActive
      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm rounded-md'
      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-neutral-700/50 rounded-md',
    underline: isActive
      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20'
      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border-b-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600'
  };
  
  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      aria-selected={isActive}
      role="tab"
    >
      {children}
    </button>
  );
};

/**
 * TabsContent component - tab panel content
 */
Tabs.Content = function TabsContent({ children, value, className = '' }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) {
    return null;
  }
  
  return (
    <div className={`mt-4 ${className}`} role="tabpanel">
      {children}
    </div>
  );
};

export default Tabs;