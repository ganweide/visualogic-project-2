const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
  view: { type: Boolean, required: true },
  create: { type: Boolean, required: true },
  update: { type: Boolean, required: true },
});

const roleSchema = new mongoose.Schema({
  adminRole: rolePermissionSchema,
  adminBanner: rolePermissionSchema,
  adminMessage: rolePermissionSchema,
  adminStaff: rolePermissionSchema,
  adminBranch: rolePermissionSchema,
  adminRoom: rolePermissionSchema,
  adminPackage: rolePermissionSchema,
  adminMember: rolePermissionSchema,
  adminBooking: rolePermissionSchema,
  memberCheckIn: rolePermissionSchema,
  memberQR: rolePermissionSchema,
  memberStaff: rolePermissionSchema,
  financePurchase: rolePermissionSchema,
  financeCheckIn: rolePermissionSchema,
  financeAttendance: rolePermissionSchema,
  roleName: { type: String, required: true, unique: true },
  branchName: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' },
  allBranchStatus: { type: Boolean, required: true },
  roleStatus: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

roleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Soft delete method
roleSchema.methods.softDelete = function() {
  this.deletedAt = Date.now();
  return this.save();
};

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
