import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  type ReactNode,
} from "react";

// Import from separated modules
import { headerSizeConfig, maxWidthConfig } from "./config";
import { Breadcrumbs, Tabs } from "./components";
import type {
  HeaderProps,
  HeaderContextValue,
  HeaderVariant,
  HeaderSize,
  BreadcrumbItem,
  TabItem,
} from "./types";

// ============================================================================
// CONTEXT
// ============================================================================

const HeaderContext = createContext<HeaderContextValue | null>(null);

const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within Header");
  }
  return context;
};

// ============================================================================
// DEFAULT HEADER LAYOUT
// ============================================================================

const DefaultHeader: React.FC<{
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string | ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  avatar?: ReactNode;
  badge?: string | number;
  size: HeaderSize;
}> = ({
  title,
  subtitle,
  description,
  breadcrumbs,
  actions,
  avatar,
  badge,
  size,
}) => {
  const config = headerSizeConfig[size];

  return (
    <div className={`flex flex-col ${config.gap}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {avatar && <div className="shrink-0">{avatar}</div>}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              {typeof title === "string" ? (
                <h1
                  className={`${config.title} font-bold text-slate-900 dark:text-white truncate`}
                >
                  {title}
                </h1>
              ) : (
                title
              )}
              {badge && (
                <span className="px-3 py-1 text-sm font-semibold bg-blue-500 text-white rounded-full">
                  {badge}
                </span>
              )}
            </div>

            {subtitle && (
              <div
                className={`${config.subtitle} text-slate-600 dark:text-slate-400 mt-1`}
              >
                {subtitle}
              </div>
            )}

            {description && (
              <div
                className={`${config.description} text-slate-600 dark:text-slate-400 mt-2 max-w-3xl`}
              >
                {description}
              </div>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// CENTERED HEADER LAYOUT
// ============================================================================

const CenteredHeader: React.FC<{
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string | ReactNode;
  actions?: ReactNode;
  badge?: string | number;
  size: HeaderSize;
}> = ({ title, subtitle, description, actions, badge, size }) => {
  const config = headerSizeConfig[size];

  return (
    <div className={`flex flex-col items-center text-center ${config.gap}`}>
      <div className="flex items-center gap-3">
        {typeof title === "string" ? (
          <h1
            className={`${config.title} font-bold text-slate-900 dark:text-white`}
          >
            {title}
          </h1>
        ) : (
          title
        )}
        {badge && (
          <span className="px-3 py-1 text-sm font-semibold bg-blue-500 text-white rounded-full">
            {badge}
          </span>
        )}
      </div>

      {subtitle && (
        <div
          className={`${config.subtitle} text-slate-600 dark:text-slate-400`}
        >
          {subtitle}
        </div>
      )}

      {description && (
        <div
          className={`${config.description} text-slate-600 dark:text-slate-400 max-w-2xl`}
        >
          {description}
        </div>
      )}

      {actions && <div className="flex items-center gap-2 mt-2">{actions}</div>}
    </div>
  );
};

// ============================================================================
// SPLIT HEADER LAYOUT
// ============================================================================

const SplitHeader: React.FC<{
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  actions?: ReactNode;
  avatar?: ReactNode;
  size: HeaderSize;
}> = ({ title, subtitle, actions, avatar, size }) => {
  const config = headerSizeConfig[size];

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {avatar && <div className="shrink-0">{avatar}</div>}
        <div className="flex-1 min-w-0">
          {typeof title === "string" ? (
            <h1
              className={`${config.title} font-bold text-slate-900 dark:text-white truncate`}
            >
              {title}
            </h1>
          ) : (
            title
          )}
          {subtitle && (
            <div
              className={`${config.subtitle} text-slate-600 dark:text-slate-400 mt-1`}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
};

// ============================================================================
// MINIMAL HEADER LAYOUT
// ============================================================================

const MinimalHeader: React.FC<{
  title?: string | ReactNode;
  actions?: ReactNode;
  size: HeaderSize;
}> = ({ title, actions, size }) => {
  const config = headerSizeConfig[size];

  return (
    <div className="flex items-center justify-between gap-4">
      {typeof title === "string" ? (
        <h1
          className={`${config.title} font-bold text-slate-900 dark:text-white`}
        >
          {title}
        </h1>
      ) : (
        title
      )}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

// ============================================================================
// HERO HEADER LAYOUT
// ============================================================================

const HeroHeader: React.FC<{
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string | ReactNode;
  actions?: ReactNode;
  size: HeaderSize;
}> = ({ title, subtitle, description, actions, size }) => {
  const config = headerSizeConfig[size];

  return (
    <div
      className={`flex flex-col items-center text-center ${config.gap} max-w-4xl mx-auto`}
    >
      {typeof title === "string" ? (
        <h1
          className={`${config.title} md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight`}
        >
          {title}
        </h1>
      ) : (
        title
      )}

      {subtitle && (
        <div
          className={`${config.subtitle} md:text-2xl text-slate-600 dark:text-slate-400`}
        >
          {subtitle}
        </div>
      )}

      {description && (
        <div
          className={`${config.description} md:text-lg text-slate-600 dark:text-slate-400`}
        >
          {description}
        </div>
      )}

      {actions && <div className="flex items-center gap-3 mt-4">{actions}</div>}
    </div>
  );
};

// ============================================================================
// MAIN HEADER COMPONENT
// ============================================================================

export const Header: React.FC<HeaderProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  title,
  subtitle,
  description,
  breadcrumbs,
  actions,
  tabs,
  activeTab,
  onTabChange,
  avatar,
  badge,
  backgroundImage,
  backgroundOverlay = true,
  backgroundBlur = false,
  sticky = false,
  bordered = false,
  elevated = false,
  fullWidth = false,
  maxWidth = "xl",
}) => {
  const [localActiveTab, setLocalActiveTab] = useState(
    activeTab || tabs?.[0]?.id || null,
  );

  const containerClasses = useMemo(() => {
    const classes: string[] = ["w-full"];

    if (sticky) {
      classes.push("sticky top-0 z-30");
    }

    if (bordered) {
      classes.push("border-b border-slate-200 dark:border-slate-800");
    }

    if (elevated) {
      classes.push("shadow-md");
    }

    if (backgroundImage) {
      classes.push("relative");
    } else {
      classes.push("bg-white dark:bg-slate-900");
    }

    return classes.join(" ");
  }, [sticky, bordered, elevated, backgroundImage]);

  const contentClasses = useMemo(() => {
    return `${fullWidth ? "w-full" : `mx-auto ${maxWidthConfig[maxWidth]}`} ${headerSizeConfig[size].padding}`;
  }, [fullWidth, maxWidth, size]);

  const contextValue: HeaderContextValue = {
    activeTab: localActiveTab,
    setActiveTab: setLocalActiveTab,
    variant,
    size,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      <header className={`${containerClasses} ${className}`}>
        {/* Background Image */}
        {backgroundImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              {backgroundBlur && (
                <div className="absolute inset-0 backdrop-blur-sm" />
              )}
              {backgroundOverlay && (
                <div className="absolute inset-0 bg-slate-900/50" />
              )}
            </div>
            <div className="relative z-10">{renderContent()}</div>
          </>
        )}

        {/* Regular Content */}
        {!backgroundImage && renderContent()}
      </header>
    </HeaderContext.Provider>
  );

  function renderContent() {
    return (
      <div className={contentClasses}>
        {/* Custom Children */}
        {children}

        {/* Variant Layouts */}
        {!children && (
          <>
            {variant === "default" && (
              <DefaultHeader
                title={title}
                subtitle={subtitle}
                description={description}
                breadcrumbs={breadcrumbs}
                actions={actions}
                avatar={avatar}
                badge={badge}
                size={size}
              />
            )}

            {variant === "centered" && (
              <CenteredHeader
                title={title}
                subtitle={subtitle}
                description={description}
                actions={actions}
                badge={badge}
                size={size}
              />
            )}

            {variant === "split" && (
              <SplitHeader
                title={title}
                subtitle={subtitle}
                actions={actions}
                avatar={avatar}
                size={size}
              />
            )}

            {variant === "minimal" && (
              <MinimalHeader title={title} actions={actions} size={size} />
            )}

            {variant === "hero" && (
              <HeroHeader
                title={title}
                subtitle={subtitle}
                description={description}
                actions={actions}
                size={size}
              />
            )}
          </>
        )}

        {/* Tabs */}
        {tabs && tabs.length > 0 && (
          <div className="mt-6">
            <Tabs
              items={tabs}
              activeTab={activeTab || localActiveTab}
              onTabChange={onTabChange}
            />
          </div>
        )}
      </div>
    );
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export { useHeader };
export type { HeaderProps, HeaderVariant, HeaderSize, BreadcrumbItem, TabItem };
