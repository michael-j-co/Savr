/**
 * Navigation menu configuration
 * Defines the sidebar menu structure with sections and items
 */

export interface MenuItem {
  id: string;
  label: string;
  icon: string; // FontAwesome5 icon name
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const MENU_SECTIONS: MenuSection[] = [
  {
    title: 'Order Less, Cook More',
    items: [
      { id: 'meals-cooked', label: 'Meals Cooked', icon: 'utensils' },
      { id: 'rewards', label: 'Available Rewards', icon: 'gift' },
      { id: 'ingredients', label: 'Ingredients', icon: 'shopping-basket' },
      { id: 'integrate-app', label: 'Integrate App', icon: 'link' },
    ],
  },
  {
    title: 'Profile',
    items: [
      { id: 'update-profile', label: 'Update Profile', icon: 'user-edit' },
      { id: 'notifications', label: 'Notifications', icon: 'bell' },
      { id: 'profile-rewards', label: 'Rewards', icon: 'trophy' },
      { id: 'settings', label: 'Settings', icon: 'cog' },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'privacy', label: 'Privacy', icon: 'shield-alt' },
      { id: 'logout', label: 'Log Out', icon: 'sign-out-alt' },
    ],
  },
];
