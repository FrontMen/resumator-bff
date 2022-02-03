import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { hash } from 'bcrypt';

// entity
import { Role, RoleEntity } from '../app/roles/entity/role.entity';
import { UserEntity } from '../app/users/entity/user.entity';

dotenv.config();

export const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URL);
    const roleModel = mongoose.model('Role', RoleEntity);
    const userModel = mongoose.model('User', UserEntity);

    const foundedAdminRole = await roleModel.findOne({ name: 'admin' });

    const hashedPassword = await hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

    if (!foundedAdminRole) {
      const createdAdminRole = await roleModel.create({
        name: 'admin'
      });

      const createdAdmin = await userModel.create({
        email: 'dave.timmerman@frontmen.nl',
        firstName: 'Dave',
        lastName: 'Timmerman',
        password: hashedPassword,
        role: createdAdminRole._id
      });

      await createdAdmin.save();
      await createdAdminRole.save();
      return;
    }

    const foundAdmin = await userModel.findOne({ role: foundedAdminRole._id });

    if (!foundAdmin && foundedAdminRole) {
      const createdAdmin = await userModel.create({
        email: process.env.DEFAULT_ADMIN_EMAIL,
        firstName: 'Admin',
        lastName: 'Admin',
        password: hashedPassword,
        role: foundedAdminRole._id
      });
      await createdAdmin.save();
    }
  } catch (err) {
    throw new Error(`Failed to seed roles in DB ${err.message}`);
  } finally {
    await mongoose.connection.close();
  }
};
