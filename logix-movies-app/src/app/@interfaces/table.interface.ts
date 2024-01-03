export interface IImportExportType {
  template?: { title: string; type: string; permission?: string[] }[];
  download?: { title: string; type: string; permission?: string[] }[];
  upload?: { title: string; type: string; permission?: string[] }[];
}

export interface IItemGroupFilterType {
  filters: {
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'fc';
    field: string;
    value: string;
  }[];
  logic: { value: 'or' | 'and' };
}

export interface IDataFilterType {
  type: string;
  title: string;
  key?: any | string;
  options?: any | object[];
  nameDisplay?: any | string;
  valueFilter?: any | string;
  isExpendParam?: boolean;
}

export interface IDefineTable {
  ID: string;
  TITLE: string;
  COLUMNS: {
    columnDef: string;
    header: string;
    cell?: Function;
    color?: Function;
    sortable?: boolean;
    checked?: Function;
    slideToggle?: boolean;
    isLink?: boolean;
    isCurrency?: boolean;
  }[];
  IMPORT_EXPORT: IImportExportType;
  DATA_FILTER: IDataFilterType[];
  COLUMNS_HISTORY?: {
    columnDef: string;
    header: string;
    cell?: Function;
  }[];
  DEFINE_EXPEND_ELEMENT?: { title: string; curr: string; prev: string; isCurrency?: boolean }[];
}
