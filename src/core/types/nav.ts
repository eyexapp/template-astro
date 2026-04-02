export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
