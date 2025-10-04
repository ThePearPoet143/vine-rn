import React, { type ReactNode, type ReactElement, Children, cloneElement, isValidElement } from 'react';
import { View } from 'react-native';
import { Card } from './card';
import { ListItem, type ListItemProps } from './list-item';
import { SectionHeader, type SectionHeaderProps } from './section-header';

interface SettingsListProps {
  children: ReactNode;
}

interface SettingsListSectionProps {
  /** Section title */
  title?: string;
  /** Transform title to uppercase */
  uppercase?: boolean;
  /** Top margin before section */
  topMargin?: number;
  /** List items */
  children: ReactNode;
}

interface SettingsListItemProps extends ListItemProps {}

/**
 * Compound component for building Discord-style settings lists
 *
 * Features:
 * - Automatic separator management between items
 * - Section headers with proper spacing
 * - Card containers for grouped items
 * - Clean API for settings screens
 *
 * @example
 * ```tsx
 * <SettingsList>
 *   <SettingsList.Section title="ACCOUNT SETTINGS" uppercase>
 *     <SettingsList.Item
 *       title="Account"
 *       icon="person.fill"
 *       accessory="chevron"
 *       onPress={() => {}}
 *     />
 *     <SettingsList.Item
 *       title="Privacy & Safety"
 *       icon="shield.fill"
 *       accessory="chevron"
 *       onPress={() => {}}
 *     />
 *   </SettingsList.Section>
 *
 *   <SettingsList.Section title="APP SETTINGS" uppercase>
 *     <SettingsList.Item
 *       title="Appearance"
 *       value="Automatic"
 *       accessory="chevron"
 *       onPress={() => {}}
 *     />
 *   </SettingsList.Section>
 * </SettingsList>
 * ```
 */
export function SettingsList({ children }: SettingsListProps) {
  return <View>{children}</View>;
}

/**
 * Section component with header and card
 */
function Section({ title, uppercase = false, topMargin, children }: SettingsListSectionProps) {
  // Convert children to array and add showSeparator to all but last
  const childrenArray = Children.toArray(children);
  const enhancedChildren = childrenArray.map((child, index) => {
    if (isValidElement(child) && child.type === Item) {
      const isLast = index === childrenArray.length - 1;
      return cloneElement(child as ReactElement<SettingsListItemProps>, {
        showSeparator: !isLast,
      });
    }
    return child;
  });

  return (
    <View>
      {title && <SectionHeader title={title} uppercase={uppercase} topMargin={topMargin} />}
      <Card variant="inset-grouped" className="p-0">
        {enhancedChildren}
      </Card>
    </View>
  );
}

/**
 * Item component (wrapper around ListItem)
 */
function Item(props: SettingsListItemProps) {
  return <ListItem {...props} />;
}

// Attach sub-components to main component
SettingsList.Section = Section;
SettingsList.Item = Item;
