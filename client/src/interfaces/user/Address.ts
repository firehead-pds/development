export default interface Address {
  postalCode?: string;
  addressLine?: string;
  district?: string;
  city?: string;
  state?: string;
  addressNumber?: string;
  complement?: string | null;
}
