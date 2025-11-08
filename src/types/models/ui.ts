// UI and component related types based on actual usage

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  isActive?: boolean;
  children?: NavItem[];
}

export interface Tab {
  id: string;
  label: string;
  content: string;
  isActive?: boolean;
  isDisabled?: boolean;
  icon?: string;
  badge?: number;
}

export interface Modal {
  isOpen: boolean;
  title?: string;
  content?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  isVisible?: boolean;
  onClose?: () => void;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  label: string;
  placeholder?: string;
  value: any;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  validation?: Record<string, any>;
  options?: Array<{ value: any; label: string }>;
  helpText?: string;
  icon?: string;
}

export interface Form {
  id: string;
  title?: string;
  fields: FormField[];
  values: Record<string, any>;
  errors: Record<string, string>;
  isValid: boolean;
  isSubmitting: boolean;
  onSubmit: (values: Record<string, any>) => void;
  onReset?: () => void;
  submitText?: string;
  resetText?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export interface Filter {
  id: string;
  label: string;
  type: 'select' | 'range' | 'checkbox' | 'radio';
  options: Array<{ value: any; label: string }>;
  value: any;
  defaultValue?: any;
  onChange: (value: any) => void;
  isActive?: boolean;
}

export interface Sort {
  field: string;
  direction: 'asc' | 'desc';
  label: string;
  onChange: (field: string, direction: 'asc' | 'desc') => void;
}

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'action' | 'image';
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
  onSort?: (field: string) => void;
  onFilter?: (field: string, value: any) => void;
}

export interface Table {
  id: string;
  columns: TableColumn[];
  data: any[];
  pagination?: Pagination;
  sort?: Sort;
  filters?: Filter[];
  loading?: boolean;
  selectable?: boolean;
  selectedRows?: string[];
  onRowSelect?: (rowId: string, selected: boolean) => void;
  onRowClick?: (row: any) => void;
}

export interface Button {
  id?: string;
  label: string;
  type?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
}

export interface DropdownOption {
  value: any;
  label: string;
  icon?: string;
  disabled?: boolean;
  selected?: boolean;
  metadata?: Record<string, any>;
}

export interface Dropdown {
  id: string;
  label?: string;
  options: DropdownOption[];
  value: any;
  defaultValue?: any;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  onChange: (value: any) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  noOptionsText?: string;
}

export interface UITheme {
  name: string;
  colors: Record<string, string>;
  typography?: Record<string, any>;
  spacing?: Record<string, string>;
  breakpoints?: Record<string, string>;
  borderRadius?: Record<string, string>;
  shadows?: Record<string, string>;
  animations?: Record<string, any>;
}

export interface Layout {
  type: 'default' | 'sidebar' | 'fullscreen';
  sidebarOpen?: boolean;
  headerVisible?: boolean;
  footerVisible?: boolean;
  sidebarPosition?: 'left' | 'right';
  headerHeight?: string;
  sidebarWidth?: string;
  onSidebarToggle?: () => void;
  onLayoutChange?: (layout: Layout) => void;
}
