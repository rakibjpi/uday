import type { BackgroundState } from "~/type/Type";
import { BackgroundSettings } from "./BackgroundSettings";
import { useBackgroundSettings } from "./useBackgroundSettings";
import { BackgroundSettingsTrigger } from "./BackgroundSettingsTrigger";

// ============================================================================
// COMPOSED SETTINGS COMPONENT (combines trigger + panel)
// ============================================================================
interface BackgroundSettingsWithTriggerProps {
  triggerClassName?: string;
  panelPosition?: "left" | "right";
  onApply?: (state: BackgroundState) => void;
}

export function BackgroundSettingsWithTrigger({
  triggerClassName = "",
  panelPosition = "right",
  onApply,
}: BackgroundSettingsWithTriggerProps) {
  const { isOpen, toggle, close } = useBackgroundSettings();

  return (
    <>
      <BackgroundSettingsTrigger
        onClick={toggle}
        className={triggerClassName}
      />
      <BackgroundSettings
        isOpen={isOpen}
        onClose={close}
        position={panelPosition}
        onApply={onApply}
      />
    </>
  );
}
