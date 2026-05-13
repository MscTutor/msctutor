// lib/security/rbac.ts
// ══════════════════════════════════════════════════════════════════
// ROLE-BASED ACCESS CONTROL — Fine-grained permission system
// ══════════════════════════════════════════════════════════════════

export type Role =
  | 'super_admin'      // Full system access
  | 'content_admin'    // Manage content only
  | 'school_admin'     // Manage their school only
  | 'teacher'          // Manage their classes
  | 'student'          // Basic access
  | 'banned'           // No access

export type Permission =
  // User management
  | 'users:read' | 'users:write' | 'users:delete' | 'users:ban'
  // Content management
  | 'content:read' | 'content:write' | 'content:publish' | 'content:delete'
  // Upload permissions (role-scoped)
  | 'upload:image' | 'upload:pdf' | 'upload:content' | 'upload:media'
  // School management
  | 'school:read' | 'school:write' | 'school:manage'
  // Teacher permissions
  | 'class:read' | 'class:write'
  | 'exam:create' | 'exam:publish' | 'exam:delete'
  | 'homework:create' | 'homework:grade'
  | 'attendance:mark' | 'attendance:view'
  // Student permissions
  | 'question:ask' | 'question:view'
  | 'exam:take' | 'formula:view'
  | 'ai_teacher:use'
  // Admin permissions
  | 'admin:panel' | 'admin:logs' | 'admin:settings'
  | 'admin:payments' | 'admin:reports'
  // Moderation
  | 'content:moderate' | 'content:approve'
  // Payment permissions
  | 'payment:view' | 'payment:refund' | 'payment:manage'
  // Storage
  | 'storage:read' | 'storage:write' | 'storage:delete'

// ── PERMISSION MATRIX ─────────────────────────────────────────────
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    'users:read', 'users:write', 'users:delete', 'users:ban',
    'content:read', 'content:write', 'content:publish', 'content:delete',
    'upload:image', 'upload:pdf', 'upload:content', 'upload:media',
    'school:read', 'school:write', 'school:manage',
    'class:read', 'class:write',
    'exam:create', 'exam:publish', 'exam:delete',
    'homework:create', 'homework:grade',
    'attendance:mark', 'attendance:view',
    'question:ask', 'question:view',
    'exam:take', 'formula:view', 'ai_teacher:use',
    'admin:panel', 'admin:logs', 'admin:settings',
    'admin:payments', 'admin:reports',
    'content:moderate', 'content:approve',
    'payment:view', 'payment:refund', 'payment:manage',
    'storage:read', 'storage:write', 'storage:delete',
  ],
  content_admin: [
    'content:read', 'content:write', 'content:publish', 'content:delete',
    'content:moderate', 'content:approve',
    'upload:image', 'upload:pdf', 'upload:content', 'upload:media',
    'formula:view', 'question:view', 'question:ask',
    'admin:panel', 'storage:read', 'storage:write',
    'users:read', 'school:read',
  ],
  school_admin: [
    'school:read', 'school:write', 'school:manage',
    'users:read',
    'class:read', 'class:write',
    'exam:create', 'exam:publish',
    'homework:create', 'homework:grade',
    'attendance:mark', 'attendance:view',
    'question:ask', 'question:view',
    'formula:view', 'ai_teacher:use',
    'content:read', 'content:write',   // school-scoped content
    'upload:image', 'upload:pdf', 'upload:content',
    'content:moderate',                 // moderate their school's content
  ],
  teacher: [
    'class:read', 'class:write',
    'exam:create', 'exam:publish',
    'homework:create', 'homework:grade',
    'attendance:mark', 'attendance:view',
    'question:ask', 'question:view',
    'formula:view', 'ai_teacher:use',
    'content:read', 'content:write',   // teacher can write content (needs approval)
    'upload:image', 'upload:pdf', 'upload:content',
    'school:read',
  ],
  student: [
    'question:ask', 'question:view',
    'exam:take', 'formula:view',
    'ai_teacher:use', 'content:read',
    'upload:image',                    // students can upload question images
    'class:read', 'school:read',
  ],
  banned: [],
}

// ── CHECK PERMISSION ──────────────────────────────────────────────
export function hasPermission(role: Role, permission: Permission): boolean {
  if (role === 'banned') return false
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p))
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p))
}

// ── ROUTE-LEVEL PERMISSION MAP ────────────────────────────────────
export const ROUTE_PERMISSIONS: Record<string, { roles: Role[]; permission?: Permission }> = {
  '/admin':                 { roles: ['super_admin', 'content_admin'], permission: 'admin:panel' },
  '/admin/users':           { roles: ['super_admin'], permission: 'users:read' },
  '/admin/payments':        { roles: ['super_admin'], permission: 'admin:payments' },
  '/admin/logs':            { roles: ['super_admin'], permission: 'admin:logs' },
  '/admin/settings':        { roles: ['super_admin'], permission: 'admin:settings' },
  '/admin/content':         { roles: ['super_admin', 'content_admin'], permission: 'content:write' },
  '/teacher/dashboard':     { roles: ['teacher', 'super_admin', 'content_admin'] },
  '/school-dashboard':      { roles: ['school_admin', 'super_admin'] },
  '/dashboard':             { roles: ['student', 'teacher', 'school_admin', 'super_admin', 'content_admin'] },
}

