interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Blog Owner'],
  customerRoles: ['Newsletter Subscriber'],
  tenantRoles: ['Blog Owner', 'Blog Writer', 'Blog Editor'],
  tenantName: 'Publisher',
  applicationName: 'Blog App',
  addOns: ['notifications'],
};
