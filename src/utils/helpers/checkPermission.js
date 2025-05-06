export const isPermitted = (user, permission) => {
  const rolePermissions = user.role.permissions;
  const customPermission = user.customPermissions;
  const isSuperAdmin = user?.role?.slug === 'super_admin';

  const allPermissions = [...(rolePermissions || []), ...(customPermission || [])];

  if (!isSuperAdmin) {
    return allPermissions.includes(permission);
  }

  return true;
};