// ── API ROUTE PERMISSION MAP ──────────────────────────────────────
export const API_PERMISSIONS: Record<string, { method?: string; permission: Permission; roles: Role[] }[]> = {
  '/api/admin/subjects': [
    { method: 'GET',    permission: 'content:read',   roles: ['super_admin', 'content_admin', 'teacher'] },
    { method: 'POST',   permission: 'content:write',  roles: ['super_admin', 'content_admin'] },
    { method: 'PUT',    permission: 'content:write',  roles: ['super_admin', 'content_admin'] },
    { method: 'DELETE', permission: 'content:delete', roles: ['super_admin'] },
  ],
  '/api/admin/users': [
    { method: 'GET',    permission: 'users:read',   roles: ['super_admin', 'content_admin'] },
    { method: 'PUT',    permission: 'users:write',  roles: ['super_admin'] },
    { method: 'DELETE', permission: 'users:delete', roles: ['super_admin'] },
  ],
  '/api/payment/razorpay': [
    { permission: 'payment:view', roles: ['student', 'school_admin', 'super_admin', 'content_admin', 'teacher'] },
  ],
  '/api/payment/refund': [
    { permission: 'payment:refund', roles: ['super_admin'] },
  ],
  '/api/admin/storage': [
    { method: 'GET',    permission: 'storage:read',   roles: ['super_admin', 'content_admin'] },
    { method: 'POST',   permission: 'storage:write',  roles: ['super_admin', 'content_admin'] },
    { method: 'DELETE', permission: 'storage:delete', roles: ['super_admin'] },
  ],
  '/api/school': [
    { permission: 'school:read', roles: ['school_admin', 'teacher', 'student', 'super_admin'] },
  ],
  '/api/exam': [
    { method: 'POST',  permission: 'exam:create',  roles: ['teacher', 'school_admin', 'super_admin', 'content_admin'] },
    { method: 'GET',   permission: 'exam:take',    roles: ['student', 'teacher', 'school_admin', 'super_admin', 'content_admin'] },
  ],
}

// ── CHECK API ROUTE PERMISSION ────────────────────────────────────
export function checkApiPermission(
  path: string,
  method: string,
  userRole: Role
): { allowed: boolean; required?: Permission; reason?: string } {
  if (userRole === 'banned') {
    return { allowed: false, reason: 'Account is banned' }
  }

  // Find matching route config
  const configs = API_PERMISSIONS[path]
  if (!configs) return { allowed: true }  // No restriction defined

  const config = configs.find(c => !c.method || c.method === method.toUpperCase())
  if (!config) return { allowed: true }

  if (!config.roles.includes(userRole)) {
    return {
      allowed:  false,
      required: config.permission,
      reason:   `Role '${userRole}' cannot access this endpoint`,
    }
  }

  if (!hasPermission(userRole, config.permission)) {
    return {
      allowed:  false,
      required: config.permission,
      reason:   `Missing permission: ${config.permission}`,
    }
  }

  return { allowed: true }
}

// ── ROLE HIERARCHY ────────────────────────────────────────────────
const ROLE_LEVELS: Record<Role, number> = {
  banned:       -1,
  student:       1,
  teacher:       2,
  school_admin:  3,
  content_admin: 4,
  super_admin:   5,
}

export function isRoleAtLeast(userRole: Role, minRole: Role): boolean {
  return (ROLE_LEVELS[userRole] ?? 0) >= (ROLE_LEVELS[minRole] ?? 0)
}

export function isAdmin(role: Role): boolean {
  return isRoleAtLeast(role, 'content_admin')
}

export function isSuperAdmin(role: Role): boolean {
  return role === 'super_admin'
}

// ── CONTENT MANAGEMENT PERMISSIONS (extension) ───────────────────
export const CONTENT_PERMISSIONS = {
  // What each role can upload
  upload: {
    student:      [] as string[],
    teacher:      ['pdf', 'image', 'note', 'question'],
    school_admin: ['pdf', 'image', 'note', 'question', 'chapter', 'experiment'],
    content_admin:['pdf', 'image', 'note', 'question', 'chapter', 'experiment', 'formula', 'syllabus'],
    super_admin:  ['pdf', 'image', 'note', 'question', 'chapter', 'experiment', 'formula', 'syllabus', 'bulk'],
    banned:       [] as string[],
  } as Record<string, string[]>,

  // What needs approval before going public
  requiresApproval: {
    student:      true,
    teacher:      true,   // teacher uploads go to pending
    school_admin: true,
    content_admin:false,  // direct publish
    super_admin:  false,
    banned:       true,
  } as Record<string, boolean>,

  // Max upload sizes in MB per role
  maxUploadMB: {
    student:      0,
    teacher:      20,
    school_admin: 50,
    content_admin:100,
    super_admin:  200,
    banned:       0,
  } as Record<string, number>,
}

export function canUpload(role: string, type: string): boolean {
  const allowed = CONTENT_PERMISSIONS.upload[role] ?? []
  return allowed.includes(type)
}

export function needsApproval(role: string): boolean {
  return CONTENT_PERMISSIONS.requiresApproval[role] ?? true
}

export function maxUploadMB(role: string): number {
  return CONTENT_PERMISSIONS.maxUploadMB[role] ?? 0
}

// ── CONTENT ROUTE GUARDS ──────────────────────────────────────────
export const CONTENT_ROUTE_GUARDS: Record<string, string[]> = {
  '/admin':             ['super_admin', 'content_admin'],
  '/admin/users':       ['super_admin'],
  '/admin/content':     ['super_admin', 'content_admin'],
  '/admin/security':    ['super_admin'],
  '/admin/payments':    ['super_admin'],
  '/teacher/dashboard': ['teacher', 'school_admin', 'super_admin', 'content_admin'],
  '/school-dashboard':  ['school_admin', 'super_admin'],
  '/dashboard':         ['student', 'teacher', 'school_admin', 'super_admin', 'content_admin'],
}

export function isRouteAllowed(route: string, role: string): boolean {
  const allowed = CONTENT_ROUTE_GUARDS[route]
  if (!allowed) return true   // no restriction
  return allowed.includes(role)
}
