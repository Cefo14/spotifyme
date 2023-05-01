export interface NavItems {
  name: string;
  url: string;
}

export interface NavProps {
  title?: string;
  items: NavItems[];
}
