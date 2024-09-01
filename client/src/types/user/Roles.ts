export enum Roles {
  Component = 'Component',
  Harmony = 'Harmony',
  WingChief = 'Wing Chief',
}

export const RoleColors: Record<Roles, string> = {
  [Roles.Component]: 'green',
  [Roles.Harmony]: 'blue',
  [Roles.WingChief]: 'red',
};
